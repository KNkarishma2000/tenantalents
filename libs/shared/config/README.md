.

🛠️ @shared/config — Centralized Configuration Library
This shared library provides unified, type-safe configuration management for all backend services in the MVP E-Commerce Platform (HKTVmall-style), built with Nx Monorepo architecture.

All infrastructure-related values (PostgreSQL, Redis, Kafka, MinIO, SMTP, JWT, etc.) are centralized here to promote reuse, consistency, and security across services like:

user-service

product-service

order-service

email-service

invoice-service

admin-service

...and more.

📁 Folder Structure
bash
Copy
Edit
libs/shared/config/
├── index.ts # Re-exports all configuration utilities
└── lib/
├── config.ts # Combines and structures all env configs
├── env.ts # Safely loads variables from process.env
├── imagekit.ts # ImageKit credentials & CDN endpoint
├── jwt.ts # JWT secret key and expiration
├── kafka.ts # Kafka brokers, clientId, groupId, topics
├── minio.ts # MinIO endpoint, access key, bucket name
├── postgres.ts # Builds PostgreSQL connection string
├── redis.ts # Redis host and port config
├── smtp.ts # SMTP host, user, and password for email
└── types.ts # Shared config types (e.g. `NodeEnv`)
🧩 What It Does
Feature Description
✅ Typed Access Access env vars using strongly-typed objects
🧠 Centralized Setup Avoid scattered or duplicated config logic
❌ No Hardcoding Protect secrets and ports from being hardcoded
🔐 Startup Validation Ensure required env vars are set early
☁️ Cloud Ready Works with .env, Docker, or Kubernetes secrets

🧪 Usage in a Microservice
ts
Copy
Edit
import { config } from '@shared/config';

console.log(config.postgres.host); // e.g. "localhost"
console.log(config.kafka.broker); // e.g. "localhost:9092"
console.log(config.smtp.user); // e.g. "user@mail.com"
📦 What's Inside Each File
File Purpose
config.ts Central export object. Groups all env values by domain (e.g. postgres, redis, kafka)
env.ts Loads .env values and applies defaults or type conversions
postgres.ts Builds PostgreSQL connection string
redis.ts Provides Redis connection info
kafka.ts Kafka client ID, brokers, group ID, topic names
smtp.ts SMTP credentials for email delivery
jwt.ts JWT secret used for signing/verifying tokens
minio.ts MinIO object storage config
imagekit.ts ImageKit keys and endpoint config
types.ts Common TypeScript types like NodeEnv

🔒 Example .env for a Microservice
env
Copy
Edit

# Common

PORT=3001
NODE_ENV=development

# PostgreSQL

POSTGRES_HOST=localhost
POSTGRES_PORT=5432
POSTGRES_USER=mvp_ecom_user
POSTGRES_PASSWORD=mvp_ecom_pass
POSTGRES_DB=product_service_db

# Redis

REDIS_HOST=localhost
REDIS_PORT=6379

# Kafka

KAFKA_BROKER=localhost:9092
KAFKA_CLIENT_ID=product-service
KAFKA_GROUP_ID=product-group

# MinIO

MINIO_ENDPOINT=localhost
MINIO_PORT=9000
MINIO_ACCESS_KEY=minio
MINIO_SECRET_KEY=minio123
MINIO_BUCKET_NAME=product-assets

# SMTP

SMTP_HOST=smtp.mailtrap.io
SMTP_PORT=2525
SMTP_USER=your_user
SMTP_PASS=your_pass

# JWT

JWT_SECRET=your_jwt_secret
JWT_EXPIRES_IN=1d

# ImageKit

IMAGEKIT_PUBLIC_KEY=your_public_key
IMAGEKIT_PRIVATE_KEY=your_private_key
IMAGEKIT_URL_ENDPOINT=https://ik.imagekit.io/yourid
🚀 Benefits
🧼 DRY and clean — Write config logic once, reuse everywhere

✅ Consistent — Standard format for all services

🔐 Secure — No accidental hardcoded secrets

🧪 Testable — Mock configs in tests easily

🧊 Cloud/Docker ready — Compatible with .env, Kubernetes envFrom, or Docker Compose

🔁 Pluggable — Easily switch between Redis Sentinel/Cluster, SMTP providers, etc.

🧠 Pro Tips
✅ Always load configs from @shared/config, not process.env.

🔐 Never commit .env to Git — use .env.example for reference.

🧪 For testing, mock the config in jest.setup.ts or inject fake env vars.
