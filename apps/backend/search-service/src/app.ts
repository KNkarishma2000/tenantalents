// apps/search-service/src/app.ts

import express from 'express';
import { setupSwagger } from '@shared/swagger';
import { errorHandler, notFoundHandler } from '@shared/error';
import { loggerMiddleware } from '@shared/logger';
// import searchRoutes from './app/routes/search.routes'; // Uncomment if routes exist

const app = express();

// 🌐 Global Middleware
app.use(express.json());
app.use(loggerMiddleware);

// 📚 Swagger API Docs
setupSwagger(app, {
  title: 'Search Service',
  version: '1.0.0',
  path: '/api/docs/search',
});

// 🛣️ Service Routes
// app.use('/api/search', searchRoutes); // Uncomment when you have routes

// 🩺 Health Check Endpoint
app.get('/healthz', (_req, res) => {
  return res.status(200).send('✅ Search Service healthy');
});

// 🚫 404 Handler
app.use(notFoundHandler);

// ❌ Centralized Error Handler
app.use(errorHandler);

export default app;
