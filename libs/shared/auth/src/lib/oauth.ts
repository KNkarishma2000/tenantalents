// libs/shared/auth/src/oauth.ts
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { AuthPayload } from './types';

export function oauthMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'Missing OAuth token' });

  try {
    const decoded = jwt.decode(token) as AuthPayload; // Customize mapping if needed
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Invalid OAuth token' });
  }
}
