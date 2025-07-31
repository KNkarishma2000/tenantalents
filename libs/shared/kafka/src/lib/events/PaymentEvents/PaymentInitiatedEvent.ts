export interface PaymentInitiatedEvent {
  paymentId: string;
  orderId: string;
  userId: string;
  amount: number;
  initiatedAt: string;
}
