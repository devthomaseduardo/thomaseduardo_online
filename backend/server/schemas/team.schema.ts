import { z } from 'zod';

export const teamMemberSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  role: z.string().optional(),
  permissions: z.any().optional(),
  active: z.boolean().optional(),
});
