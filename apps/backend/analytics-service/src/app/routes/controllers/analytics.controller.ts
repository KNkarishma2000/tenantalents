import { Request, Response, NextFunction } from 'express';
import { analyticsService } from '../services/analytics.service';
import { sendSuccess } from '@shared/utils';

export const getSummary = async (
  _req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const summary = await analyticsService.getSummary();
    sendSuccess(res, '📊 Analytics summary retrieved successfully.', summary);
  } catch (error) {
    next(error);
  }
};
