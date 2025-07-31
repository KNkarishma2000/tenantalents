export type OrderStatus = 'pending' | 'paid' | 'shipped' | 'delivered' | 'cancelled';
export interface OrderItem {
    productId: string;
    quantity: number;
    price: number;
}
export interface Order {
    id: string;
    userId: string;
    items: OrderItem[];
    totalAmount: number;
    status: OrderStatus;
    paymentId?: string;
    createdAt: Date;
    updatedAt: Date;
}
