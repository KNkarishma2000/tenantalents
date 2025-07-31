import { Request, Response, NextFunction } from 'express';
export declare const registerUser: (req: Request, res: Response, next: NextFunction) => Promise<any>;
export declare const loginUser: (req: Request, res: Response, next: NextFunction) => Promise<any>;
export declare const getProfile: (req: Request, res: Response, next: NextFunction) => Promise<any>;
export declare const updateRole: (req: Request, res: Response, next: NextFunction) => Promise<any>;
