import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method Not Allowed' });

  try {
    const { invoiceId, amount, method, note } = req.body;
    if (!invoiceId) return res.status(400).json({ error: 'invoiceId required' });

    const invoice = await prisma.invoice.findUnique({ where: { id: invoiceId } });
    if (!invoice) return res.status(404).json({ error: 'Invoice not found' });

    // Create payment record
    const payment = await prisma.payment.create({
      data: {
        invoiceId,
        valor: amount ?? invoice.amount,
        metodo: method ?? invoice.metodoPagamento ?? 'manual',
        status: 'pago'
      }
    });

    // Update invoice status
    const updated = await prisma.invoice.update({
      where: { id: invoiceId },
      data: { status: 'paid', paidAt: new Date(), valorPago: { increment: payment.valor } as any }
    });

    res.json({ success: true, payment, invoice: updated });
  } catch (error) {
    console.error('[payments/confirm]', error);
    res.status(500).json({ error: 'Failed to confirm payment' });
  }
}
