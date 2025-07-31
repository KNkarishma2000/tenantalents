export interface InvoiceGenerateEvent {
  orderId: string;
  userId: string;
  trigger: 'payment_success' | 'admin';
}
