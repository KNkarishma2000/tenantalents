export interface PaymentSuccessEvent {
    paymentId: string;
    orderId: string;
    userId: string;
    amount: number;
    paidAt: string;
}
