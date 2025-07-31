export interface EmailOrderCreatedEvent {
    to: string;
    subject: string;
    template: 'order-confirmation';
    context: {
        orderId: string;
        userId: string;
        total: number;
    };
}
