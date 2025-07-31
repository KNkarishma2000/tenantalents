import express from 'express';
import helmet from 'helmet';
import cors from 'cors';

import { setupSwagger } from '@shared/swagger';
import { errorHandler, notFoundHandler } from '@shared/error';
import { loggerMiddleware } from '@shared/logger';
import ratingRoutes from './app/routes/rating.routes';

const app = express();

// 🔐 Security & Middleware
app.use(helmet()); // Adds secure HTTP headers
app.use(cors()); // Enables Cross-Origin Resource Sharing
app.use(express.json()); // Parses incoming JSON
app.use(loggerMiddleware); // Logs HTTP requests

// 📚 Swagger API Docs
setupSwagger(app, {
  title: 'Rating Service',
  version: '1.0.0',
  path: '/api/docs/rating',
});

// 🚀 Routes
app.use('/api/rating', ratingRoutes);

// 🩺 Health Check
app.get('/healthz', (_req, res) => {
  return res.status(200).send('✅ Rating Service healthy');
});

// ❓ 404 Not Found Handler
app.use(notFoundHandler);

// ❌ Centralized Error Handler
app.use(errorHandler);

export default app;
