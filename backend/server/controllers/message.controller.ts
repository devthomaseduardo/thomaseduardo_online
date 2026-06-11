import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getProjectMessages = async (req: Request, res: Response) => {
  try {
    const messages = await prisma.message.findMany({
      where: { projectId: req.params.id },
      orderBy: { createdAt: 'asc' }
    });
    res.json(messages);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

export const getAllMessages = async (req: Request, res: Response) => {
  try {
    const messages = await prisma.message.findMany({
      include: { project: true, client: true },
      orderBy: { createdAt: 'desc' }
    });
    res.json(messages);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

export const createMessage = async (req: Request, res: Response) => {
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
};

export const registerMetric = async (req: Request, res: Response) => {
  try {
    const { action, metadata } = req.body;
    
    if (action === 'proposal_viewed' || action === 'contract_viewed') {
      const client = await prisma.client.findUnique({ where: { id: (req as any).user.id } });
      const itemName = metadata?.title || 'Documento';
      
      await prisma.message.create({
        data: {
          clientId: (req as any).user.id,
          senderType: 'system',
          senderName: 'System Analytics',
          content: `[ENGAJAMENTO] O cliente ${client?.name} visualizou: ${itemName}`,
          read: false
        }
      });
    }

    res.json({ success: true });
  } catch (error) {
    console.error('Metrics Error:', error);
    res.status(500).json({ error: 'Erro ao registrar métrica' });
  }
};
