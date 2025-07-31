export interface OrderCancelledEvent {
    orderId: string;
    userId: string;
    cancelledAt: string;
    reason?: string;
}
