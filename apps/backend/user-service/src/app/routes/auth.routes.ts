import { Router } from 'express';
import {
  registerUser,
  loginUser,
  getProfile,
  updateRole,
} from '../controllers/user.controller';

import { authMiddleware, requireRole } from '@shared/auth';

const router = Router();

// Public routes — no authentication required
router.post('/register', registerUser);
router.post('/login', loginUser);

// Authenticated routes — requires valid JWT
router.get('/profile', authMiddleware(), getProfile);

// Role-protected route — only super_admin can update user roles
router.patch(
  '/:id/role',
  authMiddleware(),
  requireRole('super_admin'),
  updateRole
);

export default router;
