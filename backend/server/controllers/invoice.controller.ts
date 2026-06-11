import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { MercadoPagoConfig, Preference } from 'mercadopago';
import { env } from '../lib/env.js';
import { audit, getClientIp } from '../lib/audit.js';

const prisma = new PrismaClient();

export const getAllInvoices = async (req: Request, res: Response) => {
  try {
    const invoices = await prisma.invoice.findMany({
      include: { project: { include: { client: true } } },
      orderBy: { createdAt: 'desc' }
    });
    res.json(invoices);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao buscar invoices.' });
  }
};

export const getProjectInvoices = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    if ((req as any).user?.role !== 'admin') {
      const project = await prisma.project.findFirst({ where: { id, clientId: (req as any).user.id } });
      if (!project) return res.status(403).json({ error: 'Sem permissão para este projeto.' });
    }

    const invoices = await prisma.invoice.findMany({
      where: { projectId: id },
      include: { payments: true },
      orderBy: { createdAt: 'desc' }
    });
    res.json(invoices);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao buscar invoices.' });
  }
};

export const getInvoiceById = async (req: Request, res: Response) => {
  try {
    const invoice = await prisma.invoice.findUnique({
      where: { id: req.params.id },
      include: { project: { include: { client: true } } }
    });
    
    if (!invoice) return res.status(404).json({ error: 'Fatura não encontrada.' });
    
    // Check if it belongs to the authenticated client if not admin
    // This needs the authenticateToken middleware to have run
    if ((req as any).user.role !== 'admin' && invoice.project.client.id !== (req as any).user.id) {
      return res.status(403).json({ error: 'Acesso negado a esta fatura.' });
    }
    
    res.json(invoice);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao buscar fatura.' });
  }
};

export const createInvoice = async (req: Request, res: Response) => {
  try {
    const { description, amount, vencimento, metodoPagamento, pixCopiaCola, mercadoPagoUrl } = req.body;
    const { projectId } = req.params;
    if (!description || !amount) return res.status(400).json({ error: 'description e amount são obrigatórios.' });

    const invoice = await prisma.invoice.create({
      data: {
        description,
        amount: Number(amount),
        vencimento: vencimento ? new Date(vencimento) : null,
        metodoPagamento,
        pixCopiaCola,
        mercadoPagoUrl,
        projectId,
        status: 'pending',
        saldo: Number(amount)
      }
    });

    await audit({
      action: 'invoice.created',
      actorType: 'admin',
      actorId: (req as any).user?.id,
      ip: getClientIp(req),
      userAgent: req.headers['user-agent'],
      metadata: { invoiceId: invoice.id, projectId, amount }
    });

    res.status(201).json(invoice);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};

export const updateInvoice = async (req: Request, res: Response) => {
  try {
    const { description, amount, status, vencimento, valorPago, saldo } = req.body;
    const { id } = req.params;
    const result = await prisma.invoice.update({
      where: { id },
      data: {
        ...(description !== undefined && { description }),
        ...(amount !== undefined && { amount: Number(amount) }),
        ...(status !== undefined && { status }),
        ...(vencimento !== undefined && { vencimento: vencimento ? new Date(vencimento) : null }),
        ...(valorPago !== undefined && { valorPago: Number(valorPago) }),
        ...(saldo !== undefined && { saldo: Number(saldo) }),
      }
    });

    await audit({
      action: 'invoice.updated',
      actorType: 'admin',
      actorId: (req as any).user?.id,
      ip: getClientIp(req),
      userAgent: req.headers['user-agent'],
      metadata: { invoiceId: id, updates: req.body }
    });

    res.json(result);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};

export const deleteInvoice = async (req: Request, res: Response) => {
  const invoiceId = req.params.id;
  try {
    await prisma.$transaction([
      (prisma as any).payment.deleteMany({ where: { invoiceId } }),
      prisma.invoice.delete({ where: { id: invoiceId } })
    ]);

    await audit({
      action: 'invoice.deleted',
      actorType: 'admin',
      actorId: (req as any).user?.id,
      ip: getClientIp(req),
      userAgent: req.headers['user-agent'],
      metadata: { invoiceId }
    });

    res.json({ success: true, message: 'Fatura e pagamentos vinculados foram removidos.' });
  } catch (err: any) {
    console.error('[ForceDeleteInvoice] Error:', err);
    if (err.code === 'P2025') return res.status(404).json({ error: 'Fatura não encontrada.' });
    res.status(500).json({ error: 'Erro ao excluir fatura.' });
  }
};

export const createPaymentIntent = async (req: Request, res: Response) => {
  try {
    const { invoiceId } = req.body;
    if (!invoiceId) return res.status(400).json({ error: 'invoiceId é obrigatório.' });

    const invoice = await prisma.invoice.findUnique({
      where: { id: invoiceId },
      include: { project: { include: { client: true } } }
    });

    if (!invoice) return res.status(404).json({ error: 'Fatura não encontrada.' });
    if ((req as any).user.id !== invoice.project.client.id) return res.status(403).json({ error: 'Não autorizado.' });

    if (invoice.status === 'paid') return res.status(400).json({ error: 'Esta fatura já está paga.' });

    const clientMP = new MercadoPagoConfig({ accessToken: process.env.MP_ACCESS_TOKEN || '' });
    const preference = new Preference(clientMP);

    const result = await preference.create({
      body: {
        items: [
          {
            id: invoice.id,
            title: invoice.description,
            quantity: 1,
            unit_price: invoice.saldo || invoice.amount,
            currency_id: 'BRL',
          }
        ],
        payer: {
          email: invoice.project.client.email,
        },
        back_urls: {
          success: `${env.FRONTEND_URL}/portal/dashboard`,
          failure: `${env.FRONTEND_URL}/payment?invoiceId=${invoice.id}`,
          pending: `${env.FRONTEND_URL}/portal/dashboard`,
        },
        auto_return: 'approved',
        external_reference: invoice.id,
        notification_url: `${env.BACKEND_URL}/api/webhooks/mercadopago`,
      }
    });

    res.json({ 
      id: result.id, 
      init_point: result.init_point,
      sandbox_init_point: result.sandbox_init_point
    });
  } catch (error: any) {
    console.error('[PaymentIntent]', error);
    res.status(500).json({ error: error.message || 'Erro ao gerar intenção de pagamento' });
  }
};
