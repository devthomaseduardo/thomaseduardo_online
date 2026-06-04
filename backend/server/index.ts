import express from 'express';
import cors from 'cors';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import multer from 'multer';
import processPaymentHandler from '../api/process_payment.ts';

// ─── Security bootstrap (must be first) ─────────────────────────────────────
import './lib/env.js';  // validates and crashes if env is missing
import { env } from './lib/env.js';
import { signAdminToken, extractBearer, verifyAdminToken } from './lib/jwt.js';
import { audit, getClientIp } from './lib/audit.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const prisma = new PrismaClient();
const app = express();

const JWT_SECRET = env.JWT_SECRET;
// ADMIN_PASSWORD kept for legacy seed compatibility only — remove in v2
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD ?? '';


// ─── Uploads directory ───────────────────────────────────────────────────────
const UPLOADS_DIR = path.join(__dirname, '../uploads');
if (!fs.existsSync(UPLOADS_DIR)) fs.mkdirSync(UPLOADS_DIR, { recursive: true });

// ─── Multer storage ──────────────────────────────────────────────────────────
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const projectId = (req.params.projectId || req.body.projectId || 'misc').replace(/[^a-zA-Z0-9-_]/g, '');
    const dir = path.join(UPLOADS_DIR, projectId);
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    cb(null, dir);
  },
  filename: (req, file, cb) => {
    const unique = `${Date.now()}-${Math.round(Math.random() * 1e6)}`;
    const ext = path.extname(file.originalname);
    cb(null, `${unique}${ext}`);
  }
});

const upload = multer({
  storage,
  limits: { fileSize: 200 * 1024 * 1024 }, // 200 MB
  fileFilter: (req, file, cb) => {
    const allowed = [
      'image/jpeg', 'image/png', 'image/gif', 'image/webp', 'image/svg+xml',
      'application/pdf',
      'application/zip', 'application/x-zip-compressed',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'application/vnd.ms-excel',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      'video/mp4', 'video/quicktime',
      'application/octet-stream', // .ai, .eps, etc
      'application/postscript',
      'font/ttf', 'font/otf', 'application/font-woff',
    ];
    if (allowed.includes(file.mimetype) || file.originalname.match(/\.(ai|eps|fig|sketch|zip|rar|7z)$/i)) {
      cb(null, true);
    } else {
      cb(new Error(`Tipo de arquivo não permitido: ${file.mimetype}`));
    }
  }
});

// ─── Rate Limiters ────────────────────────────────────────────────────────────
import rateLimit from 'express-rate-limit';

const adminLoginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 min
  max: 5,
  standardHeaders: true,
  legacyHeaders: false,
  handler: async (req, res) => {
    await audit({ action: 'rate.limit.exceeded', actorType: 'anonymous', ip: getClientIp(req as any), userAgent: req.headers['user-agent'], metadata: { route: '/api/admin/login' } });
    res.status(429).json({ error: 'Muitas tentativas. Tente novamente em 15 minutos.' });
  },
});

const clientLoginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  standardHeaders: true,
  legacyHeaders: false,
  handler: async (req, res) => {
    res.status(429).json({ error: 'Muitas tentativas. Tente novamente em 15 minutos.' });
  },
});

const generalLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 200,
  standardHeaders: true,
  legacyHeaders: false,
});

// ─── Middleware ───────────────────────────────────────────────────────────────
import helmet from 'helmet';

// Security headers
app.use(helmet({
  contentSecurityPolicy: false, // handled by vite in dev; configure per-deploy in prod
  crossOriginResourcePolicy: { policy: 'cross-origin' }, // allow CDN fonts/images
}));

// CORS — whitelist only
app.use(cors({
  origin: (origin, callback) => {
    // Allow non-browser (curl, server-to-server) and whitelisted origins
    if (!origin || env.ALLOWED_ORIGINS.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error(`CORS: Origin "${origin}" is not allowed.`));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'x-admin-key'],
  credentials: false,
}));

app.use(generalLimiter);
app.use(express.json({ limit: '10mb' }));
app.use('/uploads', express.static(UPLOADS_DIR));
app.post('/api/process_payment', processPaymentHandler);


// ─── Auth middlewares ─────────────────────────────────────────────────────────

