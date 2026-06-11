import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { addTimeline } from '../services/timeline.service.js';

const prisma = new PrismaClient();

export const getProjectDeploys = async (req: Request, res: Response) => {
  try {
    const deploys = await (prisma as any).deploy.findMany({
      where: { projectId: req.params.id },
      orderBy: { createdAt: 'desc' }
    });
    res.json(deploys);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao buscar deploys.' });
  }
};

export const getAllDeploys = async (req: Request, res: Response) => {
  try {
    const deploys = await (prisma as any).deploy.findMany({
      include: { project: true },
      orderBy: { createdAt: 'desc' }
    });
    res.json(deploys);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao buscar deploys.' });
  }
};

export const createDeploy = async (req: Request, res: Response) => {
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

    // Auto-trigger Vercel webhook if available
    if (provider?.toLowerCase() === 'vercel' || !provider) {
      const vercelHook = await (prisma as any).integration.findFirst({
        where: { projectId: req.params.id, tipo: 'vercel_deploy_hook', status: 'ativo' }
      });
      if (vercelHook && vercelHook.identificador) {
        fetch(vercelHook.identificador, { method: 'POST' }).catch(err => console.error('Failed to trigger Vercel webhook', err));
      }
    }

    res.status(201).json(deploy);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};

export const updateDeploy = async (req: Request, res: Response) => {
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
      await addTimeline((deploy as any).projectId, 'Deploy Concluído', `Deploy publicado em: ${url ?? 'sem URL'}`, 'deploy', true);
    }

    res.json(deploy);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};

export const deleteDeploy = async (req: Request, res: Response) => {
  try {
    await (prisma as any).deploy.delete({ where: { id: req.params.id } });
    res.json({ success: true, message: 'Deploy removido.' });
  } catch (err: any) {
    if (err.code === 'P2025') return res.status(404).json({ error: 'Deploy não encontrado.' });
    res.status(500).json({ error: 'Erro ao excluir deploy.' });
  }
};
