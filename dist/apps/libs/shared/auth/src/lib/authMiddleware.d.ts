import { Request, Response, NextFunction } from 'express';
import { AuthPayload, UserRole } from './types';
declare module 'express' {
    interface Request {
        user?: AuthPayload;
    }
}
export declare function authMiddleware(allowedRoles?: UserRole | UserRole[], secret?: string): (req: Request, res: Response, next: NextFunction) => void;
export declare const requireAuth: typeof authMiddleware;
