import express from 'express';
import cors from 'cors';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();
const app = express();

const JWT_SECRET = process.env.JWT_SECRET || 'super-secret-key-for-development';

// Middleware to authenticate JWT
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

app.use(cors());
app.use(express.json());

// Get all projects
app.get('/api/projects', async (req, res) => {
  try {
    const projects = await prisma.project.findMany({
      include: { client: true }
    });
    res.json(projects);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch projects' });
  }
});

// Create a new client and project
app.post('/api/projects', async (req, res) => {
  try {
    const { 
      clientName, 
      clientEmail, 
      clientCnpj, 
      clientType, 
      projectName, 
      projectValue,
      hasDomainHosting,
      domainHostingValue,
      status,
      password // Should be provided by admin, or generated
    } = req.body;

    // Check if client exists or create
    let client = await prisma.client.findUnique({
      where: { email: clientEmail }
    });

    if (!client) {
      // Default password to '123456' if none provided (for demo purposes)
      // They should be required to change it
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
        clientId: client.id
      }
    });

    res.json(newProject);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to create project' });
  }
});

// Update a project
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
        seo: data.features?.seo || data.seo || false,
        analytics: data.features?.analytics || data.analytics || false,
        support: data.features?.support || data.support || false,
        ads: data.features?.ads || data.ads || false,
      }
    });
    
    if (data.cnpj || data.clientType) {
      await prisma.client.update({
        where: { id: updatedProject.clientId },
        data: {
          cnpj: data.cnpj,
          clientType: data.clientType
        }
      });
    }

    res.json(updatedProject);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to update project' });
  }
});

// Client Login
app.post('/api/auth/login', async (req, res) => {
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

// Get current client data
app.get('/api/clients/me', authenticateToken, async (req: any, res: any) => {
  try {
    const client = await prisma.client.findUnique({
      where: { id: req.user.id },
      include: { 
        projects: {
          include: { invoices: true }
        } 
      }
    });
    
    if (!client) {
      return res.status(404).json({ error: 'Cliente não encontrado' });
    }
    
    res.json(client);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch client data' });
  }
});

// Create payment intent
app.post('/api/payments/intent', async (req, res) => {
  try {
    const { projectId, amount } = req.body;
    
    // Create an invoice
    const invoice = await prisma.invoice.create({
      data: {
        description: 'Pagamento de Serviço / Sinal',
        amount: parseFloat(amount),
        status: 'pending',
        projectId
      }
    });

    // Here we'd integrate with Mercado Pago
    // For now returning the invoice ID to track
    res.json({ invoiceId: invoice.id, amount });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to create payment intent' });
  }
});

// --- Document Routes ---

// Get all documents
app.get('/api/documents', async (req, res) => {
  try {
    const documents = await prisma.document.findMany({
      orderBy: { createdAt: 'desc' }
    });
    res.json(documents);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch documents' });
  }
});

// Create document
app.post('/api/documents', async (req, res) => {
  try {
    const { title, type, clientName, date, url } = req.body;
    const document = await prisma.document.create({
      data: { title, type, clientName, date, url }
    });
    res.json(document);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create document' });
  }
});

// Update document
app.put('/api/documents/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { title, type, clientName, date, url } = req.body;
    const document = await prisma.document.update({
      where: { id },
      data: { title, type, clientName, date, url }
    });
    res.json(document);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update document' });
  }
});

// Delete document
app.delete('/api/documents/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.document.delete({ where: { id } });
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete document' });
  }
});

// Admin Dashboard data
app.get('/api/admin/dashboard', async (req, res) => {
  try {
    const projects = await prisma.project.findMany({
      include: { client: true }
    });
    
    const invoices = await prisma.invoice.findMany({
      include: { project: { include: { client: true } } },
      orderBy: { createdAt: 'desc' }
    });

    const activeProjects = projects.filter(p => p.phase !== 'Concluído').length;
    const pendingPayments = invoices
      .filter(i => i.status === 'pending')
      .reduce((sum, i) => sum + i.amount, 0);
    const onboardings = projects.filter(p => p.phase === 'Aguardando Sinal' || p.phase === 'Onboarding').length;

    const pipeline = projects.map(p => ({
      id: p.id,
      client: p.client.name,
      status: p.phase,
      payment: p.financial,
      progress: p.phase === 'Concluído' ? '100%' : '50%', // Simplification
      email: p.client.email,
      phone: p.client.cnpj || 'Não informado',
      seo: p.seo,
      analytics: p.analytics,
      support: p.support,
      ads: p.ads
    }));

    const paymentsData = invoices.map(i => ({
      date: i.createdAt.toLocaleDateString('pt-BR', { day: '2-digit', month: 'short' }),
      client: i.project.client.name,
      desc: i.description,
      value: `R$ ${i.amount.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`,
      status: i.status === 'paid' ? 'Pago' : i.status === 'pending' ? 'Pendente' : 'Atrasado'
    }));

    res.json({
      kpis: [
        { label: "Projetos ativos", value: activeProjects.toString() },
        { label: "Pag. Pendentes", value: `R$ ${pendingPayments.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}` },
        { label: "Onboardings", value: onboardings.toString(), sub: "incompletos" },
        { label: "Entregas Semana", value: "0" }
      ],
      pipeline,
      paymentsData
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch dashboard data' });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
