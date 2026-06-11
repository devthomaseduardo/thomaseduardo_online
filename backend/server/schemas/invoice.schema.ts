import { z } from 'zod';

export const createInvoiceSchema = z.object({
  description: z.string().min(1),
  amount: z.number().positive(),
  status: z.enum(['pending', 'paid', 'partial', 'canceled', 'overdue']).optional(),
  type: z.string().optional(),
  valorPago: z.number().nonnegative().optional(),
  vencimento: z.string().optional().or(z.date()),
  metodoPagamento: z.string().optional(),
  projectId: z.string().uuid(),
});

export const updateInvoiceSchema = createInvoiceSchema.partial();
