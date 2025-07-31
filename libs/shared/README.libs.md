✅ auth/README.md

# @shared/auth

Authentication and authorization utilities for JWT, OAuth, and RBAC-based access control.

## File Descriptions

- `authMiddleware.ts` – Express middleware to enforce JWT authentication.
- `generateToken.ts` – Generates access and refresh JWT tokens.
- `global.d.ts` – Global typings for extended Express request objects.
- `jwt.ts` – JWT token handling utilities (verify, decode).
- `oauth.ts` – OAuth2 client setup and token flow (e.g., for Keycloak).
- `optionalAuthMiddleware.ts` – Middleware to optionally decode JWT if present.
- `requireRole.ts` – Middleware to enforce specific user roles on routes.
- `roleGuard.ts` – Role-based guard to restrict access based on permissions.
- `types.ts` – Shared types for auth, roles, and token payloads.

## Usage

````ts
import { authMiddleware } from '@shared/auth';
app.use(authMiddleware);


---

### ✅ `config/README.md`
```md
# @shared/config

Centralized, type-safe configuration management with `.env` parsing.

## File Descriptions

- `config.ts` – Loads and aggregates all service configs.
- `env.ts` – Loads and validates environment variables.
- `imagekit.ts` – ImageKit client and configuration options.
- `jwt.ts` – JWT config (secrets, expiration).
- `kafka.ts` – Kafka configuration for brokers and clients.
- `minio.ts` – MinIO connection config and credentials.
- `postgres.ts` – PostgreSQL DB config and connection URL.
- `redis.ts` – Redis Sentinel connection config.
- `smtp.ts` – SMTP email transport configuration.
- `types.ts` – Config types for validation and environment safety.

## Usage

```ts
import { postgresConfig } from '@shared/config';


---

### ✅ `constants/README.md`
```md
# @shared/constants

Application-wide constants such as ports, topics, keys, and roles.

## File Descriptions

- `jwt-config.ts` – JWT expiration and token header constants.
- `kafka-topics.ts` – Predefined Kafka topic names.
- `redis-keys.ts` – Structured Redis key templates.
- `roles.ts` – Enum of user roles (e.g., ADMIN, CUSTOMER).
- `service-ports.ts` – Ports for each microservice.

## Usage

```ts
import { KAFKA_TOPICS } from '@shared/constants';


---

### ✅ `email/README.md`
```md
# @shared/email

Email utility to send transactional messages via SMTP.

## File Descriptions

- `client.ts` – Nodemailer client using SMTP config.
- `send.ts` – Function to send templated or plain emails.
- `service.ts` – Wrapper service for email dispatch logic.
- `types.ts` – Email message structure/type definitions.

## Usage

```ts
import { sendEmail } from '@shared/email';


---

### ✅ `error/README.md`
```md
# @shared/error

Reusable error classes and middleware for centralized API error handling.

## File Descriptions

- `api-error.ts` – Custom `ApiError` class with status codes and messages.
- `error-handler.ts` – Express middleware to catch and format errors.

## Usage

```ts
import { ApiError } from '@shared/error';


---

### ✅ `kafka/README.md`
```md
# @shared/kafka

Kafka producer/consumer utilities and typed event abstraction.

## File Descriptions

- `events/` – Kafka event definitions and payload schemas.
- `kafka-client.ts` – KafkaJS client configuration.
- `kafka-config.ts` – Kafka service broker and client options.
- `kafka-consumer.ts` – Reusable Kafka consumer abstraction.
- `kafka-producer.ts` – Wrapper to publish messages to Kafka topics.
- `kafka-topics.ts` – Central list of Kafka topic names.
- `kafka.ts` – Combined Kafka setup and lifecycle.
- `kafka-types.ts` – Types for events, producers, and payloads.

## Usage

```ts
import { kafkaProducer } from '@shared/kafka';


---

