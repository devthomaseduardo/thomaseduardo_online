import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { getClientIp } from '../lib/audit.js';
import { emailService } from '../services/email.js';
import { env } from '../lib/env.js';

const prisma = new PrismaClient();

export const getProjectMilestones = async (req: Request, res: Response) => {
  try {
    const { projectId, id } = req.params;
    const pid = projectId || id;

    if ((req as any).user?.role !== 'admin') {
      const project = await prisma.project.findFirst({ where: { id: pid, clientId: (req as any).user.id } });
      if (!project) return res.status(403).json({ error: 'Sem permissão para este projeto.' });
    }

    const milestones = await prisma.milestoneApproval.findMany({
      where: { projectId: pid },
      orderBy: { createdAt: 'desc' }
    });
    res.json(milestones);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar marcos' });
  }
};

export const createMilestone = async (req: Request, res: Response) => {
  try {
    const { projectId, id } = req.params;
    const { title, description } = req.body;
    
    const milestone = await prisma.milestoneApproval.create({
      data: {
        title,
        description,
        status: 'pending',
        projectId: projectId || id
      }
    });

    const project = await prisma.project.findUnique({ where: { id: projectId || id }, include: { client: true } });
    if (project?.client?.email) {
      const approvalHtml = `
        <div style="background:#000; color:#fff; padding:40px; font-family:sans-serif; border-radius:12px; border:1px solid #1a1a1a;">
          <h1 style="color:#10b981; font-size:24px; margin-bottom:20px;">Aprovação Solicitada</h1>
          <p>Olá, uma nova entrega parcial do projeto <strong>${project.name}</strong> está aguardando sua revisão.</p>
          <div style="background:#111; padding:20px; border-radius:8px; margin:20px 0;">
            <span style="font-size:10px; text-transform:uppercase; color:#666;">Marco de Entrega</span><br>
            <strong style="font-size:18px; color:#fff;">${title}</strong>
          </div>
          <p>Acesse o portal para conferir o material e realizar o aceite digital.</p>
          <a href="${env.FRONTEND_URL}/portal" style="display:inline-block; background:#fff; color:#000; padding:14px 28px; text-decoration:none; border-radius:8px; font-weight:bold; margin-top:20px;">REVISAR ENTREGA</a>
        </div>
      `;
      emailService.sendEmail(project.client.email, `Aprovação Pendente: ${title}`, approvalHtml).catch(() => {});
    }

    res.status(201).json(milestone);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao criar marco' });
  }
};

export const approveMilestone = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { feedback } = req.body;
    const ip = getClientIp(req);
    const userAgent = req.headers['user-agent'] || 'Unknown';

    const milestone = await prisma.milestoneApproval.findUnique({
      where: { id },
      include: { project: true }
    });

    if (!milestone) return res.status(404).json({ error: 'Marco não encontrado.' });

    // Client auth check
    if ((req as any).user.role !== 'admin' && milestone.project.clientId !== (req as any).user.id) {
      return res.status(403).json({ error: 'Sem permissão.' });
    }

    const updated = await prisma.milestoneApproval.update({
      where: { id },
      data: {
        status: 'approved',
        approvedAt: new Date(),
        approvedIp: ip,
        approvedUserAgent: userAgent,
        feedback
      }
    });

    res.json(updated);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao aprovar marco' });
  }
};

export const deleteMilestone = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await prisma.milestoneApproval.delete({ where: { id } });
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao deletar marco' });
  }
};
