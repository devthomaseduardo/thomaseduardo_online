import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getProjectIntegrations = async (req: Request, res: Response) => {
  try {
    const { projectId, id } = req.params;
    const integrations = await (prisma as any).integration.findMany({
      where: { projectId: projectId || id },
      orderBy: { createdAt: 'asc' }
    });
    res.json(integrations);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao buscar integrações.' });
  }
};

export const createIntegration = async (req: Request, res: Response) => {
  try {
    const { projectId, id } = req.params;
    const { tipo, identificador, dashboardUrl, status, visivelCliente, metricas } = req.body;
    if (!tipo) return res.status(400).json({ error: 'tipo é obrigatório.' });

    const integration = await (prisma as any).integration.create({
      data: {
        projectId: projectId || id,
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
};

export const updateIntegration = async (req: Request, res: Response) => {
  try {
    const { identificador, dashboardUrl, status, visivelCliente, metricas, tipo } = req.body;
    const integration = await (prisma as any).integration.update({
      where: { id: req.params.id },
      data: {
        ...(tipo !== undefined && { tipo }),
        identificador, dashboardUrl, status, visivelCliente,
        metricas: metricas ? JSON.stringify(metricas) : undefined
      }
    });
    res.json(integration);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};

export const deleteIntegration = async (req: Request, res: Response) => {
  try {
    await (prisma as any).integration.delete({ where: { id: req.params.id } });
    res.json({ success: true });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};