const authenticateToken = (req: any, res: any, next: any) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'Acesso negado' });
  jwt.verify(token, JWT_SECRET, (err: any, user: any) => {
    if (err) return res.status(403).json({ error: 'Token inválido' });
    req.user = user;
    next();
  });
};

// Admin auth: accept both new JWT Bearer and legacy x-admin-key (transition period)
const authenticateAdmin = (req: any, res: any, next: any) => {
  // Try Bearer JWT first (new secure method)
  const bearerToken = extractBearer(req.headers['authorization']);
  if (bearerToken) {
    const payload = verifyAdminToken(bearerToken);
    if (payload?.role === 'admin') return next();
  }
  // Fall back to legacy x-admin-key
  const key = req.headers['x-admin-key'];
  if (key && key === ADMIN_PASSWORD && ADMIN_PASSWORD) return next();
  return res.status(401).json({ error: 'Não autorizado.' });
};

// ─── ADMIN AUTH (secure JWT) ──────────────────────────────────────────────────

app.post('/api/admin/login', adminLoginLimiter, async (req: any, res: any) => {
  const { password } = req.body;
  const ip = getClientIp(req);

  if (!password || typeof password !== 'string') {
    return res.status(400).json({ error: 'Credenciais inválidas.' });
  }

  try {
    // Compare against bcrypt hash (secure)
    const hash = env.ADMIN_PASSWORD_HASH;
    const isValidHash = hash && !hash.includes('placeholder')
      ? await bcrypt.compare(password, hash)
      : password === ADMIN_PASSWORD; // fallback to plaintext during transition

    if (!isValidHash) {
      await audit({ action: 'admin.login.failed', actorType: 'anonymous', ip, userAgent: req.headers['user-agent'] });
      // Generic error — never reveal why it failed
      return res.status(401).json({ error: 'Credenciais inválidas.' });
    }

    const token = signAdminToken();
    await audit({ action: 'admin.login.success', actorType: 'admin', ip, userAgent: req.headers['user-agent'] });

    // Return ONLY the JWT — never the password or hash
    return res.json({ token });
  } catch (err) {
    console.error('[admin/login]', err);
    return res.status(500).json({ error: 'Erro interno.' });
  }
});


// ─── CLIENT AUTH ──────────────────────────────────────────────────────────────

