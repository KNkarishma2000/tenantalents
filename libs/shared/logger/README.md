📄 @shared/logger — Centralized Logging Utility
This library provides a consistent and structured logging setup across all backend services in the MVP E-Commerce Platform (HKTVmall-style), built using the Nx Monorepo architecture.

It wraps powerful logging utilities like Winston into a single reusable module, ensuring simplicity, consistency, and production readiness.

📁 Folder Structure
bash
Copy
Edit
libs/shared/logger/
├── src/
│ ├── index.ts # Re-exports the logger
│ └── lib/
│ └── logger.ts # Logger configuration and instance
├── tsconfig.json
└── tsconfig.lib.json
🚀 Features
✅ Consistent logger across all microservices

🌈 Pretty-printed logs in development

📦 JSON logs for production (compatible with Loki, Grafana, etc.)

🔧 Extendable with metadata like service name, trace IDs, and more

🧪 Safe to use in any service or background worker

🔧 Example Usage
ts
Copy
Edit
import { logger } from '@shared/logger';

logger.info('Server started on port 3001');
logger.warn('Rate limit exceeded');
logger.error(new Error('Database connection failed'));
🧰 What's Inside
logger.ts
A fully configured Winston logger instance that:

📦 Outputs pretty logs when NODE_ENV !== 'production'

🪵 Outputs structured JSON logs in production environments

🧾 Automatically includes timestamp, log level, and optional service name

🔐 .env Configuration (Optional)
These environment variables let you control logger behavior per service:

env
Copy
Edit
NODE_ENV=development
LOG_SERVICE_NAME=product-service
LOG_LEVEL=info
Variable Description Default
NODE_ENV Controls development vs production logs development
LOG_SERVICE_NAME Adds service label to each log message unknown-service
LOG_LEVEL Controls verbosity (info, debug, etc.) info

💡 Sample Output
🧪 Development Mode (NODE_ENV=development)
bash
Copy
Edit
[2025-07-13 10:30:00] [product-service] info: Server started on port 3001
[2025-07-13 10:30:02] [product-service] error: Database connection failed
🌐 Production Mode (NODE_ENV=production)
json
Copy
Edit
{
"level": "error",
"message": "Database connection failed",
"timestamp": "2025-07-13T10:30:00.000Z",
"service": "product-service",
"stack": "Error: Database connection failed\n at ..."
}
📦 Combine With
@shared/error: to log exceptions thrown from global error handlers

@shared/kafka: to log Kafka events and failures

@shared/config: to dynamically inject service names, log levels, and environments

📚 Learn More
Winston Logging Docs

12 Factor App: Logs

Structured Logging Best Practices
