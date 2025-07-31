"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logger = void 0;
const winston_1 = require("winston");
const { combine, timestamp, printf, colorize, errors, json } = winston_1.format;
const serviceName = process.env.LOG_SERVICE_NAME || 'unknown-service';
const isProduction = process.env.NODE_ENV === 'production';
// Custom log format for development
const devFormat = printf(({ level, message, timestamp, stack }) => {
    return `[${timestamp}] [${serviceName}] ${level}: ${stack || message}`;
});
exports.logger = (0, winston_1.createLogger)({
    level: process.env.LOG_LEVEL || 'info',
    format: combine(timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }), errors({ stack: true }), isProduction
        ? json() // JSON format in production for log aggregation tools
        : combine(colorize({ all: true }), devFormat)),
    defaultMeta: { service: serviceName },
    transports: [new winston_1.transports.Console()],
});
//# sourceMappingURL=logger.js.map