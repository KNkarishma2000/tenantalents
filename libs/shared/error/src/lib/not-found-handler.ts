import { Request, Response, NextFunction } from 'express';
import { ApiError } from './api-error';

export const notFoundHandler = (
  req: Request,
  _res: Response,
  next: NextFunction
) => {
  const message = `🔍 Not Found - ${req.originalUrl}`;
  next(new ApiError(404, message));
};
