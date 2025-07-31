import { Request, Response, NextFunction } from 'express';
import { recommendationService } from '../services/recommendation.service';
import { sendSuccess } from '@shared/utils/lib/response';

export const getRecommendations = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.params.userId;
    const recommendations =
      await recommendationService.getRecommendationsForUser(userId);
    sendSuccess(res, 'Recommendations fetched', recommendations);
  } catch (err) {
    next(err);
  }
};
