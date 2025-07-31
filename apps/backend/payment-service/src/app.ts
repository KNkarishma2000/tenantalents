import express from 'express';
import { setupSwagger } from '@shared/swagger';
import { errorHandler } from '@shared/error';
import { logger } from '@shared/logger';
import paymentRoutes from './app/routes/payment.routes'; // ✅ Ensure this path is correct

const app = express();

// 🧩 Middleware
app.use(express.json());

// 💳 Payment Routes
app.use('/api/payments', paymentRoutes);

// 📚 Swagger API Docs
setupSwagger(app, {
  title: 'Payment Service',
  version: '1.0.0',
  path: '/api/docs/payment',
  description: 'Handles payment processing, verification, and callbacks',
});

// ✅ Health check
app.get('/healthz', (_req, res) => {
  res.send('✅ Payment Service healthy');
});

// ❗ Centralized error handler
app.use(errorHandler);

// 🪵 Startup log
logger.info('💳 Payment Service app initialized');

export default app;
