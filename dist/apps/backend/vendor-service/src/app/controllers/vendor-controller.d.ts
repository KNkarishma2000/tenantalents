import { Request, Response } from 'express';
/**
 * Create a new vendor
 */
export declare const createVendor: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
/**
 * Update vendor fields (excluding status-only updates)
 */
export declare const updateVendor: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
/**
 * Get vendor by ID
 */
export declare const getVendorById: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
/**
 * Get all vendors
 */
export declare const getAllVendors: (_req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
/**
 * Delete a vendor by ID
 */
export declare const deleteVendor: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
/**
 * Upload vendor documents
 */
export declare const uploadVendorDocuments: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const approveVendor: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const rejectVendor: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const getVendorAnalytics: (_req: Request, res: Response) => Promise<void>;
