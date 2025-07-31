import { Router } from 'express';
import { searchProducts } from '../controllers/search.controller';

const router = Router();

/**
 * @route GET /api/search
 * @desc Search for products by query, category, or brand (all optional)
 */
router.get('/', searchProducts);

export default router;
