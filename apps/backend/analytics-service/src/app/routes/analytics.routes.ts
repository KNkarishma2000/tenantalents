// apps/analytics-service/src/routes/analytics.routes.ts

import { Router } from 'express';
import { getSummary } from '../controllers/analytics.controller';
import { authMiddleware, requireRole } from '@shared/auth';
import dotenv from 'dotenv';

dotenv.config();

const router = Router();

// ✅ Authenticate using JWT
router.use(authMiddleware(process.env.JWT_SECRET!));

// ✅ Authorize only super_admin users
router.use(requireRole(['super_admin']));

// ✅ Analytics summary route
router.get('/summary', getSummary);

export default router;
