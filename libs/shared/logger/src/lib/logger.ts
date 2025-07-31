import { createLogger, format, transports } from 'winston';

const { combine, timestamp, printf, colorize, errors, json } = format;

const serviceName = process.env.LOG_SERVICE_NAME || 'unknown-service';
const isProduction = process.env.NODE_ENV === 'production';

// Custom log format for development
const devFormat = printf(({ level, message, timestamp, stack }) => {
  return `[${timestamp}] [${serviceName}] ${level}: ${stack || message}`;
});

export const logger = createLogger({
  level: process.env.LOG_LEVEL || 'info',
  format: combine(
    timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    errors({ stack: true }),
    isProduction
      ? json() // JSON format in production for log aggregation tools
      : combine(colorize({ all: true }), devFormat)
  ),
  defaultMeta: { service: serviceName },
  transports: [new transports.Console()],
});
