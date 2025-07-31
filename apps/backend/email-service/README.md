📧 Email Service - MVP E-Commerce Platform

The email-service is a core backend microservice responsible for sending transactional emails (order confirmation, account creation, etc.) via SMTP. It also supports Kafka-based event-driven processing, JWT-based RBAC, and uses several shared libraries to maintain consistency across services.
✅ Features

    📬 Sends emails via SMTP (SendGrid-compatible) using Nodemailer
    🔁 Listens to Kafka topics like order-confirmed, user-registered for async emails
    🔐 Protected endpoints via JWT Auth + RBAC
    ♻️ Reusable logic extracted into shared/email library
    📊 Exposes Swagger docs at /api/docs/email
    🧵 Integrated with Redis for caching or queue coordination
    🧼 Graceful shutdown with proper Kafka + Redis disconnects

📁 File Structure & Responsibilities
apps/email-service/
File Purpose Benefits
main.ts Entrypoint to start the server. Connects Kafka, Redis, starts Express. Centralized bootstrapping and graceful shutdown.
app.ts Sets up Express app, routes, middlewares, Swagger, error handler. Clean separation of app configuration from server execution.
controllers/email.controller.ts Handles HTTP request logic (e.g. POST /api/email/test). Thin controller that delegates to services for business logic.
routes/email.routes.ts Defines routes, attaches JWT auth and role-based access control. Keeps API surface organized and secured.
services/email.service.ts Sends emails via Nodemailer using env configs. Abstracts email sending logic, returns messageId for traceability.
consumers/email.consumer.ts Subscribes to Kafka topics, triggers emailService.sendEmail. Enables async, event-driven email dispatching.
email.swagger.ts (optional) Swagger documentation grouped under /api/docs/email. Automatically generates API docs for consumers.
.env Holds SMTP, Kafka, Redis, and port configuration. Easily manage environment-specific configs without code change.
📚 Shared Libraries Used
libs/shared/email/
File Purpose Benefits
client.ts Core email dispatch function using Nodemailer Shared utility used across services or jobs needing email
types.ts Defines EmailPayload type { to, subject, html } Ensures type safety for email payloads everywhere
index.ts Exports sendEmail and EmailPayload Single point of import for email-related utilities
How it's used in email.controller.ts:

import { sendEmail, EmailPayload } from '@shared/email';

await sendEmail({
to: 'test@example.com',
subject: 'Welcome!',
html: '<h1>Hello</h1>',
});

🔗 Other Shared Libraries Used
Library Usage
@shared/config Provides env variables like SMTP settings, Kafka config
@shared/logger Winston-based logger used for structured logging
@shared/kafka Kafka producer/consumer management
@shared/redis Redis client to connect/quit during app lifecycle
@shared/auth JWT-based middleware and RBAC guard
@shared/swagger Registers Swagger for this service
@shared/error Centralized error handler used in Express pipeline
🔐 API Endpoint
POST /api/email/test

Send a test email.
Request Body:

{
"to": "user@example.com",
"subject": "Welcome",
"html": "<h1>Hello there!</h1>"
}

Response:

{
"message": "Email sent",
"messageId": "<smtp-message-id>"
}

Security:

Requires valid JWT token with role: admin or super_admin.
⚙️ Example .env

PORT=3004

# SMTP

SMTP_HOST=smtp.sendgrid.net
SMTP_PORT=587
SMTP_USER=apikey
SMTP_PASS=your-sendgrid-api-key
EMAIL_FROM=noreply@mvp-shop.com

# Kafka

KAFKA_BROKER=localhost:9092
KAFKA_CLIENT_ID=email-service
KAFKA_GROUP_ID=email-consumer-group

# Redis

REDIS_HOST=localhost
REDIS_PORT=6379

🧪 Testing
Unit test file:

controllers/email.controller.spec.ts

# Run only this service test

npx nx test email-service

🐳 Docker Support

Ensure your Dockerfile builds correctly:

FROM node:20-alpine
WORKDIR /app
COPY dist/apps/email-service ./
RUN npm install --production
CMD ["node", "main.js"]

📊 Swagger UI

After running the service:

http://localhost:3004/api/docs/email

🧵 Kafka Consumer

In consumers/email.consumer.ts, an example:

await createKafkaConsumer({
groupId: env.KAFKA_GROUP_ID,
topics: ['order-confirmed'],
onMessage: async ({ topic, message }) => {
const payload: EmailPayload = JSON.parse(message.value.toString());
await emailService.sendEmail(payload);
},
});

🧼 Graceful Shutdown

When terminated (SIGINT or SIGTERM):

    ✅ Closes Redis connection

    ✅ Disconnects Kafka producer/consumer

    ✅ Stops HTTP server

Handled in main.ts to ensure clean resource release.
✨ Summary

This service is designed to be:

    Reusable: via shared/email and shared/config
    Event-driven: Kafka email events
    Secure: JWT + Role-based protection
    Scalable: Stateless, horizontally scalable
    Observable: Logs, metrics, and graceful shutdown support

---

## 📄 `apps/email-service/README.md`

````md
# 📧 Email Service

Handles all transactional email events via Kafka (e.g. order confirmation, welcome).

## 🚀 Features

- SMTP email sending
- Kafka consumer
- Nodemailer + Kafka + Redis
- MinIO backup for email logs (if enabled)
- Swagger `/api/docs/email`

## ⚙️ `.env`

```env
PORT=3004
SMTP_HOST=smtp.mailtrap.io
SMTP_PORT=2525
SMTP_USER=your_user
SMTP_PASS=your_pass
KAFKA_CLIENT_ID=email-service
```
````