### ✅ `logger/README.md`
```md
# @shared/logger

Service-aware logger using Winston for structured logging.

## File Descriptions

- `logger.ts` – Winston logger instance with timestamp and service label.

## Usage

```ts
import logger from '@shared/logger';


---

### ✅ `middlewares/README.md`
```md
# @shared/middlewares

Reusable Express.js middlewares for cross-cutting concerns.

## File Descriptions

- `cors.middleware.ts` – CORS configuration for API access.
- `error.middleware.ts` – Central error handler fallback.
- `helmet.middleware.ts` – Security headers via Helmet.
- `notFound.middleware.ts` – 404 handler for unknown routes.
- `rateLimiter.middleware.ts` – Rate limiting based on IP.
- `requestLogger.middleware.ts` – Logs incoming request metadata.
- `role.middleware.ts` – Middleware for checking user roles.

## Usage

```ts
import { corsMiddleware } from '@shared/middlewares';


---

### ✅ `minio/README.md`
```md
# @shared/minio

MinIO client and utilities for secure file storage.

## File Descriptions

- `bucket.ts` – Bucket creation and existence check.
- `generate-filename.util.ts` – Generates unique file names.
- `generate-path.util.ts` – Constructs file path with directory.
- `get-presigned-url.util.ts` – Generates signed upload/download URLs.
- `minio-client.ts` – MinIO SDK client setup.
- `minio-constants.ts` – Default bucket names and prefixes.
- `minio.ts` – Unified interface for uploads and downloads.
- `minio-types.ts` – Types for object metadata, file payloads.
- `minio-utils.ts` – Helpers for parsing and validating MinIO paths.

## Usage

```ts
import { getPresignedUrl } from '@shared/minio';


---

### ✅ `redis/README.md`
```md
# @shared/redis

Redis cache management, key patterns, and client utilities.

## File Descriptions

- `cache.ts` – Generic get/set/expire cache operations.
- `keys.ts` – Redis key builders by service/feature.
- `redis-client.ts` – Redis Sentinel client instance.
- `redis-config.ts` – Redis connection and failover config.
- `redis-utils.ts` – TTL helpers, namespace builders.
- `types.ts` – Types for Redis entries and options.

## Usage

```ts
import { cache } from '@shared/redis';


---

### ✅ `swagger/README.md`
```md
# @shared/swagger

OpenAPI/Swagger auto-documentation setup for each service.

## File Descriptions

- `setupSwagger.ts` – Sets up Swagger for Express services.
- `tags.ts` – Centralized tag definitions for each domain.

## Usage

```ts
import { setupSwagger } from '@shared/swagger';


---

### ✅ `types/README.md`
```md
# @shared/types

Common TypeScript types and interfaces used across services.

## File Descriptions

- `express/index.d.ts` – Express extension for `req.user`, etc.
- `cart.ts` – Types related to cart structure and items.
- `common.ts` – Shared basic types (UUID, email, etc.).
- `jwt-payload.ts` – Type for decoded JWT payload.
- `kafka-events.ts` – Kafka event types shared between services.

## Usage

```ts
import { JwtPayload } from '@shared/types';


---

### ✅ `utils/README.md`
```md
# @shared/utils

Reusable utility functions for formatting, hashing, retry logic, etc.

## File Descriptions

- `env.ts` – Safe access to environment variables.
- `formatDate.ts` – Formats dates into human-readable or ISO formats.
- `hash.ts` – Password hashing and comparison with bcrypt.
- `invoice-generator.ts` – Generates simple invoice metadata or PDFs.
- `parseJSON.ts` – Safe JSON parse with fallback.
- `response.ts` – Standardized API response wrapper.
- `retry.ts` – Retry wrapper with exponential backoff.
- `sleep.ts` – Delay execution by given milliseconds.
- `uuid.ts` – Generates UUIDs (v4).
- `validator.ts` – Custom validation functions (e.g. email, mobile).

## Usage

```ts
import { hashPassword } from '@shared/utils';

````
