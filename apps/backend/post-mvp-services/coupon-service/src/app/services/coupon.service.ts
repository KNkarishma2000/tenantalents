import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const couponService = {
  createCoupon: async (data: {
    code: string;
    discount: number;
    expiresAt: Date;
  }) => {
    return prisma.coupon.create({ data });
  },

  getAllCoupons: async () => {
    return prisma.coupon.findMany();
  },

  getCouponByCode: async (code: string) => {
    return prisma.coupon.findUnique({ where: { code } });
  },

  deactivateCoupon: async (code: string) => {
    return prisma.coupon.update({
      where: { code },
      data: { isActive: false },
    });
  },
};
