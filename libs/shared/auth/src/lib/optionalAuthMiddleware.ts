import { Request, Response, NextFunction } from 'express';
import { verifyToken } from './jwt';
import { AuthPayload } from './types';

/**
 * Express middleware to optionally decode a JWT and attach the user to req.user.
 * Doesn't block if token is missing or invalid.
 */
export function optionalAuthMiddleware(
  secret: string = process.env.JWT_SECRET!
) {
  return (req: Request, _res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;

    if (authHeader?.startsWith('Bearer ')) {
      const token = authHeader.split(' ')[1];

      try {
        const decoded = verifyToken(token, secret);
        req.user = decoded as AuthPayload;
      } catch (err) {
        console.warn('⚠️ [optionalAuthMiddleware] Invalid or expired token.');
        req.user = undefined;
      }
    }

    next();
  };
}
