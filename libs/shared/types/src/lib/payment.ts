export type PaymentStatus = 'initiated' | 'successful' | 'failed' | 'refunded';

export interface Payment {
  id: string;
  orderId: string;
  userId: string;
  amount: number;
  method: 'card' | 'upi' | 'netbanking' | 'cod';
  status: PaymentStatus;
  transactionId?: string;
  createdAt: Date;
  updatedAt: Date;
}