app.post('/api/auth/login', clientLoginLimiter, async (req, res) => {
  try {
    const { identifier, password } = req.body;

    const client = await prisma.client.findFirst({
      where: {
        OR: [
          { email: identifier },
          { cnpj: identifier }
        ]
      }
    });

    if (!client) {
      return res.status(401).json({ error: 'Credenciais inválidas' });
    }

    const isMatch = await bcrypt.compare(password, client.password);
    if (!isMatch) {
      return res.status(401).json({ error: 'Credenciais inválidas' });
    }

    const token = jwt.sign({ id: client.id, email: client.email }, JWT_SECRET, { expiresIn: '7d' });
    res.json({
      message: 'Login bem-sucedido',
      token,
      client: { id: client.id, name: client.name, email: client.email }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to authenticate' });
  }
});

// ─── CLIENT DATA ──────────────────────────────────────────────────────────────

app.get('/api/clients/me', authenticateToken, async (req: any, res: any) => {
  try {
    const client = await prisma.client.findUnique({
      where: { id: req.user.id },
      include: {
        projects: {
          include: {
            invoices: { orderBy: { createdAt: 'desc' } },
            files: { orderBy: { createdAt: 'desc' } }
          }
        }
      }
    });
    if (!client) return res.status(404).json({ error: 'Cliente não encontrado' });
    // Never expose the password hash
    const { password: _pw, ...safeClient } = client as any;
    res.json(safeClient);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch client data' });
  }
});
// ─── SEED ROUTE (development only) ───────────────────────────────────────────
if (env.NODE_ENV !== 'production') {
  app.get('/api/seed-clients', async (req, res) => {

  try {
    const clients = [
      {
        name: "Sleep House",
        email: "contato@sleephouse.com.br",
        password: "password123",
        projectName: "Digital Showroom de Colchões Premium",
        phase: "Entregue",
        financial: "Pago",
        value: 12500.0,
        description: "Um digital showroom de alto padrão para uma rede de lojas de colchões premium. O projeto entrega uma experiência de marca editorial e imersiva."
      },
      {
        name: "LP Yázigi",
        email: "contato@yazigi.com.br",
        password: "password123",
        projectName: "Página de Alta Conversão para Captação de Alunos",
        phase: "Em Produção",
        financial: "Pendente",
        value: 5700.0,
        description: "Página comercial de alta velocidade focada em apresentar a escola de idiomas e capturar contatos qualificados para o time de matrículas."
      },
      {
        name: "Bras Service",
        email: "contato@brasservice.com",
        password: "password123",
        projectName: "Sistema Integrado de Ordem de Serviço",
        phase: "Entregue",
        financial: "Pago",
        value: 28000.0,
        description: "Sistema de gestão técnica integrado para organizar chamados, alocar visitas de técnicos nas ruas e gerenciar estoque."
      },
      {
        name: "Hazap Vendas",
        email: "contato@hazap.com.br",
        password: "password123",
        projectName: "Painel de Vendas e CRM Comercial",
        phase: "Em Produção",
        financial: "Pago",
        value: 18000.0,
        description: "Painel de controle de vendas completo para gerenciar leads, propostas e comissões da equipe comercial em tempo real."
      }
    ];

    for (const c of clients) {
      const client = await prisma.client.create({
        data: {
          name: c.name,
          email: c.email,
          password: c.password,
          cnpj: Math.floor(Math.random() * 10000000).toString(),
          clientType: "new"
        }
      });

      const project = await prisma.project.create({
        data: {
          id: `PROJ-${Math.floor(Math.random() * 9000) + 1000}`,
          name: c.projectName,
          phase: c.phase,
          financial: c.financial,
          value: c.value,
          clientId: client.id,
          seo: true,
          analytics: true
        }
      });
      
      await prisma.invoice.create({
        data: {
          description: "Sinal inicial de 50%",
          amount: c.value / 2,
          status: "paid",
          projectId: project.id,
        }
      });
    }
    
    res.json({ success: true, message: "Clients seeded successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to seed clients' });
  }
  });
} // end if (dev only)

// ─── PROJECT FILE UPLOAD (Client) ─────────────────────────────────────────────



app.post(
  '/api/projects/:projectId/files',
  authenticateToken,
  upload.array('files', 20),
  async (req: any, res: any) => {
    try {
      const { projectId } = req.params;
      const category = req.body.category || 'other';
      const uploadedFiles = req.files as Express.Multer.File[];

      if (!uploadedFiles || uploadedFiles.length === 0) {
        return res.status(400).json({ error: 'Nenhum arquivo enviado' });
      }

      // Verify project belongs to authenticated client
      const project = await prisma.project.findFirst({
        where: { id: projectId, clientId: req.user.id }
      });

      if (!project) {
        return res.status(403).json({ error: 'Projeto não encontrado ou sem permissão' });
      }

      const records = await Promise.all(
        uploadedFiles.map(f =>
          prisma.projectFile.create({
            data: {
              originalName: f.originalname,
              fileName: f.filename,
              mimeType: f.mimetype,
              size: f.size,
              path: `/uploads/${projectId}/${f.filename}`,
              category,
              uploadedBy: 'client',
              projectId
            }
          })
        )
      );

      res.json({ success: true, files: records });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Falha no upload dos arquivos' });
    }
  }
);

// ─── PROJECT FILE UPLOAD (Admin) ──────────────────────────────────────────────

app.post(
  '/api/admin/projects/:projectId/files',
  authenticateAdmin,
  upload.array('files', 20),
  async (req: any, res: any) => {
    try {
      const { projectId } = req.params;
      const category = req.body.category || 'other';
      const uploadedFiles = req.files as Express.Multer.File[];

      if (!uploadedFiles || uploadedFiles.length === 0) {
        return res.status(400).json({ error: 'Nenhum arquivo enviado' });
      }

      const records = await Promise.all(
        uploadedFiles.map(f =>
          prisma.projectFile.create({
            data: {
              originalName: f.originalname,
              fileName: f.filename,
              mimeType: f.mimetype,
              size: f.size,
              path: `/uploads/${projectId}/${f.filename}`,
              category,
              uploadedBy: 'admin',
              projectId
            }
          })
        )
      );

      res.json({ success: true, files: records });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Falha no upload dos arquivos' });
    }
  }
);

// ─── GET FILES FOR A PROJECT ──────────────────────────────────────────────────

app.get('/api/projects/:projectId/files', authenticateToken, async (req: any, res: any) => {
  try {
    const { projectId } = req.params;

    const project = await prisma.project.findFirst({
      where: { id: projectId, clientId: req.user.id }
    });
    if (!project) return res.status(403).json({ error: 'Sem permissão' });

    const files = await prisma.projectFile.findMany({
      where: { projectId },
      orderBy: { createdAt: 'desc' }
    });
    res.json(files);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch files' });
  }
});

// ─── DELETE A FILE (Admin) ────────────────────────────────────────────────────

app.delete('/api/admin/files/:fileId', authenticateAdmin, async (req: any, res: any) => {
  try {
    const { fileId } = req.params;
    const file = await prisma.projectFile.findUnique({ where: { id: fileId } });
    if (!file) return res.status(404).json({ error: 'Arquivo não encontrado' });

    // Remove from disk
    const fullPath = path.join(__dirname, '..', file.path);
    if (fs.existsSync(fullPath)) fs.unlinkSync(fullPath);

    await prisma.projectFile.delete({ where: { id: fileId } });
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete file' });
  }
});

// ─── PROJECTS (CRUD) ──────────────────────────────────────────────────────────

app.get('/api/projects', async (req, res) => {
  try {
    const projects = await prisma.project.findMany({ include: { client: true } });
    res.json(projects);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch projects' });
  }
});

app.post('/api/projects', async (req, res) => {
  try {
    const {
      clientName, clientEmail, clientCnpj, clientType,
      projectName, projectValue, hasDomainHosting, domainHostingValue,
      status, password, repoUrl, productionUrl
    } = req.body;

    let client = await prisma.client.findUnique({ where: { email: clientEmail } });

    if (!client) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password || '123456', salt);
      client = await prisma.client.create({
        data: {
          name: clientName,
          email: clientEmail,
          cnpj: clientCnpj,
          clientType: clientType || 'novo',
          password: hashedPassword
        }
      });
    }

    const newProject = await prisma.project.create({
      data: {
        id: `PROJ-${Math.random().toString(36).substr(2, 6).toUpperCase()}`,
        name: projectName,
        value: parseFloat(projectValue),
        phase: status || 'Aguardando Sinal',
        financial: 'Pendente (Sinal)',
        domainHostingValue: domainHostingValue ? parseFloat(domainHostingValue) : 0,
        repoUrl: repoUrl || null,
        productionUrl: productionUrl || null,
        clientId: client.id
      }
    });

    res.json(newProject);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to create project' });
  }
});

app.put('/api/projects/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const data = req.body;

    const updatedProject = await prisma.project.update({
      where: { id },
      data: {
        name: data.name,
        phase: data.phase,
        financial: data.financial,
        value: parseFloat(data.value),
        domainHostingValue: data.domainHostingValue ? parseFloat(data.domainHostingValue) : 0,
        seo: data.features?.seo ?? data.seo ?? false,
        analytics: data.features?.analytics ?? data.analytics ?? false,
        support: data.features?.support ?? data.support ?? false,
        ads: data.features?.ads ?? data.ads ?? false,
        repoUrl: data.repoUrl || undefined,
        productionUrl: data.productionUrl || undefined,
        internalNotes: data.internalNotes || undefined,
      }
    });

    if (data.cnpj || data.clientType) {
      await prisma.client.update({
        where: { id: updatedProject.clientId },
        data: { cnpj: data.cnpj, clientType: data.clientType }
      });
    }

    res.json(updatedProject);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to update project' });
  }
});

