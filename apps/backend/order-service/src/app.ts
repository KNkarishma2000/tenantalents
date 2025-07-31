import express from 'express';
import { setupSwagger } from '@shared/swagger';
import { errorHandler } from '@shared/error';
import orderRoutes from './app/routes/order.routes';

const app = express();

// 🔐 Core Middleware
app.use(express.json());

// 🛒 Order Routes
app.use('/api/orders', orderRoutes);

// 📚 Swagger API Docs
setupSwagger(app, {
  title: 'Order Service',
  version: '1.0.0',
  path: '/api/docs/order',
});

// ❤️ Health Check
app.get('/healthz', (_req, res) => res.send('✅ Order Service healthy'));

// ❌ Global Error Handler
app.use(errorHandler);

export default app;
