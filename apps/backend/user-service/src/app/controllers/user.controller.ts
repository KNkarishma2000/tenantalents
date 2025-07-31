import { Request, Response, NextFunction } from 'express';
import { userService } from '../services/user.service';
import { produceKafkaEvent } from '@shared/kafka';
import { sendSuccess } from '@shared/utils/lib/response';
import { KAFKA_TOPICS } from '@shared/kafka/lib/kafka-topics';
import { UserRole } from '@prisma/client';

// 📝 POST /api/users/register
export const registerUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await userService.registerUser(req.body);

    // Emit generic user registration event
    await produceKafkaEvent({
      topic: KAFKA_TOPICS.USER_REGISTERED,
      messages: [
        {
          key: user.id.toString(),
          value: JSON.stringify({
            id: user.id,
            email: user.email,
            role: user.role,
          }),
        },
      ],
    });

    // If the registered user is a vendor, notify vendor-service
    if (user.role === UserRole.vendor) {
      await produceKafkaEvent({
        topic: KAFKA_TOPICS.VENDOR_USER_REGISTERED,
        messages: [
          {
            key: user.id.toString(),
            value: JSON.stringify({
              userId: user.id,
              email: user.email,
              phone: req.body.phone,
              status: 'pending',
            }),
          },
        ],
      });
    }

    return sendSuccess(res, 'User registered successfully', user);
  } catch (err) {
    next(err);
  }
};

// 🔐 POST /api/users/login
export const loginUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = await userService.loginUser(req.body);
    return sendSuccess(res, 'Login successful', { token });
  } catch (err) {
    next(err);
  }
};

// 🙋‍♂️ GET /api/users/profile
export const getProfile = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await userService.getUserProfile(req.user!.userId);
    return sendSuccess(res, 'Profile fetched successfully', user);
  } catch (err) {
    next(err);
  }
};

// 🔁 PATCH /api/users/:id/role
export const updateRole = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const updated = await userService.updateUserRole(
      req.params.id,
      req.body.role
    );
    return sendSuccess(res, 'User role updated successfully', updated);
  } catch (err) {
    next(err);
  }
};
