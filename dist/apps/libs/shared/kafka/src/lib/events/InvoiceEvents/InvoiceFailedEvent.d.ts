export interface InvoiceFailedEvent {
    orderId: string;
    userId: string;
    error: string;
    failedAt: string;
}
