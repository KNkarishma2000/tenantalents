import { prisma } from '@shared/prisma'; // ⬅️ Shared prisma import

interface CreateRatingInput {
  productId: string;
  rating: number;
  comment?: string;
}

export const ratingService = {
  createRating: async (userId: string, data: CreateRatingInput) => {
    return prisma.rating.create({
      data: {
        userId,
        productId: data.productId,
        rating: data.rating,
        comment: data.comment,
      },
    });
  },

  getRatingsByProduct: async (productId: string) => {
    return prisma.rating.findMany({
      where: { productId },
      include: {
        user: {
          select: { name: true },
        },
      },
    });
  },

  updateRating: async (
    userId: string,
    ratingId: string,
    ratingValue: number
  ) => {
    return prisma.rating.updateMany({
      where: { id: ratingId, userId },
      data: { rating: ratingValue },
    });
  },

  deleteRating: async (userId: string, ratingId: string) => {
    return prisma.rating.deleteMany({
      where: { id: ratingId, userId },
    });
  },
};
