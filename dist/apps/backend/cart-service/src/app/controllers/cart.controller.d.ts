import { Request, Response, NextFunction } from 'express';
import type { AuthPayload } from '@shared/auth/lib/types';
interface AuthedRequest extends Request {
    user?: AuthPayload;
}
/**
 * GET /api/cart
 * Fetch the current cart for an authenticated user or guest
 */
export declare const getCart: (req: AuthedRequest, res: Response, next: NextFunction) => Promise<any>;
/**
 * POST /api/cart
 * Add an item to the user's or guest's cart
 */
export declare const addToCart: (req: AuthedRequest, res: Response, next: NextFunction) => Promise<any>;
/**
 * POST /api/cart/checkout
 * Checkout the user's or guest's cart
 */
export declare const checkoutCart: (req: AuthedRequest, res: Response, next: NextFunction) => Promise<any>;
export {};
