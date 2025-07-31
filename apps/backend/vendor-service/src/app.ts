// apps/vendor-service/src/app.ts

import express from 'express';
import { setupSwagger } from '@shared/swagger';
import { errorHandler, notFoundHandler } from '@shared/error';
import { loggerMiddleware } from '@shared/logger';
import { authMiddleware } from '@shared/auth';
import vendorRoutes from './app/routes/vendor.routes';

const app = express();

// 🌐 Global Middleware
app.use(express.json());
app.use(loggerMiddleware);
app.use(authMiddleware());

// 📚 Swagger API Docs
setupSwagger(app, {
  title: 'Vendor Service',
  version: '1.0.0',
  path: '/api/docs/vendor',
});

// 🛣️ Service Routes
app.use('/api/vendor', vendorRoutes);

// 🩺 Health Check Endpoint
app.get('/healthz', (_req, res) => {
  return res.status(200).send('✅ Vendor Service healthy');
});

// 🚫 404 Handler
app.use(notFoundHandler);

// ❌ Centralized Error Handler
app.use(errorHandler);

export default app;
