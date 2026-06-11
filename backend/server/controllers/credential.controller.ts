import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getProjectCredentials = async (req: Request, res: Response) => {
  try {
    const { projectId, id } = req.params;
    const pid = projectId || id;

    if ((req as any).user?.role !== 'admin') {
      const project = await prisma.project.findFirst({ where: { id: pid, clientId: (req as any).user.id } });
      if (!project) return res.status(403).json({ error: 'Sem permissão para este projeto.' });
    }

    const creds = await prisma.credential.findMany({
      where: { 
        projectId: pid,
        ...((req as any).user?.role !== 'admin' ? { visivelCliente: true } : {})
      },
      orderBy: { createdAt: 'desc' }
    });
    res.json(creds);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao buscar credenciais.' });
  }
};

export const createCredential = async (req: Request, res: Response) => {
  try {
    const { projectId, id } = req.params;
    const { label, username, password, url, notes, category, visivelCliente } = req.body;
    
    const credential = await prisma.credential.create({
      data: {
        label,
        username,
        password,
        url,
        notes,
        category: category || 'hosting',
        visivelCliente: visivelCliente ?? false,
        projectId: projectId || id
      }
    });
    res.status(201).json(credential);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao criar credencial' });
  }
};

export const updateCredential = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const data = req.body;

    const credential = await prisma.credential.update({
      where: { id },
      data
    });
    res.json(credential);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao atualizar credencial' });
  }
};

export const deleteCredential = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await prisma.credential.delete({ where: { id } });
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao deletar credencial' });
  }
};
