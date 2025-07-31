export interface PaymentFailedEvent {
    paymentId: string;
    orderId: string;
    userId: string;
    amount: number;
    failedAt: string;
    reason: string;
}
