import { Express } from 'express';
import swaggerUi from 'swagger-ui-express';
import swaggerJsdoc from 'swagger-jsdoc';

interface SwaggerConfig {
  title: string;
  version: string;
  description?: string; // ✅ Added
  path: string; // e.g. '/api/docs/user'
}

/**
 * Sets up Swagger UI for the given Express app.
 * Automatically scans routes and docs directories across all apps.
 */
export function setupSwagger(app: Express, config: SwaggerConfig) {
  const options = {
    definition: {
      openapi: '3.0.0',
      info: {
        title: config.title,
        version: config.version,
        description: config.description || '', // ✅ Use if provided
      },
      servers: [{ url: '/' }],
    },
    apis: [
      'apps/**/routes/*.ts', // Route-based Swagger JSDoc comments
      'apps/**/docs/*.swagger.ts', // Dedicated Swagger JSDoc files
    ],
  };

  const swaggerSpec = swaggerJsdoc(options);

  app.use(config.path, swaggerUi.serve, swaggerUi.setup(swaggerSpec));
}

// npm install swagger-ui-express swagger-jsdoc
// npm install -D @types/swagger-ui-express
