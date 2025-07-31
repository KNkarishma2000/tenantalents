// libs/shared/auth/src/jwt.ts

import jwt, { SignOptions, Secret } from 'jsonwebtoken';
import { AuthPayload } from './types';

/**
 * Sign a JWT token with AuthPayload
 */
export function signToken(
  payload: AuthPayload,
  secret: Secret,
  expiresIn: SignOptions['expiresIn'] = '1h'
): string {
  return jwt.sign(payload, secret, { expiresIn });
}

/**
 * Verify a JWT token and return decoded AuthPayload
 * Throws error if invalid or expired
 */
export function verifyToken(token: string, secret: Secret): AuthPayload {
  const decoded = jwt.verify(token, secret);

  // Optional: Add type guard if you expect certain fields
  if (typeof decoded === 'object' && 'id' in decoded && 'role' in decoded) {
    return decoded as AuthPayload;
  }

  throw new Error('Invalid token payload structure');
}
