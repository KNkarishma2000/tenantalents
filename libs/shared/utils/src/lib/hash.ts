import { createHash } from 'crypto';

export const hashString = (str: string): string =>
  createHash('sha256').update(str).digest('hex');

// ✅ Benefits: Secure token hashing (e.g., for user session keys, idempotency tokens).
