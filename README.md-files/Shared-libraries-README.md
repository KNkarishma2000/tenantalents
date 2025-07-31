# 🧰 Shared Libraries — HKTVmall-style E-Commerce Monorepo

Welcome to the `libs/shared/` folder!  
This directory contains reusable libraries used across **all backend microservices** in our e-commerce platform.

---

## 📌 Overview

If you're new here, this guide explains:

✅ What each library does  
💡 Why it's shared  
⚙️ How to use it correctly in services

---

## 🔐 1. `@shared/auth` — Authentication & Authorization

Handles JWT-based auth and role-based access control (RBAC).

### ✅ Features:

- JWT token generation & validation
- Express middleware for route protection
- Role guards for access control

```ts
import { generateToken, verifyToken } from '@shared/auth';
⚙️ 2. @shared/config — Centralized Env Configuration
Loads .env variables with strict validation.

✅ Features:
Type-safe config objects

Centralizes Kafka, Redis, DB, SMTP, etc.

ts
Copy
Edit
import { config } from '@shared/config';
console.log(config.redis.host);
📏 3. @shared/constants — Global Constants
Defines constants shared across microservices.

✅ Features:
Role enums (USER_ROLES)

Kafka topic names

Redis key formats, service ports

ts
Copy
Edit
import { KAFKA_TOPICS } from '@shared/constants';
📬 4. @shared/email — Email Sending Utility
Used for OTP, verification, welcome emails, etc.

✅ Features:
SMTP or SendGrid compatible

Templated HTML emails

ts
Copy
Edit
await sendEmail({ to: user.email, template: 'welcome' });
❗ 5. @shared/error — Centralized Error System
Standard way to throw and handle errors.

✅ Features:
ApiError with status code

Global Express error handler

ts
Copy
Edit
throw new ApiError(403, 'Forbidden');
📨 6. @shared/kafka — Kafka Messaging Utility
Typed Kafka client for all services.

✅ Features:
Typed events (e.g. VendorCreatedEvent)

Kafka client, producer, consumer

Central kafka-topics.ts

ts
Copy
Edit
await kafkaProducer.send({
  topic: KAFKA_TOPICS.VENDOR.CREATED,
  messages: [{ key: 'id', value: JSON.stringify(event) }],
});
📣 7. @shared/logger — Logging Utility
Central structured logger based on Pino or Winston.

ts
Copy
Edit
logger.info('Order placed', { orderId, userId });
🧱 8. @shared/middleware — Common Express Middlewares
✅ Features:
corsMiddleware — allows CORS for local + Vercel

helmetMiddleware — secure headers

rateLimiterMiddleware — request limiting

errorHandler — standard error output

notFoundHandler — handles unknown routes

requestLoggerMiddleware — logs method and route

checkRole() — guards by RBAC role

ts
Copy
Edit
app.use(corsMiddleware());
app.use(helmetMiddleware());
app.use(rateLimiterMiddleware);
app.use(requestLoggerMiddleware);
app.use(notFoundHandler);
app.use(errorHandler);
🪣 9. @shared/minio — File Storage (S3-Compatible)
Used to store invoices, KYC docs, etc.

ts
Copy
Edit
const url = await generatePresignedUrl('invoices', 'invoice-123.pdf');
🔁 10. @shared/redis — Caching Layer
Centralized Redis logic (get/set/ttl/pubsub).

ts
Copy
Edit
await cache.set(`user:${user.id}`, user, 3600);
📄 11. @shared/swagger — API Documentation
Auto-generates Swagger docs per service.

ts
Copy
Edit
setupSwagger(app, 'Vendor API');
🧩 12. @shared/types — Shared Business Types
✅ Features:
Order, Payment, Product, User, Vendor, etc.

Enum values: UserRole, OrderStatus, VendorStatus

Typed Kafka events: VendorCreatedEvent, VendorStatusUpdatedEvent

Response type: ServiceResponse<T>

ts
Copy
Edit
import { Vendor } from '@shared/types';
import { VendorStatus } from '@shared/types/enums/vendor-status.enum';
📦 Type Highlights:
vendor.ts — Vendor entity

invoice.ts — Invoice entity

order.ts, payment.ts, product.ts — commerce core

email.ts, analytics.ts, cart.ts, rating.ts — supplemental

jwt-payload.ts — Used in auth middleware

common.ts — ServiceResponse<T> generic

vendor.events.ts — Kafka payload contracts

🧰 13. @shared/utils — Utility Functions
General-purpose helpers for all services.

🧩 Examples:
ts
Copy
Edit
await sleep(1000);
const id = generateUUID();
const isValid = isEmail('john@example.com');
const parsed = safeParseJSON<MyType>(inputStr);
await retry(() => myFunction(), 3, 2000);
✅ Utility List:
env.ts — safe process.env loading

uuid.ts — RFC-compliant UUID v4

hash.ts — secure SHA-256 hashing

invoice-generator.ts — generate PDF + upload to MinIO

response.ts — sendSuccess, sendError

retry.ts — retry failed async ops

validator.ts — isEmail, isUUID

formatDate.ts — ISO timestamp

🚀 How to Use a Shared Library
Any microservice inside apps/ can import shared logic:

ts
Copy
Edit
import { logger } from '@shared/logger';
import { VendorStatus } from '@shared/types/enums/vendor-status.enum';
🏗️ Contributing to Shared Libs
Every lib lives under:

pgsql
Copy
Edit
libs/shared/{lib-name}/
├── src/
│   ├── lib/       # Logic
│   └── index.ts   # Exports
├── tsconfig.json
├── project.json
✅ Steps to Add/Edit:
Go to the specific lib folder

Update files in src/lib/

Export from src/index.ts

Run npx nx build shared-{lib-name}

Test inside any service

💡 Tips for Developers
If logic is reused → move it to a shared lib

Avoid circular dependencies between shared libs

Prefer pure functions and typed contracts

Never include business logic here (e.g., don't import DB)

📂 Folder Overview
bash
Copy
Edit
libs/shared/
├── auth/         # JWT + RBAC
├── config/       # .env config
├── constants/    # Roles, ports, topics
├── email/        # SMTP email
├── error/        # ApiError + middleware
├── kafka/        # Kafka clients/events
├── logger/       # Winston/Pino logger
├── middlewares/  # CORS, role guards, helmet, etc.
├── minio/        # File uploads (S3-compatible)
├── redis/        # Caching and pub/sub
├── swagger/      # Swagger docs
├── types/        # Shared TS interfaces + enums
└── utils/        # General-purpose functions
```
