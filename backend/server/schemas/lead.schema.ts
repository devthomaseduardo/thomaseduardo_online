import { z } from 'zod';

export const createLeadSchema = z.object({
  name: z.string().min(2),
  email: z.string().email().optional().or(z.literal('')),
  phone: z.string().optional(),
  source: z.string().optional(),
  status: z.string().optional(),
  owner: z.string().optional(),
  notes: z.string().optional(),
  nextActionAt: z.string().optional().or(z.date()),
});

export const updateLeadSchema = createLeadSchema.partial();
