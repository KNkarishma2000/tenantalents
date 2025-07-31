export interface OrderStatusUpdatedEvent {
    orderId: string;
    oldStatus: string;
    newStatus: string;
    updatedAt: string;
}
