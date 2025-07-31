"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.optionalAuthMiddleware = optionalAuthMiddleware;
const jwt_1 = require("./jwt");
/**
 * Express middleware to optionally decode a JWT and attach the user to req.user.
 * Doesn't block if token is missing or invalid.
 */
function optionalAuthMiddleware(secret = process.env.JWT_SECRET) {
    return (req, _res, next) => {
        const authHeader = req.headers.authorization;
        if (authHeader?.startsWith('Bearer ')) {
            const token = authHeader.split(' ')[1];
            try {
                const decoded = (0, jwt_1.verifyToken)(token, secret);
                req.user = decoded;
            }
            catch (err) {
                console.warn('⚠️ [optionalAuthMiddleware] Invalid or expired token.');
                req.user = undefined;
            }
        }
        next();
    };
}
//# sourceMappingURL=optionalAuthMiddleware.js.map