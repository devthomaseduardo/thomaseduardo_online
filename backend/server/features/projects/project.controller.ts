import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { addTimeline } from '../services/timeline.service.js';
import { emailService } from '../services/email.js';
import { env } from '../lib/env.js';
import { audit, getClientIp } from '../lib/audit.js';

const prisma = new PrismaClient();

export const getAllProjects = async (req: Request, res: Response) => {
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
};

export const getProjectById = async (req: Request, res: Response) => {
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
};

export const createProject = async (req: Request, res: Response) => {
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

    await audit({
      action: 'project.created',
      actorType: 'admin',
      actorId: (req as any).user?.id,
      ip: getClientIp(req),
      userAgent: req.headers['user-agent'],
      metadata: { projectId: result.id, clientId: result.clientId, name: result.name }
    });

    await addTimeline(result.id, 'Projeto Criado', `Projeto "${name}" iniciado no sistema.`, 'sistema', false);

    res.status(201).json(result);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};

export const updateProject = async (req: Request, res: Response) => {
  try {
    const { name, phase, status, progresso, proximaAcao, dataEntregaPrevista, internalNotes, value, tipo, descricao, repoUrl, productionUrl } = req.body;
    const prev = await prisma.project.findUnique({ where: { id: req.params.id }, include: { client: true } });

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

    await audit({
      action: 'project.updated',
      actorType: 'admin',
      actorId: (req as any).user?.id,
      ip: getClientIp(req),
      userAgent: req.headers['user-agent'],
      metadata: { projectId: req.params.id, updates: req.body }
    });

    if (status && prev?.status !== status) {
      await addTimeline(result.id, 'Status Atualizado', `Status alterado para "${status.toUpperCase()}"`, 'projeto', true);
      
      if (prev?.client?.email) {
        const statusHtml = `
          <div style="background:#000; color:#fff; padding:40px; font-family:sans-serif; border-radius:12px; border:1px solid #1a1a1a;">
            <h1 style="color:#10b981; font-size:24px; margin-bottom:20px;">Avanço na Operação</h1>
            <p>Olá, o status do seu projeto <strong>${prev.name}</strong> foi atualizado.</p>
            <div style="background:#111; padding:20px; border-radius:8px; margin:20px 0; border-left:4px solid #10b981;">
              <span style="font-size:10px; text-transform:uppercase; color:#666;">Novo Status Ativo</span><br>
              <strong style="font-size:18px; color:#fff;">${status.toUpperCase()}</strong>
            </div>
            <p>Você pode acompanhar todos os detalhes e o cronograma atualizado no seu portal.</p>
            <a href="${env.FRONTEND_URL}/portal" style="display:inline-block; background:#fff; color:#000; padding:14px 28px; text-decoration:none; border-radius:8px; font-weight:bold; margin-top:20px;">ACESSAR PORTAL SEGURO</a>
            <p style="font-size:10px; color:#333; margin-top:40px;">© 2026 Thomas Eduardo. Premium Digital Assets.</p>
          </div>
        `;
        emailService.sendEmail(prev.client.email, `Operação Atualizada: ${prev.name}`, statusHtml).catch(() => {});
      }
    }
    
    if (progresso !== undefined && prev?.progresso !== progresso) {
      await addTimeline(result.id, 'Progresso Atualizado', `Progresso atualizado para ${progresso}%`, 'sistema', false);
    }

    res.json(result);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};

export const deleteProject = async (req: Request, res: Response) => {
  const projectId = req.params.id;
  try {
    await prisma.$transaction([
      (prisma as any).payment.deleteMany({ where: { invoice: { projectId } } }),
      prisma.invoice.deleteMany({ where: { projectId } }),
      (prisma as any).projectFile.deleteMany({ where: { projectId } }),
      (prisma as any).timelineEvent.deleteMany({ where: { projectId } }),
      prisma.task.deleteMany({ where: { projectId } }),
      (prisma as any).deploy.deleteMany({ where: { projectId } }),
      (prisma as any).integration.deleteMany({ where: { projectId } }),
      prisma.message.deleteMany({ where: { projectId } }),
      prisma.proposal.deleteMany({ where: { projectId } }),
      (prisma as any).credential.deleteMany({ where: { projectId } }),
      (prisma as any).milestoneApproval.deleteMany({ where: { projectId } }),
      prisma.project.delete({ where: { id: projectId } })
    ]);

    await audit({
      action: 'project.deleted',
      actorType: 'admin',
      actorId: (req as any).user?.id,
      ip: getClientIp(req),
      userAgent: req.headers['user-agent'],
      metadata: { projectId }
    });

    res.json({ success: true, message: 'Projeto e todos os dados vinculados foram removidos.' });
  } catch (err: any) {
    console.error('[ForceDeleteProject] Error:', err);
    if (err.code === 'P2025') return res.status(404).json({ error: 'Projeto não encontrado.' });
    res.status(500).json({ error: 'Erro ao realizar exclusão forçada do projeto.' });
  }
};
