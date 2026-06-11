import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getProjectTimeline = async (req: Request, res: Response) => {
  try {
    const events = await (prisma as any).timelineEvent.findMany({
      where: { projectId: req.params.id },
      orderBy: { createdAt: 'desc' }
    });
    res.json(events);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao buscar timeline.' });
  }
};

export const createTimelineEvent = async (req: Request, res: Response) => {
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
};

export const updateTimelineEvent = async (req: Request, res: Response) => {
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
};

export const deleteTimelineEvent = async (req: Request, res: Response) => {
  try {
    await (prisma as any).timelineEvent.delete({ where: { id: req.params.id } });
    res.json({ success: true });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};
