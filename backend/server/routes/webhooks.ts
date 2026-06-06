import { Router } from 'express';
import { PrismaClient } from '@prisma/client';
import { emailService } from '../services/email.js';
import { MercadoPagoConfig, Payment } from 'mercadopago';

const router = Router();
const prisma = new PrismaClient();

/**
 * Resend Webhook Handler
 */
router.post('/resend', async (req, res) => {
  const { type, data } = req.body;
  console.log(`[Resend Webhook] Event: ${type}`, data);

  try {
    switch (type) {
      case 'email.received':
        const fullEmail = await emailService.getReceivedEmail(data.email_id);
        if (fullEmail?.data) {
          const fromEmail = fullEmail.data.from;
          const subject = fullEmail.data.subject;
          const textContent = fullEmail.data.text || fullEmail.data.html || '(Sem conteúdo)';
          const client = await prisma.client.findUnique({ where: { email: fromEmail } });
          await prisma.message.create({
            data: {
              clientId: client?.id,
              senderType: client ? 'client' : 'external',
              senderName: fromEmail,
              content: `[E-MAIL RECEBIDO]\nAssunto: ${subject}\n\n${textContent}`,
              read: false
            }
          });
        }
        break;
      case 'contact.created':
        await (prisma as any).securityLog.create({ data: { action: 'email.contact.created', metadata: JSON.stringify(data) } });
        break;
      default:
        console.warn(`Unhandled Resend event type: ${type}`);
    }
    res.json({ received: true });
  } catch (error) {
    console.error('Resend webhook error:', error);
    res.status(500).json({ error: 'Webhook processing failed' });
  }
});

/**
 * Mercado Pago Webhook Handler
 */
router.post('/mercadopago', async (req, res) => {
  try {
    const { type, data } = req.body;
    console.log('[MercadoPago Webhook]', type, data);

    if (type === 'payment' || req.query.topic === 'payment') {
      const paymentId = data?.id || req.query.id;
      if (!paymentId) return res.status(400).json({ error: 'paymentId missing' });

      const mpClient = new MercadoPagoConfig({ accessToken: process.env.MP_ACCESS_TOKEN || '' });
      const mpPayment = new Payment(mpClient);
      const paymentData = await mpPayment.get({ id: paymentId });

      if (paymentData.status === 'approved') {
        const invoiceId = paymentData.external_reference;
        const amount = paymentData.transaction_amount;

        if (invoiceId) {
          const invoice = await prisma.invoice.findUnique({
            where: { id: invoiceId },
            include: { project: { include: { client: true } } }
          });

          if (invoice && invoice.status !== 'paid') {
            await prisma.payment.create({
              data: {
                invoiceId: invoice.id,
                valor: amount || invoice.amount,
                metodo: 'MercadoPago',
                status: 'pago',
                pagoEm: new Date()
              }
            });
            await prisma.invoice.update({
              where: { id: invoice.id },
              data: { status: 'paid', paidAt: new Date(), valorPago: { increment: amount || invoice.amount } as any, saldo: 0 }
            });
            const paymentHtml = emailService.generatePaymentReceivedEmail(invoice.project.client.name, invoice.description, amount || invoice.amount);
            emailService.sendEmail(invoice.project.client.email, `Pagamento Confirmado: ${invoice.description}`, paymentHtml).catch(() => {});
          }
        }
      }
    }
    res.json({ received: true });
  } catch (error) {
    console.error('MercadoPago webhook error:', error);
    res.status(500).json({ error: 'Webhook processing failed' });
  }
});

export default router;
