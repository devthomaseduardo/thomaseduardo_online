import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const createLead = async (req: Request, res: Response) => {
  try {
    const { name, email, message, phone, source } = req.body;

    if (!name || !email) {
      return res.status(400).json({ error: 'Nome e e-mail são obrigatórios.' });
    }

    const lead = await prisma.lead.create({
      data: {
        name,
        email,
        phone,
        notes: message,
        source: source || 'site_contact_form',
        status: 'new'
      }
    });

    res.status(201).json({ success: true, leadId: lead.id });
  } catch (error: any) {
    console.error('[ContactController] Error:', error);
    res.status(500).json({ error: 'Erro ao processar contato.' });
  }
};
