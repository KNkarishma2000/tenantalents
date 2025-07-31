import { Request, Response, NextFunction } from 'express';
import { ApiError } from './api-error';

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let customError = err;

  // If error is not an instance of ApiError, make it so
  if (!(err instanceof ApiError)) {
    customError = new ApiError(500, 'Something went wrong');
  }

  const apiError = customError as ApiError;

  res.status(apiError.statusCode || 500).json({
    success: false,
    message: apiError.message || 'Internal Server Error',
  });
};
