import { Request, Response, NextFunction } from 'express';
/**
 * Express middleware to optionally decode a JWT and attach the user to req.user.
 * Doesn't block if token is missing or invalid.
 */
export declare function optionalAuthMiddleware(secret?: string): (req: Request, _res: Response, next: NextFunction) => void;
//# sourceMappingURL=optionalAuthMiddleware.d.ts.map