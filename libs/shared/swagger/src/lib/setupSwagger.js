"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.setupSwagger = setupSwagger;
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const swagger_jsdoc_1 = __importDefault(require("swagger-jsdoc"));
/**
 * Sets up Swagger UI for the given Express app.
 * Automatically scans routes and docs directories across all apps.
 */
function setupSwagger(app, config) {
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
    const swaggerSpec = (0, swagger_jsdoc_1.default)(options);
    app.use(config.path, swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swaggerSpec));
}
// npm install swagger-ui-express swagger-jsdoc
// npm install -D @types/swagger-ui-express
//# sourceMappingURL=setupSwagger.js.map