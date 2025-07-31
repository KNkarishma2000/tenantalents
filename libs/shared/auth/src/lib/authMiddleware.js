"use strict";
// import { Request, Response, NextFunction } from 'express';
// import { verifyToken } from './jwt';
// import { AuthPayload, UserRole } from './types'; // ✅ No @shared/types import
Object.defineProperty(exports, "__esModule", { value: true });
exports.requireAuth = void 0;
exports.authMiddleware = authMiddleware;
const jwt_1 = require("./jwt");
function authMiddleware(allowedRoles, secret = process.env['JWT_SECRET']) {
    return (req, res, next) => {
        const authHeader = req.headers.authorization;
        if (!authHeader?.startsWith('Bearer ')) {
            res
                .status(401)
                .json({ message: 'Missing or malformed Authorization header' });
            return;
        }
        const token = authHeader.split(' ')[1];
        if (!token) {
            // ✅ CORRECTED
            res.status(401).json({ message: 'Token not provided' });
            return;
        }
        try {
            const decoded = (0, jwt_1.verifyToken)(token, secret);
            req.user = decoded;
            if (allowedRoles) {
                const allowed = Array.isArray(allowedRoles)
                    ? allowedRoles
                    : [allowedRoles];
                if (!allowed.includes(req.user.role)) {
                    res
                        .status(403)
                        .json({
                        message: `Forbidden: Role "${req.user.role}" not authorized`,
                    });
                    return;
                }
            }
            next();
        }
        catch (err) {
            console.error('❌ [authMiddleware] Token verification failed:', err);
            // ✅ CORRECTED
            res.status(403).json({ message: 'Invalid or expired token' });
            return;
        }
    };
}
exports.requireAuth = authMiddleware;
//# sourceMappingURL=authMiddleware.js.map