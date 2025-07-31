import express from 'express';

import { setupSwagger } from '@shared/swagger';
import { errorHandler, notFoundHandler } from '@shared/error';
import { authMiddleware } from '@shared/auth';
import { logger } from '@shared/logger';
import {
  corsMiddleware,
  helmetMiddleware,
  rateLimiter,
  requestLogger,
} from '@shared/middlewares';

import cartRoutes from './app/routes/cart.routes';

const app = express();

// 🛒 Boot Log
logger.info('🚀 Starting Cart Service');

// 🧩 Global Middleware
app.use(express.json());
app.use(corsMiddleware); // ✅ already middleware function
app.use(helmetMiddleware); // ✅ already middleware instance
app.use(rateLimiter); // ✅ rate limit middleware
app.use(requestLogger); // ✅ logs requests with morgan or winston

// 🔐 Protected Routes
app.use('/api/cart', authMiddleware(), cartRoutes);

// 📚 Swagger Documentation
setupSwagger(app, {
  title: 'Cart Service API',
  version: '1.0.0',
  description: 'Handles user shopping cart logic',
  path: '/api/docs/cart',
});

// ✅ Health Check
app.get('/healthz', (_req, res) => res.send('✅ Cart Service healthy'));

// ❌ 404 Not Found
app.use(notFoundHandler);

// ❗ Global Error Handler
app.use(errorHandler);

export default app;
