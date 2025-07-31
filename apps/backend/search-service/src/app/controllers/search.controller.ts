import { Request, Response, NextFunction } from 'express';
import { searchService } from '../services/search.service';
import { sendSuccess } from '@shared/utils/lib/response';

export const searchProducts = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const query =
      typeof req.query.query === 'string' ? req.query.query : undefined;
    const category =
      typeof req.query.category === 'string' ? req.query.category : undefined;
    const brand =
      typeof req.query.brand === 'string' ? req.query.brand : undefined;

    const products = await searchService.search({ query, category, brand });
    sendSuccess(res, 'Search results', products);
  } catch (err) {
    next(err);
  }
};
