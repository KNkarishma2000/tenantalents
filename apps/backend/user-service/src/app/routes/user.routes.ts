import { Router } from 'express';
import { getProfile, updateRole } from '../controllers/user.controller';
import { authMiddleware, requireRole } from '@shared/auth';

const router = Router();

// Middleware to authenticate JWT
const authenticateJWT = authMiddleware();

// GET /api/users/profile — Accessible to any authenticated user
router.get('/profile', authenticateJWT, getProfile);

// PATCH /api/users/:id/role — Restricted to super_admin role only
router.patch(
  '/:id/role',
  authenticateJWT,
  requireRole('super_admin'),
  updateRole
);

export default router;
