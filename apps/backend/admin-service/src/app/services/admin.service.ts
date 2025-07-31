import {
  PrismaClient,
  User,
  Seller,
  UserRole,
  SellerStatus,
} from '@prisma/client'; // ✅ Make sure this is the correct path

const prisma = new PrismaClient();

export const adminService = {
  getAllUsers: async (): Promise<
    Array<{
      id: string;
      email: string;
      role: UserRole;
      sellerStatus: SellerStatus | null;
    }>
  > => {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        email: true,
        role: true,
        seller: {
          select: {
            status: true,
          },
        },
      },
    });

    return users.map((user) => ({
      id: user.id,
      email: user.email,
      role: user.role,
      sellerStatus: user.seller?.status ?? null,
    }));
  },

  updateUserRole: async (userId: string, role: UserRole): Promise<User> => {
    const validRoles: UserRole[] = Object.values(UserRole);

    if (!validRoles.includes(role)) {
      throw new Error(`Invalid user role: ${role}`);
    }

    return prisma.user.update({
      where: { id: userId },
      data: { role },
    });
  },

  getPendingSellers: async (): Promise<
    (Seller & {
      user: Pick<User, 'id' | 'email' | 'role'> | null;
    })[]
  > => {
    return prisma.seller.findMany({
      where: { status: SellerStatus.PENDING },
      include: {
        user: {
          select: {
            id: true,
            email: true,
            role: true,
          },
        },
      },
    });
  },

  updateSellerStatus: async (
    sellerId: string,
    approve: boolean
  ): Promise<Seller> => {
    const newStatus: SellerStatus = approve
      ? SellerStatus.APPROVED
      : SellerStatus.REJECTED;

    const seller = await prisma.seller.findUnique({
      where: { id: sellerId },
    });

    if (!seller) {
      throw new Error(`Seller not found with ID: ${sellerId}`);
    }

    return prisma.seller.update({
      where: { id: sellerId },
      data: { status: newStatus },
    });
  },

  getDashboardSummary: async (): Promise<{
    userCount: number;
    sellerCount: number;
  }> => {
    const [userCount, sellerCount] = await Promise.all([
      prisma.user.count(),
      prisma.seller.count(),
    ]);

    return { userCount, sellerCount };
  },
};
