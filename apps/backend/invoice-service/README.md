📄 apps/invoice-service/README.md

# 🧾 Invoice Service

The **Invoice Service** handles PDF invoice generation, storage, and secure delivery for buyer orders. Invoices are stored in **MinIO**, and can be retrieved securely via pre-signed URLs.

---

## 📦 Features

- 🧾 Generate and store invoices in MinIO
- 🔐 JWT-based auth with RBAC (via `@shared/auth`)
- 🌐 REST API with Express
- 🗃️ PostgreSQL via Prisma ORM
- 📥 Kafka support for order events
- ⚙️ Redis caching support
- 📚 OpenAPI (Swagger) documentation
- 🧪 Seed script with mock data

---

## 🚀 Tech Stack

| Layer   | Tech                            |
| ------- | ------------------------------- |
| API     | Express.js                      |
| Auth    | JWT (via `@shared/auth`)        |
| DB      | PostgreSQL + Prisma             |
| Storage | MinIO (S3-compatible)           |
| Queue   | Kafka (via `@shared/kafka`)     |
| Cache   | Redis (via `@shared/redis`)     |
| Docs    | Swagger (via `@shared/swagger`) |

---

## 🧰 Environment Variables

`.env` example (referenced from root):

```env
PORT=3011
DATABASE_URL=postgresql://mvp_ecom_user:mvp_ecom_pass@localhost:5432/invoice_service_db
JWT_SECRET=super_secret_jwt
MINIO_ENDPOINT=localhost
MINIO_PORT=9000
MINIO_ACCESS_KEY=minio
MINIO_SECRET_KEY=minio123

🔗 API Endpoints
Method	Endpoint	Description
POST	/api/invoice/manual/:orderId	Generate invoice and upload to MinIO
POST	/api/invoice/upload/:userId/:orderId	Upload legacy/manual invoice PDF
GET	/api/invoice/download-url/:userId/:orderId	Get secure pre-signed URL
GET	/healthz	Health check
GET	/api/docs/invoice	Swagger UI
🔐 Auth & RBAC

    Protected using @shared/auth

    Auth header: Authorization: Bearer <jwt>

    Roles enforced: admin, super_admin, vendor (for internal upload)

    Optional auth allowed for pre-signed downloads (buyer side)

🧾 Invoice File Format

    Stored as PDF in MinIO

    Path pattern: invoices/pdf/{userId}/{orderId}.pdf

    Bucket: invoice-files

🧪 Seeding
Seed Data File

apps/invoice-service/prisma/seed-data.json

Run Seeder

pnpm --filter=invoice-service seed

    ⚠️ Make sure the referenced orderId exists in the DB.

📦 Swagger UI

http://localhost:3011/api/docs/invoice

Includes OpenAPI-compliant documentation of all endpoints.
🧼 Lint, Format, Build

pnpm lint --filter=invoice-service
pnpm format --filter=invoice-service
pnpm build --filter=invoice-service

🐳 Docker (Used in Nx Monorepo)

# Build image
docker build -t invoice-service:latest .

# Run locally
docker run -p 3011:3011 --env-file .env invoice-service:latest

🔄 Kafka Event Plan (Future)

    Planned: Listen to order-created Kafka topic and auto-generate invoice.

👩‍💻 Maintainers

    🧠 Shared libs from @shared/* are used for:

        Auth (JWT/OAuth)

        Redis/Kafka

        Logger, Swagger, Error handler

✅ Status
Item	Status
REST API	✅ Done
MinIO integration	✅ Done
PDFKit generation	✅ Done
Swagger UI	✅ Done
Kafka listener	🟡 Todo
Auth Middleware	✅ Done
Seed script	✅ Done
📁 Folder Structure

invoice-service/
├── src/
│   ├── controllers/
│   ├── routes/
│   ├── services/
│   ├── kafka/
│   ├── app.ts
│   └── main.ts
├── prisma/
│   ├── schema.prisma
│   ├── seed.ts
│   └── seed-data.json
└── README.md

    🔐 This service ensures secure and compliant invoice storage across your e-commerce platform.
```
