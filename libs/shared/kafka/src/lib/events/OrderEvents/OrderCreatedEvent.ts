export interface OrderCreatedEvent {
  orderId: string;
  userId: string;
  items: {
    productId: string;
    quantity: number;
    price: number;
  }[];
  totalAmount: number;
  createdAt: string;
}
