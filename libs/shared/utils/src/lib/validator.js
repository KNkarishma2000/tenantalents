"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isUUID = exports.isEmail = void 0;
/**
 * Checks if a string is a valid email format.
 * @param email - The string to validate.
 * @returns True if valid email, false otherwise.
 */
const isEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
exports.isEmail = isEmail;
/**
 * Validates whether a string is a valid UUID (v4 format).
 * @param uuid - The string to validate.
 * @returns True if valid UUID, false otherwise.
 */
const isUUID = (uuid) => /^[0-9a-f]{8}-[0-9a-f]{4}-[4][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(uuid);
exports.isUUID = isUUID;
// ✅ Benefits: Reuse validated patterns across services → fewer bugs, consistent validation logic.
//# sourceMappingURL=validator.js.map