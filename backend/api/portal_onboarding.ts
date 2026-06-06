import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import { emailService } from '../server/services/email.ts';

const prisma = new PrismaClient();

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method Not Allowed' });

  try {
    const {
      clientName,
      clientEmail,
      clientCnpj,
      clientType,
      password,
      projectName,
      projectValue,
      initialInvoiceAmount
    } = req.body;

    if (!clientEmail || !clientName || !projectName) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    let client = await prisma.client.findUnique({ where: { email: clientEmail } });
    if (!client) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password || Math.random().toString(36).slice(2, 10), salt);
      client = await prisma.client.create({
        data: {
          name: clientName,
          email: clientEmail,
          cnpj: clientCnpj || undefined,
          clientType: clientType || 'new',
          password: hashedPassword
        }
      });
    }

    const project = await prisma.project.create({
      data: {
        id: `PROJ-${Math.random().toString(36).substr(2, 6).toUpperCase()}`,
        name: projectName,
        value: projectValue ? parseFloat(projectValue) : 0,
        phase: 'Onboarding',
        financial: 'Pendente',
        clientId: client.id
      }
    });

    // Optionally create an initial invoice (sinal)
    let invoice = null;
    if (initialInvoiceAmount) {
      invoice = await prisma.invoice.create({
        data: {
          description: 'Sinal - Onboarding',
          amount: parseFloat(initialInvoiceAmount as any),
          status: 'pending',
          type: 'service',
          projectId: project.id
        }
      });
    }

    res.json({ success: true, client: { id: client.id, email: client.email }, project, invoice });

    // Notificação Assíncrona
    emailService.sendEmail(
      'devthomaseduardo@gmail.com',
      `Novo Onboarding: ${clientName}`,
      `<h1>Novo Onboarding Realizado</h1>
       <p><strong>Cliente:</strong> ${clientName} (${clientEmail})</p>
       <p><strong>Projeto:</strong> ${projectName}</p>
       <p><strong>Valor:</strong> R$ ${projectValue}</p>`
    ).catch(err => console.error('Failed to send onboarding notification', err));

  } catch (error) {
    console.error('[portal/onboarding]', error);
    res.status(500).json({ error: 'Failed to process onboarding' });
  }
}
