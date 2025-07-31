import { Request, Response, NextFunction } from 'express';
import { UserRole } from '../../../types/src';
import { ForbiddenError, UnauthorizedError } from '../../../error/src';

export const requireRole = (roles: UserRole[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const user = (req as any).user;

    if (!user) {
      return next(new UnauthorizedError('User not authenticated'));
    }

    if (!roles.includes(user.role)) {
      return next(new ForbiddenError('You do not have access to this resource'));
    }

    next();
  };
};
