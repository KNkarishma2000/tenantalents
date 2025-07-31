export interface EmailPaymentSuccessEvent {
    to: string;
    subject: string;
    template: 'payment-success';
    context: {
        paymentId: string;
        amount: number;
    };
}
