import { Router } from 'express';
import { sendTestEmail } from '../controllers/email.controller';
import { authMiddleware, UserRole } from '@shared/auth'; // Import UserRole type

const router = Router();

const jwtSecret = process.env.JWT_SECRET || 'default_secret';

// ✅ Secure endpoint: allow only admin and super_admin roles
router.post(
  '/test',
  authMiddleware(['admin', 'super_admin'], jwtSecret), // UserRole as string union
  sendTestEmail
);

export default router;
