import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import { env } from '../lib/env.js';

const prisma = new PrismaClient();

export const wipeDatabase = async (req: Request, res: Response) => {
  if (env.NODE_ENV === 'production') return res.status(404).end();
  try {
    await prisma.payment.deleteMany();
    await prisma.invoice.deleteMany();
    await prisma.projectFile.deleteMany();
    await prisma.deploy.deleteMany();
    await (prisma as any).contract?.deleteMany?.();
    await (prisma as any).timelineEvent?.deleteMany?.();
    await (prisma as any).integration?.deleteMany?.();
    await prisma.project.deleteMany();
    await prisma.client.deleteMany();
    res.json({ success: true, message: 'Banco de dados limpo com sucesso.' });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const seedDatabase = async (req: Request, res: Response) => {
  if (env.NODE_ENV === 'production') return res.status(404).end();
  try {
    const clients = [
      {
        clientName: "Sleep House",
        clientEmail: "contato@sleephouse.com.br",
        password: "password123",
        projectName: "Digital Showroom de Colchões Premium",
        phase: "Entregue",
        status: "completed",
        projectValue: 12500.0,
      },
      {
        clientName: "LP Yázigi",
        clientEmail: "contato@yazigi.com.br",
        password: "password123",
        projectName: "Página de Alta Conversão para Captação de Alunos",
        phase: "Em Produção",
        status: "development",
        projectValue: 5700.0,
      },
      {
        clientName: "Bras Service",
        clientEmail: "contato@brasservice.com",
        password: "password123",
        projectName: "Sistema Integrado de Ordem de Serviço",
        phase: "Entregue",
        status: "completed",
        projectValue: 28000.0,
      },
      {
        clientName: "Hazap Vendas",
        clientEmail: "contato@hazap.com.br",
        password: "password123",
        projectName: "Painel de Vendas e CRM Comercial",
        phase: "Em Produção",
        status: "development",
        projectValue: 18000.0,
      }
    ];

    for (const c of clients) {
      const hashedPassword = await bcrypt.hash(c.password, 10);
      const client = await prisma.client.upsert({
        where: { email: c.clientEmail },
        update: {},
        create: {
          name: c.clientName,
          email: c.clientEmail,
          password: hashedPassword,
          clientType: 'novo',
        }
      });

      const project = await prisma.project.create({
        data: {
          id: `PROJ-${Math.random().toString(36).substring(2, 8).toUpperCase()}`,
          name: c.projectName,
          value: c.projectValue,
          phase: c.phase,
          status: c.status,
          financial: 'Pendente (Sinal)',
          clientId: client.id
        }
      });

      await prisma.invoice.create({
        data: {
          description: "Sinal inicial de 50%",
          amount: c.projectValue / 2,
          status: "pending",
          type: "service",
          projectId: project.id
        }
      });
    }
    res.json({ success: true, message: 'Dados reais populados com sucesso.' });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
