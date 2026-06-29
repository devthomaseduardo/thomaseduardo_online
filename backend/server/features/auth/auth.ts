// Force backend reload to pick up .env changes
import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import rateLimit from 'express-rate-limit';
import { PrismaClient } from '@prisma/client';
import { env } from '../../lib/env.js';
import { signAdminToken } from '../../lib/jwt.js';
import { audit, getClientIp } from '../../lib/audit.js';
import { authenticateToken } from '../../lib/auth.js';

const prisma = new PrismaClient();
const router = express.Router();

const adminLoginLimiter = rateLimit({
  windowMs: 1 * 60 * 1000,
  max: 10,
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
  handler: async (req, res) => res.status(429).json({ error: 'Muitas tentativas. Tente novamente em 15 minutos.' }),
});

// Admin login
router.post('/admin/login', adminLoginLimiter, async (req: any, res: any) => {
  const { password } = req.body;
  const ip = getClientIp(req);

  if (!password || typeof password !== 'string') {
    return res.status(400).json({ error: 'Credenciais inválidas.' });
  }

  try {
    const hash = env.ADMIN_PASSWORD_HASH;
    const isValidHash = hash && !hash.includes('placeholder')
      ? await bcrypt.compare(password, hash)
      : password === process.env.ADMIN_PASSWORD;

    if (!isValidHash) {
      await audit({ action: 'admin.login.failed', actorType: 'anonymous', ip, userAgent: req.headers['user-agent'] });
      return res.status(401).json({ error: 'Credenciais inválidas.' });
    }

    const token = signAdminToken();
    await audit({ action: 'admin.login.success', actorType: 'admin', ip, userAgent: req.headers['user-agent'] });

    return res.json({ token });
  } catch (err) {
    console.error('[admin/login]', err);
    return res.status(500).json({ error: 'Erro interno.' });
  }
});

// Client login
router.post('/auth/login', clientLoginLimiter, async (req: any, res: any) => {
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

    if (!client) return res.status(401).json({ error: 'Credenciais inválidas' });

    let isMatch = false;
    try {
      // First try bcrypt compare
      isMatch = await bcrypt.compare(password, client.password);
    } catch (e) {
      // Ignore bcrypt error (e.g., if hash is invalid)
    }
    
    // Fallback: if bcrypt failed, check if plain text matches directly (for seed data or unhashed passwords)
    if (!isMatch && password === client.password) {
      isMatch = true;
    }

    if (!isMatch) return res.status(401).json({ error: 'Credenciais inválidas' });

    const token = jwt.sign({ id: client.id, email: client.email }, env.JWT_SECRET, { expiresIn: '7d' });
    res.json({ message: 'Login bem-sucedido', token, client: { id: client.id, name: client.name, email: client.email } });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to authenticate' });
  }
});

// Client self info
router.get('/clients/me', authenticateToken, async (req: any, res: any) => {
  try {
    const prismaClient = prisma;
    const client = await prismaClient.client.findUnique({
      where: { id: req.user.id },
      include: {
        projects: {
          include: {
            invoices: { orderBy: { createdAt: 'desc' } },
            files: { where: { visivelCliente: true }, orderBy: { createdAt: 'desc' } },
            timeline: { where: { visivelCliente: true }, orderBy: { createdAt: 'desc' } },
            tasks: { where: { visivelCliente: true }, orderBy: { ordem: 'asc' } },
            contracts: { where: { visivelCliente: true }, orderBy: { createdAt: 'desc' } },
            deploys: { where: { visivelCliente: true }, orderBy: { createdAt: 'desc' } },
            integrations: { where: { visivelCliente: true } }
          }
        }
      }
    });
    if (!client) return res.status(404).json({ error: 'Cliente não encontrado' });
    const { password: _pw, ...safeClient } = client as any;
    res.json(safeClient);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch client data' });
  }
});