// ─── INVOICES (CRUD) ──────────────────────────────────────────────────────────

app.post('/api/payments/intent', async (req, res) => {
  try {
    const { projectId, amount, description, type, dueDate } = req.body;
    const invoice = await prisma.invoice.create({
      data: {
        description: description || 'Pagamento de Serviço / Sinal',
        amount: parseFloat(amount),
        status: 'pending',
        type: type || 'service',
        vencimento: dueDate ? new Date(dueDate) : undefined,
        projectId
      }
    });
    res.json({ invoiceId: invoice.id, amount });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to create payment intent' });
  }
});

// Mark invoice as paid (admin)
app.patch('/api/admin/invoices/:id/paid', authenticateAdmin, async (req: any, res: any) => {
  try {
    const { id } = req.params;
    const invoice = await prisma.invoice.update({
      where: { id },
      data: { status: 'paid', paidAt: new Date() }
    });
    res.json(invoice);
  } catch (error) {
    res.status(500).json({ error: 'Failed to mark invoice as paid' });
  }
});

// ─── DOCUMENTS ────────────────────────────────────────────────────────────────

app.get('/api/documents', async (req, res) => {
  try {
    const documents = await prisma.document.findMany({ orderBy: { createdAt: 'desc' } });
    res.json(documents);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch documents' });
  }
});

