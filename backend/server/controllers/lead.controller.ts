import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { getLeadAutoReplyTemplate } from '../services/emailTemplates.js';
import { emailService } from '../services/email.js';
import { audit, getClientIp } from '../lib/audit.js';

const prisma = new PrismaClient();

export const getAllLeads = async (req: Request, res: Response) => {
  try {
    const leads = await prisma.lead.findMany({ orderBy: { updatedAt: 'desc' } });
    res.json(leads);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

export const createPublicContact = async (req: Request, res: Response) => {
  try {
    const { name, email, phone, message, source } = req.body;

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

    await audit({
      action: 'lead.created',
      actorType: 'anonymous',
      ip: getClientIp(req),
      userAgent: req.headers['user-agent'],
      metadata: { leadId: lead.id, source: lead.source }
    });

    const replyHtml = getLeadAutoReplyTemplate(name);
    emailService.sendEmail(
      email,
      `Recebi sua mensagem, ${name.split(' ')[0]}`,
      replyHtml
    ).catch(err => console.error('[PublicContact] Failed to send auto-reply:', err));

    emailService.sendEmail(
      'devthomaseduardo@gmail.com',
      `Novo Lead: ${name}`,
      `<h1>Novo contato pelo site</h1>
       <p><strong>Nome:</strong> ${name}</p>
       <p><strong>E-mail:</strong> ${email}</p>
       <p><strong>WhatsApp:</strong> ${phone || 'Não informado'}</p>
       <p><strong>Mensagem:</strong> ${message || '(Sem mensagem)'}</p>`
    ).catch(err => console.error('[PublicContact] Failed to notify admin:', err));

    res.status(201).json({ success: true, leadId: lead.id });
  } catch (error: any) {
    console.error('[PublicContact] Error:', error);
    res.status(500).json({ error: 'Erro ao processar contato.' });
  }
};

export const createLead = async (req: Request, res: Response) => {
  try {
    const { name, email, phone, source, status, owner, notes, nextActionAt } = req.body;
    if (!name) return res.status(400).json({ error: 'name é obrigatório.' });

    const lead = await prisma.lead.create({
      data: {
        name,
        email,
        phone,
        source: source ?? 'site',
        status: status ?? 'new',
        owner,
        notes,
        nextActionAt: nextActionAt ? new Date(nextActionAt) : undefined
      }
    });
    res.status(201).json(lead);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};

export const updateLead = async (req: Request, res: Response) => {
  try {
    const lead = await prisma.lead.update({
      where: { id: req.params.id },
      data: req.body
    });
    res.json(lead);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};

export const deleteLead = async (req: Request, res: Response) => {
  try {
    await prisma.lead.delete({ where: { id: req.params.id } });
    res.json({ success: true });
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};

export const convertLeadToClient = async (req: Request, res: Response) => {
  try {
    const lead = await prisma.lead.findUnique({ where: { id: req.params.id } });
    if (!lead) return res.status(404).json({ error: 'Lead não encontrado.' });

    const clientEmail = req.body.email || lead.email;
    if (!clientEmail) return res.status(400).json({ error: 'E-mail é necessário para conversão.' });

    const existingClient = await prisma.client.findUnique({ where: { email: clientEmail } });
    let client;

    if (existingClient) {
      client = existingClient;
    } else {
      const password = Math.random().toString(36).slice(-8);
      const hashedPassword = await (await import('bcrypt')).default.hash(password, 10);
      
      client = await prisma.client.create({
        data: {
          name: lead.name,
          email: clientEmail,
          password: hashedPassword,
          phone: lead.phone,
          obs: lead.notes,
          clientType: 'converted'
        }
      });

      const welcomeHtml = emailService.generateWelcomeEmail(client.name, client.email, password);
      emailService.sendEmail(client.email, 'Seu portal foi criado!', welcomeHtml).catch(() => {});
    }

    await prisma.lead.update({
      where: { id: lead.id },
      data: { converted: true, convertedAt: new Date(), convertedToId: client.id, status: 'won' }
    });

    res.json({ success: true, clientId: client.id });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};
