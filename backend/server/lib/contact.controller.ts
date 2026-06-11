import { Request, Response } from 'express';
import { prisma } from '../lib/prisma.js';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export const createLead = async (req: Request, res: Response) => {
  try {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ success: false, error: "Campos obrigatórios ausentes." });
    }

    // 1. Salva no Banco de Dados
    // Assumindo que o modelo no schema.prisma se chama 'Lead'
    const lead = await prisma.lead.create({
      data: { name, email, message }
    });

    // 2. Dispara Notificação por E-mail
    if (process.env.RESEND_API_KEY) {
      await resend.emails.send({
        from: 'Sistema <onboarding@resend.dev>',
        to: 'devthomasnascimento@gmail.com', // Seu e-mail de admin
        subject: `Novo Lead: ${name}`,
        html: `<p><strong>Nome:</strong> ${name}</p>
               <p><strong>E-mail:</strong> ${email}</p>
               <p><strong>Mensagem:</strong> ${message}</p>`,
      });
    }

    return res.status(201).json({
      success: true,
      message: "Contato enviado com sucesso.",
      data: lead
    });
  } catch (error) {
    console.error("Erro no ContactController:", error);
    return res.status(500).json({ success: false, error: "Erro interno ao processar contato." });
  }
};