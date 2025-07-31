import { Router } from 'express';
import {
  createCoupon,
  getAllCoupons,
  getCouponByCode,
  deactivateCoupon,
} from '../controllers/coupon.controller';

const router = Router();

router.post('/', createCoupon);
router.get('/', getAllCoupons);
router.get('/:code', getCouponByCode);
router.patch('/:code/deactivate', deactivateCoupon);

export default router;
