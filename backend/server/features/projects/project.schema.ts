import { z } from 'zod';

export const createProjectSchema = z.object({
  name: z.string().min(2),
  clientId: z.string().uuid(),
  phase: z.string().optional(),
  tipo: z.string().optional(),
  descricao: z.string().optional(),
  value: z.number().optional(),
  proximaAcao: z.string().optional(),
  dataEntregaPrevista: z.string().optional().or(z.date()),
});

export const updateProjectSchema = createProjectSchema.partial();
