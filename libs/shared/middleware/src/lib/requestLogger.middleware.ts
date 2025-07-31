// libs/shared/middlewares/src/lib/requestLogger.middleware.ts
import { Request, Response, NextFunction } from 'express';

export const requestLoggerMiddleware = (
  req: Request,
  _res: Response,
  next: NextFunction
) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.originalUrl}`);
  next();
};
