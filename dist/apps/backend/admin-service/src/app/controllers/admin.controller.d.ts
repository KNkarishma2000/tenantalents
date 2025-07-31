import { Request, Response, NextFunction } from 'express';
/**
 * GET /api/admin/users
 * Fetch all users
 */
export declare const getAllUsers: (_: Request, res: Response, next: NextFunction) => Promise<void | Response<any, Record<string, any>>>;
/**
 * PATCH /api/admin/users/role
 * Update a user’s role
 */
export declare const updateUserRole: (req: Request, res: Response, next: NextFunction) => Promise<void | Response<any, Record<string, any>>>;
/**
 * GET /api/admin/sellers/pending
 * Fetch all pending sellers
 */
export declare const getPendingSellers: (_: Request, res: Response, next: NextFunction) => Promise<void | Response<any, Record<string, any>>>;
/**
 * PATCH /api/admin/sellers/approve
 * Approve or reject a seller based on admin input
 */
export declare const approveSeller: (req: Request, res: Response, next: NextFunction) => Promise<void | Response<any, Record<string, any>>>;
/**
 * GET /api/admin/dashboard
 * Get admin dashboard stats (users, vendors, orders, etc.)
 */
export declare const getAdminDashboard: (_: Request, res: Response, next: NextFunction) => Promise<void | Response<any, Record<string, any>>>;
