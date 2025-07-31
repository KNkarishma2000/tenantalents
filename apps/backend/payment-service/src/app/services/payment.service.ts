// apps/payment-service/src/services/payment.service.ts

import { prisma } from '@shared/prisma';
import { v4 as uuidv4 } from 'uuid';
import { logger } from '@shared/logger';

type PaymentMethod = 'UPI' | 'COD' | 'CARD' | 'NET_BANKING'; // Expand as needed
type PaymentStatus = 'PENDING' | 'SUCCESS' | 'FAILED';

interface InitiatePaymentDTO {
  amount: number;
  method: PaymentMethod;
  orderId: string;
}

export const paymentService = {
  /**
   * Initiate a payment for a given order and user.
   */
  initiatePayment: async (userId: string, data: InitiatePaymentDTO) => {
    const { amount, method, orderId } = data;

    const payment = await prisma.payment.create({
      data: {
        id: uuidv4(),
        userId,
        amount,
        method,
        status: 'PENDING',
        orderId,
      },
    });

    // Simulate UPI QR code (this can be extended per method)
    const qrCode =
      method === 'UPI'
        ? `upi://pay?pa=merchant@upi&pn=EcomStore&am=${amount}`
        : undefined;

    return {
      paymentId: payment.id,
      amount,
      method,
      status: payment.status,
      qrCode,
    };
  },

  /**
   * Update payment status (e.g., from gateway callback).
   */
  verifyPayment: async (paymentId: string, status: PaymentStatus) => {
    const validStatuses: PaymentStatus[] = ['PENDING', 'SUCCESS', 'FAILED'];
    if (!validStatuses.includes(status)) {
      throw new Error(`Invalid payment status: ${status}`);
    }

    const updated = await prisma.payment.update({
      where: { id: paymentId },
      data: { status },
    });

    logger.info(
      `[paymentService] 💸 Payment ${paymentId} updated to ${status}`
    );
    return updated;
  },
};