app.post('/api/documents', async (req, res) => {
  try {
    const { title, type, clientName, date, url } = req.body;
    const document = await prisma.document.create({ data: { title, type, clientName, date, url } });
    res.json(document);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create document' });
  }
});

app.put('/api/documents/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { title, type, clientName, date, url } = req.body;
    const document = await prisma.document.update({ where: { id }, data: { title, type, clientName, date, url } });
    res.json(document);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update document' });
  }
});

app.delete('/api/documents/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.document.delete({ where: { id } });
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete document' });
  }
});

// ─── ADMIN DASHBOARD ─────────────────────────────────────────────────────────

app.get('/api/admin/dashboard', authenticateAdmin, async (req, res) => {
  try {
    const projects = await prisma.project.findMany({ include: { client: true } });
    const invoices = await prisma.invoice.findMany({
      include: { project: { include: { client: true } } },
      orderBy: { createdAt: 'desc' }
    });

    const activeProjects = projects.filter(p => p.phase !== 'Concluído').length;
    const pendingPayments = invoices
      .filter(i => i.status === 'pending')
      .reduce((sum, i) => sum + i.amount, 0);
    const onboardings = projects.filter(p =>
      p.phase === 'Aguardando Sinal' || p.phase === 'Onboarding'
    ).length;

    const pipeline = projects.map(p => {
      const projectInvoices = invoices.filter(i => i.projectId === p.id);
      const totalPaid = projectInvoices.filter(i => i.status === 'paid').reduce((sum, i) => sum + i.amount, 0);
      const balance = p.value - totalPaid;
      
      return {
        id: p.id,
        client: p.client.name,
        status: p.phase,
        payment: p.financial,
        progress: p.phase === 'Concluído' ? '100%' : '50%',
        email: p.client.email,
        phone: p.client.cnpj || 'Não informado',
        seo: p.seo,
        analytics: p.analytics,
        support: p.support,
        ads: p.ads,
        repoUrl: p.repoUrl,
        productionUrl: p.productionUrl,
        value: p.value,
        totalPaid,
        balance,
      };
    });

    const paymentsData = invoices.map(i => ({
      id: i.id,
      date: i.createdAt.toLocaleDateString('pt-BR', { day: '2-digit', month: 'short' }),
      client: i.project.client.name,
      desc: i.description,
      value: `R$ ${i.amount.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`,
      status: i.status === 'paid' ? 'Pago' : i.status === 'pending' ? 'Pendente' : 'Atrasado',
      type: i.type,
      dueDate: i.vencimento?.toLocaleDateString('pt-BR') || null,
      paidAt: i.paidAt?.toLocaleDateString('pt-BR') || null,
    }));

    res.json({
      kpis: [
        { label: 'Projetos ativos', value: activeProjects.toString() },
        { label: 'A Receber', value: `R$ ${pendingPayments.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}` },
        { label: 'Onboardings', value: onboardings.toString(), sub: 'incompletos' },
        { label: 'Clientes', value: (await prisma.client.count()).toString() },
      ],
      pipeline,
      paymentsData
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch dashboard data' });
  }
});

// ─── API V2 ───────────────────────────────────────────────────────────────────
import apiV2Routes from './routes/api.js';
app.use('/api/v2', apiV2Routes);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
  console.log(`📁 Uploads dir: ${UPLOADS_DIR}`);
});