// Seed route for development
if (env.NODE_ENV !== 'production') {
  router.get('/seed-clients', async (req, res) => {
    try {
      // Wipe the database completely
      await prisma.deploy.deleteMany();
      await prisma.invoice.deleteMany();
      await prisma.project.deleteMany();
      await prisma.client.deleteMany();

      // Create a test client with password '123456'
      const testEmail = 'cliente@teste.com';
      const hashedPassword = await bcrypt.hash('123456', 10);
      
      await prisma.client.upsert({
        where: { email: testEmail },
        update: {
          name: 'Cliente de Teste',
          password: hashedPassword,
          clientType: 'new',
          portalActive: true
        },
        create: {
          name: 'Cliente de Teste',
          email: testEmail,
          password: hashedPassword,
          clientType: 'new',
          portalActive: true
        }
      });
      res.json({ success: true, message: 'Admin data wiped. Test client created. Email: cliente@teste.com, Password: 123456' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to seed clients' });
    }
  });
  router.get('/seed-real-data', async (req, res) => {
    try {
      const clients = [
        {
          clientName: "Sleep House",
          clientEmail: "contato@sleephouse.com.br",
          password: "password123",
          projectName: "Digital Showroom de Colchões Premium",
          phase: "Entregue",
          status: "Entregue",
          projectValue: 12500.0,
        },
        {
          clientName: "LP Yázigi",
          clientEmail: "contato@yazigi.com.br",
          password: "password123",
          projectName: "Página de Alta Conversão para Captação de Alunos",
          phase: "Em Produção",
          status: "Em Produção",
          projectValue: 5700.0,
        },
        {
          clientName: "Bras Service",
          clientEmail: "contato@brasservice.com",
          password: "password123",
          projectName: "Sistema Integrado de Ordem de Serviço",
          phase: "Entregue",
          status: "Entregue",
          projectValue: 28000.0,
        },
        {
          clientName: "Hazap Vendas",
          clientEmail: "contato@hazap.com.br",
          password: "password123",
          projectName: "Painel de Vendas e CRM Comercial",
          phase: "Em Produção",
          status: "Em Produção",
          projectValue: 18000.0,
        }
      ];

      for (const c of clients) {
        const hashedPassword = await bcrypt.hash(c.password, 10);
        const client = await prisma.client.upsert({
          where: { email: c.clientEmail },
          update: {},
          create: {
            name: c.clientName,
            email: c.clientEmail,
            password: hashedPassword,
            clientType: 'novo',
          }
        });

        const project = await prisma.project.create({
          data: {
            id: `PROJ-${Math.random().toString(36).substring(2, 8).toUpperCase()}`,
            name: c.projectName,
            value: c.projectValue,
            phase: c.phase,
            financial: 'Pendente (Sinal)',
            clientId: client.id
          }
        });

        await prisma.invoice.create({
          data: {
            description: "Sinal inicial de 50%",
            amount: c.projectValue / 2,
            status: "pending",
            type: "service",
            projectId: project.id
          }
        });
      }

      res.json({ success: true, message: 'Dados reais populados com sucesso no banco de dados.' });
    } catch (error) {
      console.error('Seed Real Data Error:', error);
      res.status(500).json({ error: 'Erro ao popular dados reais.' });
    }
  });

  router.get('/clear-db', async (req, res) => {
    try {
      await prisma.payment.deleteMany();
      await prisma.invoice.deleteMany();
      await prisma.projectFile.deleteMany();
      await prisma.deploy.deleteMany();
      await (prisma as any).contract?.deleteMany?.();
      await (prisma as any).metric?.deleteMany?.();
      await (prisma as any).timelineEvent?.deleteMany?.();
      await (prisma as any).integration?.deleteMany?.();
      await (prisma as any).notification?.deleteMany?.();
      await (prisma as any).activityLog?.deleteMany?.();
      await prisma.project.deleteMany();
      await prisma.client.deleteMany();
      
      const testEmail = 'thomas@teste.com';
      const hashedPassword = await bcrypt.hash('123456', 10);
      
      const client = await prisma.client.upsert({
        where: { email: testEmail },
        update: {
          name: 'Thomas',
          password: hashedPassword,
          clientType: 'new',
          portalActive: true
        },
        create: {
          name: 'Thomas',
          email: testEmail,
          password: hashedPassword,
          clientType: 'new',
          portalActive: true
        }
      });
      
      await prisma.project.create({
        data: {
          id: `PROJ-1000`,
          name: "Projeto do Thomas",
          phase: "Desenvolvimento",
          financial: "Pendente",
          value: 15000.0,
          clientId: client.id,
          seo: true,
          analytics: true
        }
      });

      res.json({ success: true, message: 'Data wiped and recreated thomas@teste.com with password 123456.' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to clear db' });
    }
  });
}

// PostHog Reverse Proxy - Burla ad-blockers encaminhando eventos pelo seu domínio
router.all('/ingest*', async (req: any, res: any) => {
  const targetHost = 'https://us.i.posthog.com';
  // Remove o prefixo da rota para obter o caminho real do PostHog (/decide, /e, etc)
  const targetPath = req.url.replace('/ingest', '');
  const url = `${targetHost}${targetPath}`;

  try {
    const response = await fetch(url, {
      method: req.method,
      headers: {
        'Content-Type': req.headers['content-type'] || 'application/json',
        // Repassa o IP real para manter a precisão de geolocalização no PostHog
        'X-Forwarded-For': req.headers['x-forwarded-for'] || req.ip || req.socket.remoteAddress || '',
      },
      // Encaminha o corpo da requisição apenas se não for GET/HEAD
      body: req.method !== 'GET' && req.method !== 'HEAD' ? JSON.stringify(req.body) : undefined,
    });

    const data = await response.json();
    res.status(response.status).json(data);
  } catch (error) {
    // Falha silenciosa para não quebrar o app se o PostHog estiver instável
    console.error('[PostHog Proxy Error]:', error);
    res.status(500).json({ error: 'Internal proxy error' });
  }
});

export default router;
