// apps/order-service/src/routes/order.routes.ts

import { Router } from 'express';
import {
  placeOrder,
  getUserOrders,
  getOrderById,
  updateOrderStatus,
} from '../controllers/order.controller';
import { authenticateJWT, requireRole } from '@shared/auth';

const router = Router();

/**
 * @route POST /api/orders
 * @desc Place a new order
 * @access buyer, buyer_seller
 */
router.post(
  '/',
  authenticateJWT,
  requireRole(['buyer', 'buyer_seller']),
  placeOrder
);

/**
 * @route GET /api/orders
 * @desc Get all orders of authenticated user
 * @access buyer, buyer_seller
 */
router.get(
  '/',
  authenticateJWT,
  requireRole(['buyer', 'buyer_seller']),
  getUserOrders
);

/**
 * @route GET /api/orders/:id
 * @desc Get order details by ID
 * @access all authenticated users
 */
router.get('/:id', authenticateJWT, getOrderById);

/**
 * @route PATCH /api/orders/:id
 * @desc Update order status (admin only)
 * @access admin, super_admin
 */
router.patch(
  '/:id',
  authenticateJWT,
  requireRole(['admin', 'super_admin']),
  updateOrderStatus
);

export default router;
