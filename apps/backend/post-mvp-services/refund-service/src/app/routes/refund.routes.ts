import { Router } from 'express';
import {
  requestRefund,
  getRefundById,
  updateRefundStatus,
  listRefundsByUser,
} from '../controllers/refund.controller';

const router = Router();

router.post('/', requestRefund);
router.get('/:id', getRefundById);
router.patch('/:id/status', updateRefundStatus);
router.get('/user/:userId', listRefundsByUser);

export default router;
