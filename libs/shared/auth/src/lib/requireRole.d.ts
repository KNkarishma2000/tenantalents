import { Request, Response, NextFunction } from 'express';
import { UserRole, AuthPayload } from './types';
declare global {
    namespace Express {
        interface Request {
            user?: AuthPayload;
        }
    }
}
/**
 * 🔐 Middleware to enforce role-based access control (RBAC).
 * Accepts one or more allowed roles.
 *
 * @param allowedRoles - List of roles permitted to access the route
 *
 * @example
 * app.get('/admin', requireRole(UserRole.ADMIN, UserRole.SUPER_ADMIN), handler);
 */
export declare function requireRole(...allowedRoles: UserRole[]): (req: Request, res: Response, next: NextFunction) => Response<any, Record<string, any>> | undefined;
//# sourceMappingURL=requireRole.d.ts.map