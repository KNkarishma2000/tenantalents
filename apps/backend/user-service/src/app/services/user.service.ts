import { PrismaClient, UserRole } from '@prisma/client';
import { hashPassword, comparePassword, generateJWT } from '@shared/auth';
import { publishEvent } from '@shared/kafka';
import { KAFKA_TOPICS } from '@shared/kafka';

const prisma = new PrismaClient();

interface RegisterUserParams {
  email: string;
  password: string;
  phone: string;
  role?: UserRole;
}

interface LoginUserParams {
  email: string;
  password: string;
}

export const userService = {
  registerUser: async ({
    email,
    password,
    phone,
    role = UserRole.buyer,
  }: RegisterUserParams) => {
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      throw new Error('User already exists');
    }

    const hashedPassword = await hashPassword(password);

    const user = await prisma.user.create({
      data: {
        email,
        phone,
        password: hashedPassword,
        role,
      },
    });

    // Publish core Kafka events
    await publishEvent(KAFKA_TOPICS.USER_CREATED, {
      value: JSON.stringify({
        userId: user.id,
        email: user.email,
        role: user.role,
      }),
    });

    await publishEvent(KAFKA_TOPICS.USER_REGISTRATION_EMAIL, {
      value: JSON.stringify({ email: user.email }),
    });

    // Generate OTP and send event for SMS
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    await publishEvent(KAFKA_TOPICS.USER_REGISTRATION_OTP, {
      value: JSON.stringify({ phone: user.phone, otp }),
    });

    // Additional event if user is vendor
    if (user.role === UserRole.vendor) {
      await publishEvent(KAFKA_TOPICS.VENDOR_USER_REGISTERED, {
        value: JSON.stringify({
          userId: user.id,
          email: user.email,
          phone: user.phone,
          status: 'pending',
        }),
      });
    }

    return { id: user.id, email: user.email, role: user.role };
  },

  loginUser: async ({ email, password }: LoginUserParams) => {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      throw new Error('Invalid credentials');
    }

    const isValid = await comparePassword(password, user.password);
    if (!isValid) {
      throw new Error('Invalid credentials');
    }

    return generateJWT({ userId: user.id, role: user.role });
  },

  getUserProfile: async (userId: string) => {
    return prisma.user.findUnique({
      where: { id: userId },
      select: { id: true, email: true, role: true },
    });
  },

  updateUserRole: async (userId: string, newRole: UserRole) => {
    return prisma.user.update({
      where: { id: userId },
      data: { role: newRole },
    });
  },
};
