import { Router } from 'express';
import { initiatePayment, verifyPayment } from './payment.controller';
import { authenticateJWT, requireRole } from '@shared/auth';

const router = Router();

// 🧾 Initiate a payment
router.post(
  '/',
  authenticateJWT,
  requireRole(['buyer', 'buyer_seller']),
  initiatePayment
);

// ✅ Verify payment status
router.patch(
  '/:id/verify',
  authenticateJWT,
  requireRole(['buyer', 'buyer_seller']),
  verifyPayment
);

export default router;
