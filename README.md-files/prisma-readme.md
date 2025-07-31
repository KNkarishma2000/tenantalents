# 📦 Prisma ORM – Service Schema & Seeding

This folder contains the Prisma schema definition, migration history, and seed data for the current microservice.

---

## 📁 Contents

| File / Folder         | Purpose                                   |
| --------------------- | ----------------------------------------- |
| `schema.prisma`       | Prisma model definitions for this service |
| `migrations/`         | Auto-generated migration files            |
| `seed.ts`             | TypeScript script to seed the database    |
| `seed-<service>.json` | Sample data used by `seed.ts`             |

---

## 📜 Prisma Schema

Prisma defines the PostgreSQL schema for this microservice using:

- `generator client`: generates a typed Prisma client
- `datasource db`: points to your PostgreSQL database
- `model ...`: defines DB tables and relations

Run the following after changes:

````bash
pnpm --filter=<service-name> prisma generate
pnpm --filter=<service-name> prisma migrate dev --name init

Example for user-service:

pnpm --filter=user-service prisma migrate dev --name init

🌱 Seeding

Each service contains a seed script (seed.ts) and a corresponding JSON file (seed-<service>.json) to load mock data.
🔁 Run Seeder

pnpm --filter=<service-name> seed

📄 JSON File Format

Each service defines its own seed data shape based on its models. Examples:

    user-service: array of users

    order-service: object with orders and orderItems

    product-service: object with products and productListings

✅ Commands Summary
Task	Command
Generate Prisma Client	pnpm --filter=<service> prisma generate
Run Migrations	pnpm --filter=<service> prisma migrate dev --name <name>
Seed Data	pnpm --filter=<service> seed
Open Prisma Studio	pnpm --filter=<service> prisma studio
🗃️ Notes

    Each service has its own PostgreSQL DB (defined via .env)

    Seed data must match model constraints and FK requirements

    Seed scripts are idempotent-friendly (but may not dedupe)

    🔐 Prisma ensures type-safe, maintainable database access for each microservice in a modular, isolated schema design.


---

Would you like me to auto-generate this `README.md` for all your service folders as `apps/<service>/prisma/README.md`?

You said:
i will create it in root
ChatGPT said:

Perfect! Here's a tailored root-level Prisma README for your Nx Monorepo e-commerce platform:
📁 prisma-readme.md (Place in root of monorepo)

# 🧾 Prisma ORM – Multi-Service Schema & Seeding

This monorepo uses **Prisma** for type-safe ORM across **isolated PostgreSQL databases per microservice**.

---

## 🏗️ Architecture

Each microservice has:

- Its own `schema.prisma`
- Its own database (`DATABASE_URL` in `.env`)
- Its own `seed.ts` and `seed-<service>.json`
- Its own Prisma client via `@prisma/client`

Example folder:

apps/
user-service/
prisma/
schema.prisma
seed.ts
seed-user-service.json


---

## 🧬 Per-Service Isolation

Each service uses:

- ✅ Independent Prisma schema
- ✅ Dedicated DB (`<service>_service_db`)
- ✅ Scoped Prisma client generation
- ✅ Scoped seed logic and mock data

This enables clear **data ownership**, better **security**, and **microservice independence**.

---

## 🔁 Seeding a Service

Each service includes:

- `prisma/seed.ts`: Seed logic (reads `.json`)
- `prisma/seed-<service>.json`: Static data

### ✅ Run Seed

```bash
pnpm --filter=<service> seed

Example:

pnpm --filter=user-service seed
pnpm --filter=order-service seed

📦 Commands Reference
Task	Command
Generate Client	pnpm --filter=<service> prisma generate
Create Migration	pnpm --filter=<service> prisma migrate dev --name <name>
Run Seed	pnpm --filter=<service> seed
Open Studio	pnpm --filter=<service> prisma studio
📁 Seed File Naming Convention

    seed.ts: loads from seed-<service>.json

    JSON filenames follow:
    seed-user-service.json
    seed-order-service.json
    seed-rating-service.json

🧠 Shared Practices

    Use Decimal.js or Prisma.Decimal in numeric seeds

    Respect FK constraints (e.g., orderId must exist for orderItems)

    Add indexes and enums in schema for query optimization

📌 Services Using Prisma

✅ Includes Prisma in:

    user-service

    product-service

    order-service

    rating-service

    email-service

    payment-service

    search-service

    cart-service

    admin-service

    vendor-service

    invoice-service

    analytics-service

    🧠 Prisma brings type-safety, DX, and clear boundaries across your event-driven microservices.
````
✅ PostgreSQL Commands for Local Dev
🔍 View Databases
bash
Copy
Edit
psql -U mvp_ecom_user -h localhost -p 5432 -l
🔑 Connect to a Database
Replace ${SERVICE_DB_NAME} with actual DB name like user_db, vendor_db, etc.

bash
Copy
Edit
psql -U mvp_ecom_user -h localhost -p 5432 -d ${SERVICE_DB_NAME}
Examples:

bash
Copy
Edit
psql -U mvp_ecom_user -h localhost -p 5432 -d user_db
psql -U mvp_ecom_user -h localhost -p 5432 -d vendor_db
📦 Create All Service Databases (Manual)
bash
Copy
Edit
createdb -U mvp_ecom_user -h localhost -p 5432 user_db
createdb -U mvp_ecom_user -h localhost -p 5432 vendor_db
createdb -U mvp_ecom_user -h localhost -p 5432 product_db
createdb -U mvp_ecom_user -h localhost -p 5432 order_db
createdb -U mvp_ecom_user -h localhost -p 5432 payment_db
createdb -U mvp_ecom_user -h localhost -p 5432 cart_db
createdb -U mvp_ecom_user -h localhost -p 5432 rating_db
createdb -U mvp_ecom_user -h localhost -p 5432 admin_db
createdb -U mvp_ecom_user -h localhost -p 5432 invoice_db
createdb -U mvp_ecom_user -h localhost -p 5432 analytics_db
createdb -U mvp_ecom_user -h localhost -p 5432 email_db
createdb -U mvp_ecom_user -h localhost -p 5432 search_db
🔥 Drop a Service Database
bash
Copy
Edit
dropdb -U mvp_ecom_user -h localhost -p 5432 user_db
🧬 Prisma Migrations
✨ Migrate One Service
bash
Copy
Edit
cd apps/backend/user-service
npx prisma migrate dev --name init --schema=prisma/schema.prisma
🔄 Migrate All Services (Makefile-style)
Make sure .env has values for ${SERVICE_DB_NAME} before running.

bash
Copy
Edit
for service in user-service product-service order-service rating-service email-service payment-service search-service cart-service admin-service invoice-service analytics-service vendor-service; do
  echo "🔄 Migrating $service..."
  cd apps/backend/$service
  npx prisma migrate dev --name init --schema=prisma/schema.prisma || true
  cd - > /dev/null
done
📋 Sample .env Usage
If you’re using variables like ${VENDOR_DB_NAME}, ensure they're defined before usage:

env
Copy
Edit
VENDOR_DB_NAME=vendor_db
Otherwise, interpolation won’t work and you'll get:

perl
Copy
Edit
ERROR: zero-length delimited identifier at or near """"
🧪 Test via Prisma CLI

npx prisma db pull --schema=apps/backend/user-service/prisma/schema.prisma
npx prisma studio --schema=apps/backend/user-service/prisma/schema.prisma
