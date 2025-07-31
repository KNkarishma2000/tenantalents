import { Request, Response, NextFunction } from 'express';
export declare const rateLimiterMiddleware: import("express-rate-limit").RateLimitRequestHandler;
export declare function rateLimiterHandler(req: Request, res: Response, next: NextFunction): void;
