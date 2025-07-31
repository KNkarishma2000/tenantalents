import { Request, Response, NextFunction } from 'express';
import { orderService } from './order.service';
import { produceKafkaEvent } from '@shared/kafka';
import { sendSuccess } from '@shared/utils/lib/response';
import type { AuthPayload } from '@shared/auth/lib/types';

interface AuthedRequest extends Request {
  user?: AuthPayload;
}

export const placeOrder = async (
  req: AuthedRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.user?.userId;
    if (!userId) {
      return res
        .status(401)
        .json({ message: '❌ Unauthorized: missing user ID' });
    }

    const order = await orderService.placeOrder(userId, req.body);
    await produceKafkaEvent('order.created', order); // Changed to match earlier Kafka topic
    sendSuccess(res, '✅ Order placed successfully', order);
  } catch (err) {
    next(err);
  }
};

export const getUserOrders = async (
  req: AuthedRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.user?.userId;
    if (!userId) {
      return res
        .status(401)
        .json({ message: '❌ Unauthorized: missing user ID' });
    }

    const orders = await orderService.getOrdersByUser(userId);
    sendSuccess(res, '📦 Orders fetched', orders);
  } catch (err) {
    next(err);
  }
};

export const getOrderById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const orderId = req.params.id;
    if (!orderId) {
      return res.status(400).json({ message: '❌ Order ID is required' });
    }

    const order = await orderService.getOrderById(orderId);
    if (!order) {
      return res.status(404).json({ message: '❌ Order not found' });
    }

    sendSuccess(res, '📄 Order details fetched', order);
  } catch (err) {
    next(err);
  }
};

export const updateOrderStatus = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const orderId = req.params.id;
    const { status } = req.body;

    if (!status) {
      return res
        .status(400)
        .json({ message: '❌ Missing order status in request body' });
    }

    const updated = await orderService.updateOrderStatus(orderId, status);
    await produceKafkaEvent('order.updated', updated);
    sendSuccess(res, '✅ Order status updated', updated);
  } catch (err) {
    next(err);
  }
};
