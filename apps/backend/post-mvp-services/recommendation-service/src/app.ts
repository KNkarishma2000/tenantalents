import express from 'express';
import recommendationRoutes from './routes/recommendation.routes';
import { setupSwagger } from '@shared/swagger';
import { errorHandler } from '@shared/error';

const app = express();

// 🔧 Parse incoming JSON requests
app.use(express.json());

// 📚 Swagger API Docs
setupSwagger(app, {
  title: 'Recommendation Service',
  version: '1.0.0',
  path: '/api/docs/recommendation',
});

// 🚦 API Routes
app.use('/api/recommendations', recommendationRoutes);

// ❤️ Health check
app.get('/healthz', (_req, res) =>
  res.send('✅ Recommendation Service healthy')
);

// 🧯 Centralized error handler
app.use(errorHandler);

export default app;
