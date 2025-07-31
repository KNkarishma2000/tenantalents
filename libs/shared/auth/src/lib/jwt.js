"use strict";
// libs/shared/auth/src/jwt.ts
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.signToken = signToken;
exports.verifyToken = verifyToken;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
/**
 * Sign a JWT token with AuthPayload
 */
function signToken(payload, secret, expiresIn = '1h') {
    return jsonwebtoken_1.default.sign(payload, secret, { expiresIn });
}
/**
 * Verify a JWT token and return decoded AuthPayload
 * Throws error if invalid or expired
 */
function verifyToken(token, secret) {
    const decoded = jsonwebtoken_1.default.verify(token, secret);
    // Optional: Add type guard if you expect certain fields
    if (typeof decoded === 'object' && 'id' in decoded && 'role' in decoded) {
        return decoded;
    }
    throw new Error('Invalid token payload structure');
}
//# sourceMappingURL=jwt.js.map