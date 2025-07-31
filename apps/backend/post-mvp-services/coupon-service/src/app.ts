import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import couponRoutes from '../routes/coupon.routes';
import { setupSwagger } from '@shared/swagger';
import { errorHandler } from '@shared/error';

const app = express();

// 🛡️ Security Middleware
app.use(cors());
app.use(helmet());

// 🌐 JSON Body Parser
app.use(express.json());

// 📚 Swagger API Documentation
setupSwagger(app, {
  title: 'Coupon Service',
  version: '1.0.0',
  path: '/api/docs/coupon',
  // description: 'APIs to manage coupons and promotions', // Optional
});

// 🚪 Routes
app.use('/api/coupons', couponRoutes);

// 🩺 Health Check Endpoint
app.get('/healthz', (_req, res) =>
  res.status(200).send('✅ Coupon Service healthy')
);

// ❌ Centralized Error Handling Middleware
app.use(errorHandler);

export default app;
