import { Express } from 'express';
interface SwaggerConfig {
    title: string;
    version: string;
    description?: string;
    path: string;
}
/**
 * Sets up Swagger UI for the given Express app.
 * Automatically scans routes and docs directories across all apps.
 */
export declare function setupSwagger(app: Express, config: SwaggerConfig): void;
export {};
