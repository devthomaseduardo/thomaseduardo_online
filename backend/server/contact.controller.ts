import { Request, Response } from 'express';
import { prisma } from '../lib/prisma.js';
import { Resend } from 'resend';
import { env } from '../lib/env.js';

const resend = new Resend(env.RESEND_API_KEY);

export const createLead = async (req: Request, res: Response) => {
  try {
    const { name, email, message } = req.body;

    if (!name?.trim() || !email?.trim() || !message?.trim()) {
      return res.status(400).json({ 
        success: false, 
        error: "Por favor, preencha todos os campos obrigatórios." 
      });
    }

    if (!email.includes('@')) {
      return res.status(400).json({ 
        success: false, 
        error: "Formato de e-mail inválido." 
      });
    }

    // 1. Salva no Banco de Dados
    // Assumindo que o modelo no schema.prisma se chama 'Lead'
    const lead = await prisma.lead.create({
      data: { name, email, message }
    });

    // 2. Dispara Notificação por E-mail
    if (env.RESEND_API_KEY && !env.RESEND_API_KEY.includes('re_missing_key')) {
      await resend.emails.send({
        from: 'Thomas Portfolio <onboarding@resend.dev>',
        to: 'devthomasnascimento@gmail.com',
        subject: `Novo Lead: ${name}`,
        html: `<p><strong>Nome:</strong> ${name}</p>
               <p><strong>E-mail:</strong> ${email}</p>
               <p><strong>Mensagem:</strong> ${message}</p>`,
      });
    }

    return res.status(201).json({
      success: true,
      message: "Mensagem recebida! Entrarei em contato em breve.",
      data: lead
    });
  } catch (error) {
    console.error("Erro no ContactController:", error);
    return res.status(500).json({ success: false, error: "Erro interno ao processar contato." });
  }
};