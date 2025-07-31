"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.hashString = void 0;
const crypto_1 = require("crypto");
const hashString = (str) => (0, crypto_1.createHash)('sha256').update(str).digest('hex');
exports.hashString = hashString;
// ✅ Benefits: Secure token hashing (e.g., for user session keys, idempotency tokens).
//# sourceMappingURL=hash.js.map