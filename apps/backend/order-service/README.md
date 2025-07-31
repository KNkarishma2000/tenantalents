---

## 📄 `apps/order-service/README.md`

````md
# 📦 Order Service

Handles order placement, status updates, payments, and Kafka coordination.

## 🚀 Features

- Order lifecycle (placed → paid → shipped)
- Kafka: `order.placed`, `order.updated`
- PostgreSQL + Prisma
- Swagger UI: `/api/docs/order`

## ⚙️ `.env`

```env
PORT=3002
DATABASE_URL=postgresql://mvp_ecom_user:mvp_ecom_pass@localhost:5432/order_service_db
KAFKA_CLIENT_ID=order-service
REDIS_HOST=localhost
REDIS_PORT=6379
```
````
