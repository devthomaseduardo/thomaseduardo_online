import express from 'express';
import processPaymentHandler from '../../api/process_payment.ts';
import paymentsConfirmHandler from '../../api/payments_confirm.ts';

const router = express.Router();

// POST /api/payments/process  (MercadoPago Brick → server)
router.post('/process', processPaymentHandler);

// POST /api/payments/confirm  (admin confirms a payment)
router.post('/confirm', paymentsConfirmHandler);

export default router;
