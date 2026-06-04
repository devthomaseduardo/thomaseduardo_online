import { Router, Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { extractBearer, verifyAdminToken } from '../lib/jwt.js';

const router = Router();
const prisma = new PrismaClient();

// ─── AUTH MIDDLEWARE ────────────────────────────────────────────────────────
const adminAuth = (req: Request, res: Response, next: Function) => {
  const bearerToken = extractBearer(req.headers['authorization'] as string | undefined);
  if (bearerToken) {
    const payload = verifyAdminToken(bearerToken);
    if (payload?.role === 'admin') {
      return next();
    }
  }

  const key = req.headers['x-admin-key'];
  if (key === process.env.ADMIN_PASSWORD) {
    return next();
  }

  return res.status(401).json({ error: 'Unauthorized' });
};

// ─── HELPER: criar timeline event ──────────────────────────────────────────
async function addTimeline(projectId: string, titulo: string, descricao: string, tipo: string, visivelCliente = false) {
  try {
    await (prisma as any).timelineEvent.create({
      data: { projectId, titulo, descricao, tipo, visivelCliente, criadoPor: 'admin' }
    });
  } catch (e) {
    console.warn('Timeline event failed (table may not exist yet):', e);
  }
}

// ==========================================
// DASHBOARD
// ==========================================

router.get('/dashboard', adminAuth, async (req, res) => {
  try {
    const projects = await prisma.project.findMany({
      include: { client: true, invoices: true, files: true }
    });
    const invoices = await prisma.invoice.findMany({
      include: { project: { include: { client: true } } },
      orderBy: { createdAt: 'desc' }
    });

    const activeProjects = projects.filter(p => !['concluido', 'cancelado'].includes(p.status ?? p.phase)).length;
    const pendingPayments = invoices
      .filter(i => ['pending', 'partial', 'overdue'].includes(i.status))
      .reduce((sum, i) => sum + (i.saldo ?? i.amount), 0);
    const clientCount = await prisma.client.count();

    const pipeline = projects.map(p => {
      const totalPago = p.invoices.reduce((s, i) => s + (i.valorPago ?? 0), 0);
      const valorTotal = p.invoices.reduce((s, i) => s + i.amount, 0);
      return {
        id: p.id,
        client: p.client.name,
        nome: p.name,
        tipo: p.tipo ?? 'website',
        status: p.status ?? p.phase,
        progresso: p.progresso ?? 0,
        proximaAcao: p.proximaAcao,
        dataEntregaPrevista: p.dataEntregaPrevista,
        payment: totalPago >= valorTotal && valorTotal > 0 ? 'Pago' : 'Pendente',
        progress: (p.progresso ?? 0) + '%',
        email: p.client.email,
        value: valorTotal,
        totalPaid: totalPago,
        balance: valorTotal - totalPago,
        files: p.files ?? []
      };
    });

    const paymentsData = invoices.map(i => ({
      id: i.id,
      date: i.createdAt.toLocaleDateString('pt-BR'),
      client: i.project?.client?.name ?? 'Desconhecido',
      desc: i.description,
      value: `R$ ${i.amount.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`,
      status: i.status === 'paid' ? 'Pago' : i.status === 'pending' ? 'Pendente' : 'Parcial',
      dueDate: i.vencimento ? i.vencimento.toLocaleDateString('pt-BR') : null,
    }));

    res.json({
      kpis: [
        { label: 'Projetos ativos', value: activeProjects.toString() },
        { label: 'A Receber', value: `R$ ${pendingPayments.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}` },
        { label: 'Clientes', value: clientCount.toString() },
      ],
      pipeline,
      paymentsData
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao buscar dashboard' });
  }
});

// ==========================================
// CLIENTES
// ==========================================

router.get('/clients', adminAuth, async (req, res) => {
  try {
    const clients = await prisma.client.findMany({
      include: { projects: true },
      orderBy: { createdAt: 'desc' }
    });
    res.json(clients);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao buscar clientes.' });
  }
});

router.post('/clients', adminAuth, async (req, res) => {
  try {
    const { name, email, cnpj, clientType, password } = req.body;
    if (!name || !email || !password) return res.status(400).json({ error: 'name, email e password são obrigatórios.' });

    const bcrypt = await import('bcrypt');
    const hashedPw = await bcrypt.default.hash(password, 10);

    const result = await prisma.client.create({
      data: { name, email, cnpj, clientType: clientType ?? 'new', password: hashedPw }
    });
    res.status(201).json(result);
  } catch (err: any) {
    res.status(400).json({ error: err.message ?? 'Erro ao criar cliente.' });
  }
});

router.put('/clients/:id', adminAuth, async (req, res) => {
  try {
    const { name, email, cnpj, clientType } = req.body;
    const result = await prisma.client.update({
      where: { id: req.params.id },
      data: { name, email, cnpj, clientType }
    });
    res.json(result);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
});

router.delete('/clients/:id', adminAuth, async (req, res) => {
  try {
    await prisma.client.delete({ where: { id: req.params.id } });
    res.json({ success: true });
  } catch (err: any) {
    res.status(500).json({ error: 'Erro ao excluir cliente.' });
  }
});

router.post('/clients/:id/portal-key', adminAuth, async (req, res) => {
  try {
    const key = `${Math.random().toString(36).slice(2)}-${Date.now()}`;
    const client = await prisma.client.update({
      where: { id: req.params.id },
      data: { portalKey: key, portalActive: true }
    });
    res.json({ clientId: client.id, portalKey: key });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

router.delete('/clients/:id/portal-key', adminAuth, async (req, res) => {
  try {
    await prisma.client.update({
      where: { id: req.params.id },
      data: { portalKey: null, portalActive: false }
    });
    res.json({ success: true });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// ==========================================
// PROJETOS
// ==========================================

router.get('/projects', adminAuth, async (req, res) => {
  try {
    const projects = await prisma.project.findMany({
      include: {
        client: true,
        invoices: { include: { payments: true } },
        files: true,
        tasks: { orderBy: { ordem: 'asc' } },
        timeline: { orderBy: { createdAt: 'desc' }, take: 1 },
        contracts: true,
        deploys: { orderBy: { createdAt: 'desc' }, take: 1 },
      },
      orderBy: { createdAt: 'desc' }
    });
    res.json(projects);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao buscar projetos.' });
  }
});

router.get('/projects/:id', adminAuth, async (req, res) => {
  try {
    const project = await prisma.project.findUnique({
      where: { id: req.params.id },
      include: {
        client: true,
        invoices: { include: { payments: true } },
        files: true,
        tasks: { orderBy: { ordem: 'asc' } },
        timeline: { orderBy: { createdAt: 'desc' } },
        contracts: true,
        deploys: { orderBy: { createdAt: 'desc' } },
        integrations: true,
      }
    });
    if (!project) return res.status(404).json({ error: 'Projeto não encontrado.' });
    res.json(project);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao buscar projeto.' });
  }
});

router.post('/projects', adminAuth, async (req, res) => {
  try {
    const { name, clientId, phase, tipo, descricao, value, proximaAcao, dataEntregaPrevista } = req.body;
    if (!name || !clientId) return res.status(400).json({ error: 'name e clientId obrigatórios.' });

    const result = await prisma.project.create({
      data: {
        name,
        clientId,
        phase: phase ?? 'Briefing',
        financial: 'pending',
        value: value ?? 0,
        tipo: tipo ?? 'website',
        descricao,
        proximaAcao,
        dataEntregaPrevista: dataEntregaPrevista ? new Date(dataEntregaPrevista) : undefined,
        status: 'briefing',
        progresso: 0
      }
    });

    await addTimeline(result.id, 'Projeto Criado', `Projeto "${name}" iniciado no sistema.`, 'sistema', false);

    res.status(201).json(result);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
});

router.put('/projects/:id', adminAuth, async (req, res) => {
  try {
    const { name, phase, status, progresso, proximaAcao, dataEntregaPrevista, internalNotes, value, tipo, descricao, repoUrl, productionUrl } = req.body;
    const prev = await prisma.project.findUnique({ where: { id: req.params.id } });

    const result = await prisma.project.update({
      where: { id: req.params.id },
      data: {
        ...(name !== undefined && { name }),
        ...(phase !== undefined && { phase }),
        ...(status !== undefined && { status }),
        ...(progresso !== undefined && { progresso }),
        ...(proximaAcao !== undefined && { proximaAcao }),
        ...(dataEntregaPrevista !== undefined && { dataEntregaPrevista: new Date(dataEntregaPrevista) }),
        ...(internalNotes !== undefined && { internalNotes }),
        ...(value !== undefined && { value }),
        ...(tipo !== undefined && { tipo }),
        ...(descricao !== undefined && { descricao }),
        ...(repoUrl !== undefined && { repoUrl }),
        ...(productionUrl !== undefined && { productionUrl }),
      }
    });

    if (status && prev?.status !== status) {
      await addTimeline(result.id, 'Status Atualizado', `Status alterado de "${prev?.status}" para "${status}"`, 'projeto', false);
    }
    if (progresso !== undefined && prev?.progresso !== progresso) {
      await addTimeline(result.id, 'Progresso Atualizado', `Progresso atualizado para ${progresso}%`, 'sistema', false);
    }

    res.json(result);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
});

// ==========================================
// TIMELINE
// ==========================================

router.get('/projects/:id/timeline', adminAuth, async (req, res) => {
  try {
    const isAdmin = req.headers['x-admin-key'] === process.env.ADMIN_PASSWORD;
    const events = await (prisma as any).timelineEvent.findMany({
      where: {
        projectId: req.params.id,
        ...(isAdmin ? {} : { visivelCliente: true })
      },
      orderBy: { createdAt: 'desc' }
    });
    res.json(events);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao buscar timeline.' });
  }
});

router.post('/projects/:id/timeline', adminAuth, async (req, res) => {
  try {
    const { titulo, descricao, tipo, visivelCliente } = req.body;
    if (!titulo) return res.status(400).json({ error: 'titulo é obrigatório.' });

    const event = await (prisma as any).timelineEvent.create({
      data: {
        projectId: req.params.id,
        titulo,
        descricao,
        tipo: tipo ?? 'admin',
        visivelCliente: visivelCliente ?? false,
        criadoPor: 'admin'
      }
    });
    res.status(201).json(event);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
});

router.put('/projects/:projectId/timeline/:id', adminAuth, async (req, res) => {
  try {
    const { titulo, descricao, tipo, visivelCliente } = req.body;
    const event = await (prisma as any).timelineEvent.update({
      where: { id: req.params.id },
      data: { titulo, descricao, tipo, visivelCliente }
    });
    res.json(event);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
});

router.delete('/projects/:projectId/timeline/:id', adminAuth, async (req, res) => {
  try {
    await (prisma as any).timelineEvent.delete({ where: { id: req.params.id } });
    res.json({ success: true });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// ==========================================
// TAREFAS
// ==========================================

router.get('/projects/:id/tasks', adminAuth, async (req, res) => {
  try {
    const tasks = await (prisma as any).task.findMany({
      where: { projectId: req.params.id },
      orderBy: { ordem: 'asc' }
    });
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao buscar tarefas.' });
  }
});

router.post('/projects/:id/tasks', adminAuth, async (req, res) => {
  try {
    const { titulo, descricao, status, prioridade, responsavel, prazo, visivelCliente } = req.body;
    if (!titulo) return res.status(400).json({ error: 'titulo é obrigatório.' });

    const count = await (prisma as any).task.count({ where: { projectId: req.params.id } });
    const task = await (prisma as any).task.create({
      data: {
        projectId: req.params.id,
        titulo,
        descricao,
        status: status ?? 'pendente',
        prioridade: prioridade ?? 'media',
        responsavel,
        prazo: prazo ? new Date(prazo) : undefined,
        visivelCliente: visivelCliente ?? false,
        ordem: count
      }
    });
    res.status(201).json(task);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
});

router.put('/projects/:projectId/tasks/:id', adminAuth, async (req, res) => {
  try {
    const { titulo, descricao, status, prioridade, responsavel, prazo, visivelCliente, ordem } = req.body;
    const prev = await (prisma as any).task.findUnique({ where: { id: req.params.id } });

    const task = await (prisma as any).task.update({
      where: { id: req.params.id },
      data: { titulo, descricao, status, prioridade, responsavel, prazo: prazo ? new Date(prazo) : undefined, visivelCliente, ordem }
    });

    // Tarefa concluída → timeline
    if (status === 'concluida' && prev?.status !== 'concluida') {
      await addTimeline(req.params.projectId, 'Tarefa Concluída', `Tarefa "${titulo ?? prev?.titulo}" foi marcada como concluída.`, 'admin', false);
    }

    res.json(task);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
});

router.delete('/projects/:projectId/tasks/:id', adminAuth, async (req, res) => {
  try {
    await (prisma as any).task.delete({ where: { id: req.params.id } });
    res.json({ success: true });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// ==========================================
// FINANCEIRO (INVOICES)
// ==========================================

router.get('/projects/:id/invoices', adminAuth, async (req, res) => {
  try {
    const invoices = await prisma.invoice.findMany({
      where: { projectId: req.params.id },
      include: { payments: true },
      orderBy: { createdAt: 'desc' }
    });
    res.json(invoices);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao buscar invoices.' });
  }
});

router.get('/invoices', adminAuth, async (req, res) => {
  try {
    const invoices = await prisma.invoice.findMany({
      include: { project: { include: { client: true } } },
      orderBy: { createdAt: 'desc' }
    });
    res.json(invoices);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao buscar invoices.' });
  }
});

router.post('/projects/:id/invoices', adminAuth, async (req, res) => {
  try {
    const { description, amount, vencimento, metodoPagamento, pixCopiaCola, mercadoPagoUrl } = req.body;
    if (!description || !amount) return res.status(400).json({ error: 'description e amount são obrigatórios.' });

    const invoice = await prisma.invoice.create({
      data: {
        projectId: req.params.id,
        description,
        amount,
        saldo: amount,
        valorPago: 0,
        status: 'pending',
        vencimento: vencimento ? new Date(vencimento) : undefined,
        metodoPagamento,
        pixCopiaCola,
        mercadoPagoUrl
      }
    });

    await addTimeline(req.params.id, 'Fatura Gerada', `Fatura "${description}" no valor de R$ ${amount} criada.`, 'financeiro', false);

    res.status(201).json(invoice);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
});

router.post('/projects/:projectId/invoices/:id/pay', adminAuth, async (req, res) => {
  try {
    const { valor, metodo } = req.body;
    const invoice = await prisma.invoice.findUnique({ where: { id: req.params.id } });
    if (!invoice) return res.status(404).json({ error: 'Invoice não encontrada.' });

    const novoValorPago = (invoice.valorPago ?? 0) + valor;
    const novoSaldo = invoice.amount - novoValorPago;
    const novoStatus = novoSaldo <= 0 ? 'paid' : 'partial';

    await prisma.$transaction([
      (prisma as any).payment.create({
        data: { invoiceId: invoice.id, valor, metodo, status: 'pago', pagoEm: new Date() }
      }),
      prisma.invoice.update({
        where: { id: invoice.id },
        data: { valorPago: novoValorPago, saldo: Math.max(0, novoSaldo), status: novoStatus }
      })
    ]);

    await addTimeline(req.params.projectId, 'Pagamento Recebido', `Pagamento de R$ ${valor} via ${metodo}.`, 'financeiro', true);

    res.json({ success: true, novoStatus, novoSaldo });
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
});

// ==========================================
// CONTRATOS
// ==========================================

router.get('/projects/:id/contracts', adminAuth, async (req, res) => {
  try {
    const contracts = await (prisma as any).contract.findMany({
      where: { projectId: req.params.id },
      orderBy: { createdAt: 'desc' }
    });
    res.json(contracts);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao buscar contratos.' });
  }
});

router.get('/contracts', adminAuth, async (req, res) => {
  try {
    const contracts = await (prisma as any).contract.findMany({
      include: { project: true },
      orderBy: { createdAt: 'desc' }
    });
    res.json(contracts);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao buscar contratos.' });
  }
});

router.post('/projects/:id/contracts', adminAuth, async (req, res) => {
  try {
    const { titulo, status, versao, fileUrl, visivelCliente } = req.body;
    if (!titulo) return res.status(400).json({ error: 'titulo é obrigatório.' });

    const contract = await (prisma as any).contract.create({
      data: {
        projectId: req.params.id,
        titulo,
        status: status ?? 'rascunho',
        versao: versao ?? '1.0',
        fileUrl,
        visivelCliente: visivelCliente ?? false,
        ...(status === 'enviado' ? { enviadoEm: new Date() } : {}),
        ...(status === 'assinado' ? { assinadoEm: new Date() } : {})
      }
    });

    if (status === 'enviado') {
      await addTimeline(req.params.id, 'Contrato Enviado', `Contrato "${titulo}" enviado para o cliente.`, 'contrato', true);
    }

    res.status(201).json(contract);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
});

router.put('/projects/:projectId/contracts/:id', adminAuth, async (req, res) => {
  try {
    const { status, fileUrl, visivelCliente } = req.body;
    const contract = await (prisma as any).contract.update({
      where: { id: req.params.id },
      data: {
        ...(status !== undefined && { status }),
        ...(fileUrl !== undefined && { fileUrl }),
        ...(visivelCliente !== undefined && { visivelCliente }),
        ...(status === 'assinado' ? { assinadoEm: new Date() } : {})
      }
    });

    if (status === 'assinado') {
      await addTimeline(req.params.projectId, 'Contrato Assinado', 'O contrato foi assinado pelo cliente.', 'contrato', true);
    }

    res.json(contract);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
});

// ==========================================
// DEPLOYS
// ==========================================

router.get('/projects/:id/deploys', adminAuth, async (req, res) => {
  try {
    const deploys = await (prisma as any).deploy.findMany({
      where: { projectId: req.params.id },
      orderBy: { createdAt: 'desc' }
    });
    res.json(deploys);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao buscar deploys.' });
  }
});

router.get('/deploys', adminAuth, async (req, res) => {
  try {
    const deploys = await (prisma as any).deploy.findMany({
      include: { project: true },
      orderBy: { createdAt: 'desc' }
    });
    res.json(deploys);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao buscar deploys.' });
  }
});

router.post('/projects/:id/deploys', adminAuth, async (req, res) => {
  try {
    const { ambiente, url, provider, branch, commitHash, logs, visivelCliente } = req.body;

    const deploy = await (prisma as any).deploy.create({
      data: {
        projectId: req.params.id,
        ambiente: ambiente ?? 'production',
        url,
        provider: provider ?? 'vercel',
        status: 'building',
        branch: branch ?? 'main',
        commitHash,
        logs,
        visivelCliente: visivelCliente ?? false
      }
    });

    await addTimeline(req.params.id, 'Deploy Iniciado', `Deploy em ${ambiente ?? 'production'} iniciado.`, 'deploy', visivelCliente ?? false);

    res.status(201).json(deploy);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
});

router.put('/projects/:projectId/deploys/:id', adminAuth, async (req, res) => {
  try {
    const { status, url, logs, visivelCliente } = req.body;
    const deploy = await (prisma as any).deploy.update({
      where: { id: req.params.id },
      data: {
        ...(status !== undefined && { status }),
        ...(url !== undefined && { url }),
        ...(logs !== undefined && { logs }),
        ...(visivelCliente !== undefined && { visivelCliente }),
        ...(status === 'success' ? { deployedAt: new Date() } : {})
      }
    });

    if (status === 'success') {
      await addTimeline(req.params.projectId, 'Deploy Concluído', `Deploy publicado em: ${url ?? 'sem URL'}`, 'deploy', true);
    }

    res.json(deploy);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
});

// ==========================================
// ANALYTICS / INTEGRAÇÕES
// ==========================================

router.get('/projects/:id/integrations', adminAuth, async (req, res) => {
  try {
    const integrations = await (prisma as any).integration.findMany({
      where: { projectId: req.params.id },
      orderBy: { createdAt: 'asc' }
    });
    res.json(integrations);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao buscar integrações.' });
  }
});

router.post('/projects/:id/integrations', adminAuth, async (req, res) => {
  try {
    const { tipo, identificador, dashboardUrl, status, visivelCliente, metricas } = req.body;
    if (!tipo) return res.status(400).json({ error: 'tipo é obrigatório.' });

    const integration = await (prisma as any).integration.create({
      data: {
        projectId: req.params.id,
        tipo,
        identificador,
        dashboardUrl,
        status: status ?? 'ativo',
        visivelCliente: visivelCliente ?? false,
        metricas: metricas ? JSON.stringify(metricas) : null
      }
    });
    res.status(201).json(integration);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
});

router.put('/projects/:projectId/integrations/:id', adminAuth, async (req, res) => {
  try {
    const { identificador, dashboardUrl, status, visivelCliente, metricas } = req.body;
    const integration = await (prisma as any).integration.update({
      where: { id: req.params.id },
      data: {
        identificador, dashboardUrl, status, visivelCliente,
        metricas: metricas ? JSON.stringify(metricas) : undefined
      }
    });
    res.json(integration);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
});

// ==========================================
// ARQUIVOS
// ==========================================

router.get('/projects/:id/files', adminAuth, async (req, res) => {
  try {
    const files = await prisma.projectFile.findMany({
      where: { projectId: req.params.id },
      orderBy: { createdAt: 'desc' }
    });
    res.json(files);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao buscar arquivos.' });
  }
});

router.put('/projects/:projectId/files/:id', adminAuth, async (req, res) => {
  try {
    const { status, visivelCliente } = req.body;
    const file = await prisma.projectFile.update({
      where: { id: req.params.id },
      data: { status, visivelCliente }
    });
    res.json(file);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
});

router.delete('/projects/:projectId/files/:id', adminAuth, async (req, res) => {
  try {
    await prisma.projectFile.delete({ where: { id: req.params.id } });
    res.json({ success: true });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// ==========================================
// PROPOSTAS COMERCIAIS

router.get('/proposals', adminAuth, async (req, res) => {
  try {
    const proposals = await prisma.proposal.findMany({
      include: { client: true, project: true },
      orderBy: { updatedAt: 'desc' }
    });
    res.json(proposals);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/proposals', adminAuth, async (req, res) => {
  try {
    const { title, description, amount, clientId, projectId, status, stage, approvalLink } = req.body;
    if (!title) return res.status(400).json({ error: 'title é obrigatório.' });

    const proposal = await prisma.proposal.create({
      data: {
        title,
        description,
        amount: amount ?? 0,
        clientId,
        projectId,
        status: status ?? 'draft',
        stage: stage ?? 'draft',
        approvalLink
      }
    });
    res.status(201).json(proposal);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
});

router.put('/proposals/:id', adminAuth, async (req, res) => {
  try {
    const { title, description, amount, status, stage, approvalLink, acceptedAt } = req.body;
    const proposal = await prisma.proposal.update({
      where: { id: req.params.id },
      data: {
        ...(title !== undefined && { title }),
        ...(description !== undefined && { description }),
        ...(amount !== undefined && { amount }),
        ...(status !== undefined && { status }),
        ...(stage !== undefined && { stage }),
        ...(approvalLink !== undefined && { approvalLink }),
        ...(acceptedAt !== undefined && { acceptedAt: new Date(acceptedAt) })
      }
    });
    res.json(proposal);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
});

router.delete('/proposals/:id', adminAuth, async (req, res) => {
  try {
    await prisma.proposal.delete({ where: { id: req.params.id } });
    res.json({ success: true });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/proposals/:id/convert', adminAuth, async (req, res) => {
  try {
    const proposal = await prisma.proposal.findUnique({ where: { id: req.params.id } });
    if (!proposal) return res.status(404).json({ error: 'Proposal não encontrada.' });

    const project = await prisma.project.create({
      data: {
        name: proposal.title,
        clientId: proposal.clientId ?? '',
        phase: 'Proposta',
        financial: 'pending',
        value: proposal.amount,
        tipo: 'website',
        descricao: proposal.description,
        status: 'proposta',
        progresso: 0
      }
    });

    await prisma.proposal.update({
      where: { id: proposal.id },
      data: { status: 'approved', acceptedAt: new Date(), projectId: project.id }
    });

    res.json({ project, proposalConverted: true });
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
});

// ==========================================
// LEADS E CRM

router.get('/leads', adminAuth, async (req, res) => {
  try {
    const leads = await prisma.lead.findMany({ orderBy: { updatedAt: 'desc' } });
    res.json(leads);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/leads', adminAuth, async (req, res) => {
  try {
    const { name, email, phone, source, status, owner, notes, nextActionAt } = req.body;
    if (!name) return res.status(400).json({ error: 'name é obrigatório.' });

    const lead = await prisma.lead.create({
      data: {
        name,
        email,
        phone,
        source: source ?? 'site',
        status: status ?? 'new',
        owner,
        notes,
        nextActionAt: nextActionAt ? new Date(nextActionAt) : undefined
      }
    });
    res.status(201).json(lead);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
});

router.put('/leads/:id', adminAuth, async (req, res) => {
  try {
    const { name, email, phone, source, status, owner, notes, nextActionAt } = req.body;
    const lead = await prisma.lead.update({
      where: { id: req.params.id },
      data: {
        ...(name !== undefined && { name }),
        ...(email !== undefined && { email }),
        ...(phone !== undefined && { phone }),
        ...(source !== undefined && { source }),
        ...(status !== undefined && { status }),
        ...(owner !== undefined && { owner }),
        ...(notes !== undefined && { notes }),
        ...(nextActionAt !== undefined && { nextActionAt: new Date(nextActionAt) })
      }
    });
    res.json(lead);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
});

router.delete('/leads/:id', adminAuth, async (req, res) => {
  try {
    await prisma.lead.delete({ where: { id: req.params.id } });
    res.json({ success: true });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/leads/:id/convert', adminAuth, async (req, res) => {
  try {
    const { clientName, clientEmail, clientCnpj, password } = req.body;
    const lead = await prisma.lead.findUnique({ where: { id: req.params.id } });
    if (!lead) return res.status(404).json({ error: 'Lead não encontrada.' });

    if (!clientName || !clientEmail || !password) {
      return res.status(400).json({ error: 'clientName, clientEmail e password são obrigatórios.' });
    }

    const bcrypt = await import('bcrypt');
    const hashedPw = await bcrypt.default.hash(password, 10);

    const client = await prisma.client.create({
      data: {
        name: clientName,
        email: clientEmail,
        cnpj: clientCnpj,
        password: hashedPw,
        clientType: 'converted'
      }
    });

    await prisma.lead.update({
      where: { id: lead.id },
      data: { converted: true, convertedAt: new Date(), convertedToId: client.id }
    });

    res.json({ client, converted: true });
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
});

// ==========================================
// MENSAGENS

router.get('/projects/:id/messages', adminAuth, async (req, res) => {
  try {
    const messages = await prisma.message.findMany({
      where: { projectId: req.params.id },
      orderBy: { createdAt: 'asc' }
    });
    res.json(messages);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/messages', adminAuth, async (req, res) => {
  try {
    const messages = await prisma.message.findMany({
      include: { project: true, client: true },
      orderBy: { createdAt: 'desc' }
    });
    res.json(messages);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/projects/:id/messages', adminAuth, async (req, res) => {
  try {
    const { senderType, senderName, content, clientId } = req.body;
    if (!content) return res.status(400).json({ error: 'content é obrigatório.' });

    const message = await prisma.message.create({
      data: {
        projectId: req.params.id,
        clientId,
        senderType: senderType ?? 'internal',
        senderName,
        content,
        read: false
      }
    });
    res.status(201).json(message);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
});

// ==========================================
// EQUIPE / CONFIGURAÇÕES

router.get('/team-members', adminAuth, async (req, res) => {
  try {
    const team = await prisma.teamMember.findMany({ orderBy: { createdAt: 'desc' } });
    res.json(team);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/team-members', adminAuth, async (req, res) => {
  try {
    const { name, email, role, permissions, active } = req.body;
    if (!name || !email) return res.status(400).json({ error: 'name e email são obrigatórios.' });

    const member = await prisma.teamMember.create({
      data: {
        name,
        email,
        role: role ?? 'editor',
        permissions: permissions ? JSON.stringify(permissions) : undefined,
        active: active ?? true
      }
    });
    res.status(201).json(member);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
});

router.put('/team-members/:id', adminAuth, async (req, res) => {
  try {
    const { name, email, role, permissions, active } = req.body;
    const member = await prisma.teamMember.update({
      where: { id: req.params.id },
      data: {
        ...(name !== undefined && { name }),
        ...(email !== undefined && { email }),
        ...(role !== undefined && { role }),
        ...(permissions !== undefined && { permissions: JSON.stringify(permissions) }),
        ...(active !== undefined && { active })
      }
    });
    res.json(member);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
});

router.delete('/team-members/:id', adminAuth, async (req, res) => {
  try {
    await prisma.teamMember.delete({ where: { id: req.params.id } });
    res.json({ success: true });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
