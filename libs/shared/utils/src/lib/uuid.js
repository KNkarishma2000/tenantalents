"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateUUID = void 0;
const crypto_1 = require("crypto");
/**
 * Generates a standard RFC4122 UUID (v4).
 *
 * @returns A randomly generated UUID string.
 */
const generateUUID = () => (0, crypto_1.randomUUID)();
exports.generateUUID = generateUUID;
// ✅ Benefits: Ensures consistent, standard-compliant UUIDs across all services.
// Used for correlation IDs, event IDs, resource IDs, etc.
//# sourceMappingURL=uuid.js.map