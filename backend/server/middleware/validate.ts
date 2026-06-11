import { Request, Response, NextFunction } from 'express';
import { z, ZodError } from 'zod';

export const validate = (schema: z.Schema) => async (req: Request, res: Response, next: NextFunction) => {
  try {
    await schema.parseAsync(req.body);
    return next();
  } catch (error) {
    if (error instanceof ZodError) {
      return res.status(400).json({
        error: 'Erro de validação',
        details: error.issues.map(e => ({ path: e.path, message: e.message }))
      });
    }
    return res.status(500).json({ error: 'Erro interno na validação' });
  }
};
