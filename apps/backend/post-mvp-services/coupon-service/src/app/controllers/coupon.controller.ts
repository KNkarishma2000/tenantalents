import { Request, Response, NextFunction } from 'express';
import { couponService } from '../services/coupon.service';
import { sendSuccess } from '@shared/utils/lib/response';

export const createCoupon = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const coupon = await couponService.createCoupon(req.body);
    sendSuccess(res, 'Coupon created', coupon);
  } catch (err) {
    next(err);
  }
};

export const getAllCoupons = async (
  _req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const coupons = await couponService.getAllCoupons();
    sendSuccess(res, 'Coupon list', coupons);
  } catch (err) {
    next(err);
  }
};

export const getCouponByCode = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const coupon = await couponService.getCouponByCode(req.params.code);
    sendSuccess(res, 'Coupon details', coupon);
  } catch (err) {
    next(err);
  }
};

export const deactivateCoupon = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const coupon = await couponService.deactivateCoupon(req.params.code);
    sendSuccess(res, 'Coupon deactivated', coupon);
  } catch (err) {
    next(err);
  }
};
