import { Response } from 'express';

/**
 * Sends a standardized success response.
 * @param res - Express response object
 * @param message - Success message
 * @param data - Response payload
 * @param statusCode - HTTP status code (default 200)
 */
export function sendSuccess(
  res: Response,
  message: string,
  data: any,
  statusCode = 200
) {
  return res.status(statusCode).json({
    status: 'success',
    message,
    data,
  });
}

/**
 * Sends a standardized error response.
 * @param res - Express response object
 * @param message - Error message
 * @param statusCode - HTTP status code (default 500)
 */
export function sendError(res: Response, message: string, statusCode = 500) {
  return res.status(statusCode).json({
    status: 'error',
    message,
  });
}
