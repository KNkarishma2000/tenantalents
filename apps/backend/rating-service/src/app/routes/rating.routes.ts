import { Router } from 'express';
import { authMiddleware } from '@shared/auth';
import {
  createRating,
  updateRating,
  deleteRating,
  getRatingsByProduct,
} from '../controllers/rating.controller';

const router = Router();

router.post('/rate', authMiddleware(['buyer', 'buyer_seller']), createRating);
router.put('/:id', authMiddleware(['buyer', 'buyer_seller']), updateRating);
router.delete('/:id', authMiddleware(['buyer', 'buyer_seller']), deleteRating);
router.get('/product/:productId', getRatingsByProduct);

export default router;
