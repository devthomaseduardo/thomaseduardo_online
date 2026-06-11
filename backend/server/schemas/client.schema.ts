import { z } from 'zod';

export const createClientSchema = z.object({
  name: z.string().min(2, 'Nome muito curto'),
  email: z.string().email('E-mail inválido'),
  password: z.string().min(6, 'Senha deve ter pelo menos 6 caracteres'),
  cnpj: z.string().optional(),
  clientType: z.string().optional(),
  phone: z.string().optional(),
  obs: z.string().optional(),
});

export const updateClientSchema = createClientSchema.partial().omit({ password: true });
