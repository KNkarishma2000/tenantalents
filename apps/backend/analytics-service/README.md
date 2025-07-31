# 📊 Analytics Service – Multi-Vendor E-Commerce Platform

The **Analytics Service** tracks platform usage, business metrics, and user behavior by consuming Kafka events from across services. It stores real-time logs and aggregated data used in admin dashboards, seller dashboards, and monitoring tools.

---

## 📌 Responsibilities

- ✅ Log platform-wide events (user registered, product viewed, order created, etc.)
- ✅ Aggregate key metrics (views, revenue, ratings, conversions)
- ✅ Power charts & insights in the admin and vendor dashboards
- ✅ Store JSON metadata for flexible analytics
- ✅ Index data for fast querying and filtering

---

## 🧱 Tech Stack

| Component       | Technology                    |
| --------------- | ----------------------------- |
| Framework       | Express.js + Nx Monorepo      |
| Database        | PostgreSQL (via Prisma ORM)   |
| Messaging Queue | Apache Kafka (event-driven)   |
| Auth            | JWT (via `@shared/auth`)      |
| Monitoring      | Prometheus + Grafana (future) |

---

## 📦 Kafka Event Consumers

| Kafka Topic       | Event Source     | Description                    |
| ----------------- | ---------------- | ------------------------------ |
| `user.registered` | `user-service`   | Logs user signup event         |
| `product.viewed`  | `search-service` | Logs product page views        |
| `order.created`   | `order-service`  | Tracks order count and revenue |
| `rating.updated`  | `rating-service` | Tracks seller/product ratings  |

> All events are consumed and logged into `EventLog` with type + metadata.

---

## 🧠 Prisma Schema Overview

### ✅ `EventLog`

Stores every tracked event with optional user and metadata.

```prisma
model EventLog {
  id         String   @id @default(uuid())
  eventType  String   @db.VarChar(100)
  userId     String?  @db.VarChar(255)
  metadata   Json?
  createdAt  DateTime @default(now())

  @@index([eventType])
  @@index([userId])
  @@map("event_logs")
}

✅ Metric

Stores key-value counters or indicators like view counts or seller revenue.

model Metric {
  id         String   @id @default(uuid())
  type       String   @unique @db.VarChar(100) // e.g. "product_views:123"
  value      Int?
  metadata   Json?
  createdAt  DateTime @default(now())

  @@index([type])
  @@map("metrics")
}

⚙️ Environment Variables (.env)

DATABASE_URL=postgresql://user:password@localhost:5432/analytics_service_db
KAFKA_BROKER=kafka:9092

🚀 Getting Started

# 1. Install dependencies
npm install

# 2. Generate Prisma client
npx prisma generate

# 3. Run migrations
npx prisma migrate dev --name init

# 4. Start the service
npm run start:dev

🔍 Sample API Endpoints
Method	Endpoint	Description
GET	/api/metrics/:type	Get value of a metric by type
GET	/api/events?type=product.viewed	Filter events by type
POST	/api/metrics/upsert	Update or insert a new metric (admin use)

    All APIs are protected with @shared/auth for JWT + RBAC.

📊 Example Metric Types

    product_views:<productId>

    daily_signups

    seller_revenue:<vendorId>

    conversion_rate:<vendorId>

🧠 Use Cases
Feature	Powered By
Seller dashboard metrics	Metric table
Admin usage charts	EventLog + filters
Product popularity rankings	product.viewed
Order stats per seller	order.created
🧭 Future Enhancements

Integrate with TimescaleDB for time-series charts

Add support for monthly aggregation jobs (cron)

Build Prometheus-compatible exporter

Anomaly detection using historical metrics

    Export logs to ClickHouse or BigQuery

📈 Dashboard Integration

The service will expose metrics via REST and later Prometheus endpoints to integrate with:

    📊 Grafana (admin dashboard)

    📦 Vendor Panel Stats (conversion rate, revenue)

    🚨 Alerting on sudden drops in usage or traffic

🧩 Related Services

    user-service – Sends user.registered

    search-service – Sends product.viewed

    order-service – Sends order.created

    rating-service – Sends rating.updated

```
