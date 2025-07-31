import { prisma } from '@shared/prisma';
import type { OrderStatus } from '@prisma/client';

interface OrderItemInput {
  productId: string;
  sellerId: string;
  quantity: number;
  price: number;
}

interface PlaceOrderInput {
  items: OrderItemInput[];
  totalAmount: number;
  shippingAddress: string;
}

const VALID_STATUSES: OrderStatus[] = [
  'PLACED',
  'PROCESSING',
  'SHIPPED',
  'DELIVERED',
  'CANCELLED',
];

export const orderService = {
  placeOrder: async (userId: string, data: PlaceOrderInput) => {
    const { items, totalAmount, shippingAddress } = data;

    if (!items || !Array.isArray(items) || items.length === 0) {
      throw new Error('Order must contain at least one item.');
    }

    const order = await prisma.order.create({
      data: {
        userId,
        totalAmount,
        shippingAddress,
        status: 'PLACED',
        items: {
          create: items.map((item) => ({
            productId: item.productId,
            sellerId: item.sellerId,
            quantity: item.quantity,
            price: item.price,
          })),
        },
      },
      include: { items: true },
    });

    return order;
  },

  getOrdersByUser: async (userId: string) => {
    return prisma.order.findMany({
      where: { userId },
      include: { items: true },
    });
  },

  getOrderById: async (id: string) => {
    return prisma.order.findUnique({
      where: { id },
      include: { items: true },
    });
  },

  updateOrderStatus: async (orderId: string, status: OrderStatus) => {
    if (!VALID_STATUSES.includes(status)) {
      throw new Error(`Invalid order status: ${status}`);
    }

    return prisma.order.update({
      where: { id: orderId },
      data: { status },
    });
  },
};
