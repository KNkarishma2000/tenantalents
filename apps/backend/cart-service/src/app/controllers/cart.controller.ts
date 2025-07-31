import { Request, Response, NextFunction } from 'express';
import { cartService } from '../services/cart.service';
import { sendSuccess } from '@shared/utils/lib/response';
import type { AuthPayload } from '@shared/auth/lib/types';

interface AuthedRequest extends Request {
  user?: AuthPayload;
}

const extractUserId = (req: AuthedRequest): string | null => {
  return (
    req.user?.userId ||
    req.query.sessionId?.toString() ||
    req.body.sessionId ||
    null
  );
};

/**
 * GET /api/cart
 * Fetch the current cart for an authenticated user or guest
 */
export const getCart = async (
  req: AuthedRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = extractUserId(req);
    if (!userId) {
      return res
        .status(400)
        .json({ message: '❌ Missing userId or sessionId' });
    }

    const cart = await cartService.getCart(userId);
    return sendSuccess(res, '🛒 Cart fetched successfully', cart);
  } catch (err) {
    next(err);
  }
};

/**
 * POST /api/cart
 * Add an item to the user's or guest's cart
 */
export const addToCart = async (
  req: AuthedRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = extractUserId(req);
    if (!userId) {
      return res
        .status(400)
        .json({ message: '❌ Missing userId or sessionId' });
    }

    const cart = await cartService.addToCart(userId, req.body);
    return sendSuccess(res, '✅ Item added to cart', cart);
  } catch (err) {
    next(err);
  }
};

/**
 * POST /api/cart/checkout
 * Checkout the user's or guest's cart
 */
export const checkoutCart = async (
  req: AuthedRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = extractUserId(req);
    if (!userId) {
      return res
        .status(400)
        .json({ message: '❌ Missing userId or sessionId' });
    }

    const result = await cartService.checkout(userId);
    return sendSuccess(res, '✅ Cart checked out successfully', result);
  } catch (err) {
    next(err);
  }
};
