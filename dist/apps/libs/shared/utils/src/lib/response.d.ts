import { Response } from 'express';
/**
 * Sends a standardized success response.
 * @param res - Express response object
 * @param message - Success message
 * @param data - Response payload
 * @param statusCode - HTTP status code (default 200)
 */
export declare function sendSuccess(res: Response, message: string, data: any, statusCode?: number): Response<any, Record<string, any>>;
/**
 * Sends a standardized error response.
 * @param res - Express response object
 * @param message - Error message
 * @param statusCode - HTTP status code (default 500)
 */
export declare function sendError(res: Response, message: string, statusCode?: number): Response<any, Record<string, any>>;
