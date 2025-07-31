import { randomUUID } from 'crypto';

/**
 * Generates a standard RFC4122 UUID (v4).
 *
 * @returns A randomly generated UUID string.
 */
export const generateUUID = (): string => randomUUID();

// ✅ Benefits: Ensures consistent, standard-compliant UUIDs across all services.
// Used for correlation IDs, event IDs, resource IDs, etc.
