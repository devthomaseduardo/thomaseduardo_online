import { Router } from 'express';
import { PrismaClient } from '@prisma/client';
import { emailService } from '../services/email.js';

const router = Router();
const prisma = new PrismaClient();

/**
 * Resend Webhook Handler
 * Listen for events like email sent, delivered, or contact management
 */
router.post('/resend', async (req, res) => {
  const { type, data } = req.body;

  console.log(`[Resend Webhook] Event: ${type}`, data);

  try {
    switch (type) {
      case 'email.received':
        // Process inbound email
        const fullEmail = await emailService.getReceivedEmail(data.email_id);
        
        if (fullEmail?.data) {
          const fromEmail = fullEmail.data.from;
          const subject = fullEmail.data.subject;
          const textContent = fullEmail.data.text || fullEmail.data.html || '(Sem conteúdo legível)';

          // Try to link to an existing client
          const client = await prisma.client.findUnique({
            where: { email: fromEmail }
          });

          // Create an intelligence signal (Message)
          await prisma.message.create({
            data: {
              clientId: client?.id,
              senderType: client ? 'client' : 'external',
              senderName: fromEmail,
              content: `[E-MAIL RECEBIDO]\nAssunto: ${subject}\n\n${textContent}`,
              read: false
            }
          });

          console.log(`[Resend] Inbound email from ${fromEmail} processed as intelligence signal.`);
        }
        break;

      case 'contact.created':
        // Handle new contact created in Resend
        await (prisma as any).securityLog.create({
          data: {
            action: 'email.contact.created',
            metadata: JSON.stringify(data)
          }
        });
        break;
      
      case 'contact.deleted':
        // Handle contact deleted
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

export default router;
