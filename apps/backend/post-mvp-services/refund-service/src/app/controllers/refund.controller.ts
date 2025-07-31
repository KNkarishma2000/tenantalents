import { Request, Response, NextFunction } from 'express';
import { refundService } from '../services/refund.service';
import { sendSuccess } from '@shared/utils/lib/response';

export const requestRefund = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const refund = await refundService.requestRefund(req.body);
    sendSuccess(res, 'Refund requested', refund);
  } catch (err) {
    next(err);
  }
};

export const getRefundById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const refund = await refundService.getRefundById(req.params.id);
    sendSuccess(res, 'Refund details', refund);
  } catch (err) {
    next(err);
  }
};

export const updateRefundStatus = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const refund = await refundService.updateRefundStatus(
      req.params.id,
      req.body.status
    );
    sendSuccess(res, 'Refund status updated', refund);
  } catch (err) {
    next(err);
  }
};

export const listRefundsByUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const refunds = await refundService.listRefundsByUser(req.params.userId);
    sendSuccess(res, 'User refunds', refunds);
  } catch (err) {
    next(err);
  }
};
