import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { addTimeline } from '../services/timeline.service.js';

const prisma = new PrismaClient();

export const getProjectTasks = async (req: Request, res: Response) => {
  try {
    const { projectId, id } = req.params;
    const tasks = await prisma.task.findMany({
      where: { 
        projectId: projectId || id,
        ...((req as any).user?.role !== 'admin' ? { visivelCliente: true } : {})
      },
      orderBy: { ordem: 'asc' }
    });
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar tarefas' });
  }
};

export const createProjectTask = async (req: Request, res: Response) => {
  try {
    const { projectId } = req.params;
    const { titulo, descricao, status, prioridade, responsavel, prazo, visivelCliente, ordem } = req.body;
    
    const count = await prisma.task.count({ where: { projectId } });
    
    const task = await prisma.task.create({
      data: {
        titulo,
        descricao,
        status: status || 'pendente',
        prioridade: prioridade || 'media',
        responsavel,
        prazo: prazo ? new Date(prazo) : null,
        visivelCliente: visivelCliente ?? false,
        ordem: ordem ?? count,
        projectId
      }
    });
    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao criar tarefa' });
  }
};

export const updateTask = async (req: Request, res: Response) => {
  try {
    const { id, projectId } = req.params;
    const data = req.body;
    const prev = await prisma.task.findUnique({ where: { id } });

    if (data.prazo) data.prazo = new Date(data.prazo);

    const task = await prisma.task.update({
      where: { id },
      data
    });

    if (data.status === 'concluida' && prev?.status !== 'concluida' && projectId) {
      await addTimeline(projectId, 'Tarefa Concluída', `Tarefa "${data.titulo ?? prev?.titulo}" foi marcada como concluída.`, 'admin', false);
    }

    res.json(task);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao atualizar tarefa' });
  }
};

export const deleteTask = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await prisma.task.delete({ where: { id } });
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao deletar tarefa' });
  }
};
