import { Router } from 'express';
import { PrismaClient } from '@prisma/client';

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
