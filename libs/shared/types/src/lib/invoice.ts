export interface Invoice {
  id: string;
  orderId: string;
  userId: string;
  pdfUrl: string;
  amount: number;
  issuedAt: Date;
}
