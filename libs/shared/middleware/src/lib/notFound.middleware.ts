// libs/shared/middlewares/src/notFound.middleware.ts
import { Request, Response, NextFunction } from 'express';

export const notFoundHandler = (
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  return res.status(404).json({ success: false, message: 'API Route Not Found' });
};
