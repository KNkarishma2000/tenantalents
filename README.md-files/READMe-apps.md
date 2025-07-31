📁 apps/README.md

# 🛒 Nx Monorepo E-Commerce Platform

This directory contains all microservices, gateway, and supporting systems for the **MVP e-commerce platform** built using a modular, event-driven architecture.

---

## 📦 Services Overview

| Service Name        | Port | Description                                             |
| ------------------- | ---- | ------------------------------------------------------- |
| `user-service`      | 3000 | Handles user registration, login, JWT auth, and roles   |
| `product-service`   | 3001 | Manages product catalog, categories, and inventory      |
| `order-service`     | 3002 | Processes customer orders and order lifecycle           |
| `rating-service`    | 3007 | Users rate and review products                          |
| `email-service`     | 3004 | Sends OTPs, order confirmations via SMTP                |
| `payment-service`   | 3005 | Integrates with mock payment provider                   |
| `search-service`    | 3003 | Handles keyword search (future: ElasticSearch)          |
| `cart-service`      | 3006 | Manages cart items and syncing with products            |
| `admin-service`     | 3014 | Admin-only management UI/API (users, vendors, products) |
| `invoice-service`   | 3015 | Generates downloadable invoices for orders              |
| `analytics-service` | 3016 | Provides dashboard metrics and analytics APIs           |
| `vendor-service`    | 3008 | Handles vendor onboarding, approval, analytics          |

---

## 📦 Post-MVP Services

| Service Name             | Port | Description                                          |
| ------------------------ | ---- | ---------------------------------------------------- |
| `cms-service`            | 3011 | Manages dynamic content pages (banners, about, etc.) |
| `coupon-service`         | 3010 | Handles coupons, promo codes, and discounts          |
| `refund-service`         | 3012 | Processes refund requests and admin approvals        |
| `recommendation-service` | 3013 | Returns personalized product recommendations         |

---

## 🌐 API Gateway

| Service Name       | Description                              |
| ------------------ | ---------------------------------------- |
| `kong-API-gateway` | Open-source gateway for routing and auth |

---

## 🗂 Directory Structure (Simplified)

apps/
├── [service-name]/
│ ├── src/
│ │ ├── app/
│ │ │ ├── controllers/
│ │ │ ├── routes/
│ │ │ ├── services/
│ │ │ ├── docs/
│ │ │ └── ...
│ │ ├── app.ts
│ │ └── main.ts
│ ├── prisma/
│ │ ├── schema.prisma
│ │ ├── seed.ts
│ │ └── seed-\*.json
│ ├── README.md
│ └── project.json

---

## 🧪 Development

### 🛠 Run a Service

```bash
pnpm nx serve [service-name]

Example:

pnpm nx serve user-service

🧬 Seed Data

pnpm exec prisma db seed --schema=apps/[service-name]/prisma/schema.prisma

📚 API Documentation

Swagger is enabled per service at:

http://localhost:[port]/api/docs/[service-name]

Example:

http://localhost:3000/api/docs/user

⚙️ Technologies

    Node.js (Express)

    Prisma (PostgreSQL ORM)

    Kafka (via KRaft, no Zookeeper)

    Redis Sentinel

    MinIO (for vendor uploads)

    Docker + Kubernetes (Kind)

    Helm Charts

    GitHub Actions CI/CD

    Prometheus + Grafana + Loki + Jaeger

    Trivy + Falco (Security)

    Keycloak + OAuth2 Proxy (RBAC, Auth)

🧭 Service Dependencies

    All services share .env-based config and use centralized shared libs (@shared/...) for:

        logger, config, kafka, redis, swagger, auth, errorHandler, utils

✅ Preview & Deployment

    Frontend: Next.js (deployed via Vercel)

    Backend: Deployed via Helm on Kind cluster (can switch to real cloud via Terraform later)

    Images stored on ImageKit

    Domains managed via Cloudflare

📋 Checklist

Dockerized all services

Helm charts per service

CI pipeline for affected apps

Preview environments on PRs

Monitoring, tracing, and logging via OSS stack

Trivy security scans

Graceful shutdowns and health checks

    Post-MVP services scaffolded

🧠 Contributions

Please commit services with proper structure:

controller/ → route → service → Kafka/Redis → DB

And add Swagger annotations + seeders.
```
