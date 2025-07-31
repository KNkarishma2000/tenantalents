import { Request, Response, NextFunction } from 'express';
import { UserRole, AuthPayload } from './types'; // ✅ Use shared types

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
export function requireRole(...allowedRoles: UserRole[]) {
  return (req: Request, res: Response, next: NextFunction) => {
    const user = req.user;

    if (!user?.role) {
      return res.status(403).json({
        message: 'Access denied',
        detail: 'No authenticated user or role found on request',
      });
    }

    if (!allowedRoles.includes(user.role)) {
      return res.status(403).json({
        message: 'Access denied',
        detail: `Required role(s): [${allowedRoles.join(', ')}], but found: '${
          user.role
        }'`,
      });
    }

    next();
  };
}
