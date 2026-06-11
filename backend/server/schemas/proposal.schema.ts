import { z } from 'zod';

export const createProposalSchema = z.object({
  title: z.string().min(2),
  description: z.string().optional(),
  status: z.enum(['draft', 'sent', 'approved', 'rejected']).optional(),
  stage: z.string().optional(),
  amount: z.number().nonnegative().optional(),
  clientId: z.string().uuid().optional(),
  projectId: z.string().uuid().optional(),
});

export const updateProposalSchema = createProposalSchema.partial();
