import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import cmsRoutes from '../routes/cms.routes';
import { setupSwagger } from '@shared/swagger';
import { errorHandler } from '@shared/error';
import { loggerMiddleware } from '@shared/logger';

const app = express();

// 🌐 Security & Logging Middleware
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(loggerMiddleware);

// 📚 Swagger API Docs setup (before routes)
setupSwagger(app, {
  title: 'CMS Service',
  version: '1.0.0',
  path: '/api/docs/cms',
});

// ✅ CMS Routes
app.use('/api/cms', cmsRoutes);

// 🩺 Health Check
app.get('/healthz', (_req, res) =>
  res.status(200).send('✅ CMS Service healthy')
);

// 🛑 Global Error Handler
app.use(errorHandler);

export default app;
