
import rateLimit from 'express-rate-limit';
import { Request, Response, NextFunction } from 'express';

export const rateLimiterMiddleware = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: 'Too many requests, please try again later.',
});

// Optional wrapper if you want to explicitly export as middleware function
export function rateLimiterHandler(
  req: Request,
  res: Response,
  next: NextFunction
) {
  rateLimiterMiddleware(req, res, next);
}

// npm install express-rate-limit
// npm install --save-dev @types/express-rate-limit
