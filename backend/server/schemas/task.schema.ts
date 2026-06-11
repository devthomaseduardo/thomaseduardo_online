import { z } from 'zod';

export const createTaskSchema = z.object({
  titulo: z.string().min(1),
  descricao: z.string().optional(),
  status: z.string().optional(),
  prioridade: z.string().optional(),
  responsavel: z.string().optional(),
  prazo: z.string().optional().or(z.date()),
  visivelCliente: z.boolean().optional(),
  ordem: z.number().int().optional(),
  projectId: z.string().uuid(),
});

export const updateTaskSchema = createTaskSchema.partial();
