import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { emailService } from '../services/email.js';
import bcrypt from 'bcrypt';
import { audit, getClientIp } from '../lib/audit.js';

const prisma = new PrismaClient();

export const getAllClients = async (req: Request, res: Response) => {
  try {
    const clients = await prisma.client.findMany({
      include: { projects: true },
      orderBy: { createdAt: 'desc' }
    });
    res.json(clients);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao buscar clientes.' });
  }
};

export const getClientById = async (req: Request, res: Response) => {
  try {
    const client = await prisma.client.findUnique({
      where: { id: req.params.id },
      include: { 
        projects: {
          include: {
            invoices: true,
            contracts: true,
            tasks: true
          }
        },
        proposals: true,
        messages: true
      }
    });
    if (!client) return res.status(404).json({ error: 'Cliente não encontrado.' });
    res.json(client);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao buscar dados do cliente.' });
  }
};

export const createClient = async (req: Request, res: Response) => {
  try {
    const { name, email, cnpj, clientType, password, phone, obs } = req.body;
    if (!name || !email || !password) return res.status(400).json({ error: 'name, email e password são obrigatórios.' });

    const hashedPw = await bcrypt.hash(password, 10);

    const existingClient = await prisma.client.findUnique({ where: { email } });
    if (existingClient) {
      return res.status(400).json({ error: 'Um cliente com este email já existe.' });
    }

    const result = await prisma.client.create({
      data: { name, email, cnpj, clientType: clientType ?? 'new', password: hashedPw, phone, obs }
    });

    await audit({
      action: 'client.created',
      actorType: 'admin',
      actorId: (req as any).user?.id,
      ip: getClientIp(req),
      userAgent: req.headers['user-agent'],
      metadata: { clientId: result.id, email: result.email }
    });

    // Notificação de Boas-vindas (Arquitetura Premium)
    const welcomeHtml = emailService.generateWelcomeEmail(name, email, password);
    emailService.sendEmail(
      email,
      `Acesso Liberado: Portal Thomas Eduardo`,
      welcomeHtml
    ).catch(err => console.error('Failed to send premium welcome email (direct create)', err));

    res.status(201).json(result);
  } catch (err: any) {
    res.status(400).json({ error: err.message ?? 'Erro ao criar cliente.' });
  }
};

export const updateClient = async (req: Request, res: Response) => {
  try {
    const { name, email, cnpj, clientType, phone, obs } = req.body;
    const result = await prisma.client.update({
      where: { id: req.params.id },
      data: { name, email, cnpj, clientType, phone, obs }
    });

    await audit({
      action: 'client.updated',
      actorType: 'admin',
      actorId: (req as any).user?.id,
      ip: getClientIp(req),
      userAgent: req.headers['user-agent'],
      metadata: { clientId: req.params.id, updates: { name, email, cnpj, clientType, phone, obs } }
    });

    res.json(result);
  } catch (err: any) {
    res.status(400).json({ error: err.message ?? 'Erro ao atualizar cliente.' });
  }
};

export const deleteClient = async (req: Request, res: Response) => {
  const clientId = req.params.id;
  try {
    const projects = await prisma.project.findMany({ where: { clientId }, select: { id: true } });
    const pIds = projects.map(p => p.id);

    await prisma.$transaction([
      (prisma as any).payment.deleteMany({ where: { invoice: { projectId: { in: pIds } } } }),
      prisma.invoice.deleteMany({ where: { projectId: { in: pIds } } }),
      (prisma as any).projectFile.deleteMany({ where: { projectId: { in: pIds } } }),
      (prisma as any).timelineEvent.deleteMany({ where: { projectId: { in: pIds } } }),
      prisma.task.deleteMany({ where: { projectId: { in: pIds } } }),
      (prisma as any).deploy.deleteMany({ where: { projectId: { in: pIds } } }),
      (prisma as any).integration.deleteMany({ where: { projectId: { in: pIds } } }),
      prisma.message.deleteMany({ where: { projectId: { in: pIds } } }),
      prisma.proposal.deleteMany({ where: { projectId: { in: pIds } } }),
      (prisma as any).credential.deleteMany({ where: { projectId: { in: pIds } } }),
      (prisma as any).milestoneApproval.deleteMany({ where: { projectId: { in: pIds } } }),
      prisma.proposal.deleteMany({ where: { clientId } }),
      prisma.message.deleteMany({ where: { clientId } }),
      prisma.project.deleteMany({ where: { clientId } }),
      prisma.client.delete({ where: { id: clientId } })
    ]);

    await audit({
      action: 'client.deleted',
      actorType: 'admin',
      actorId: (req as any).user?.id,
      ip: getClientIp(req),
      userAgent: req.headers['user-agent'],
      metadata: { clientId }
    });

    res.json({ success: true, message: 'Cliente e todo o ecossistema vinculado foram removidos.' });
  } catch (err: any) {
    console.error('[ForceDeleteClient] Error:', err);
    res.status(500).json({ error: 'Erro ao realizar exclusão forçada do cliente.' });
  }
};

export const generatePortalKey = async (req: Request, res: Response) => {
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
};

export const deletePortalKey = async (req: Request, res: Response) => {
  try {
    await prisma.client.update({
      where: { id: req.params.id },
      data: { portalKey: null, portalActive: false }
    });
    res.json({ success: true });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};
