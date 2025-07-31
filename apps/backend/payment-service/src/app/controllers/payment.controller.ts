// apps/payment-service/src/controllers/payment.controller.ts

import { Request, Response, NextFunction } from 'express';
import { paymentService } from '../services/payment.service';
import { produceKafkaEvent } from '@shared/kafka';
import { sendSuccess } from '@shared/utils/lib/response';
import { logger } from '@shared/logger';

export const initiatePayment = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.user?.userId;
    if (!userId) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    const payment = await paymentService.initiatePayment(userId, req.body);
    logger.info(
      `[paymentController] 💳 Initiated payment: ${payment.paymentId}`
    );

    sendSuccess(res, '✅ Payment initiated', payment);
  } catch (err) {
    next(err);
  }
};

export const verifyPayment = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const paymentId = req.params.id;
    const status = req.body.status;

    if (!['PENDING', 'SUCCESS', 'FAILED'].includes(status)) {
      return res.status(400).json({ message: '❌ Invalid payment status' });
    }

    const updated = await paymentService.verifyPayment(paymentId, status);

    const topic = status === 'SUCCESS' ? 'payment.success' : 'payment.failed';
    await produceKafkaEvent(topic, updated);

    logger.info(
      `[paymentController] 🔁 Payment ${paymentId} verified as ${status}`
    );

    sendSuccess(res, `✅ Payment ${status.toLowerCase()}`, updated);
  } catch (err) {
    next(err);
  }
};
