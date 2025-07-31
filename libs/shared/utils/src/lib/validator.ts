/**
 * Checks if a string is a valid email format.
 * @param email - The string to validate.
 * @returns True if valid email, false otherwise.
 */
export const isEmail = (email: string): boolean =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

/**
 * Validates whether a string is a valid UUID (v4 format).
 * @param uuid - The string to validate.
 * @returns True if valid UUID, false otherwise.
 */
export const isUUID = (uuid: string): boolean =>
  /^[0-9a-f]{8}-[0-9a-f]{4}-[4][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(
    uuid
  );

// ✅ Benefits: Reuse validated patterns across services → fewer bugs, consistent validation logic.
