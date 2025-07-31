# 🛒 Cart Service

Manages user shopping carts (session or logged-in).

## 🚀 Features

- Add/remove/update products
- Session/user scoped carts
- Redis-based storage
- Kafka emits cart events
- Swagger `/api/docs/cart`

## ⚙️ `.env`

```env
PORT=3006
DATABASE_URL=postgresql://mvp_ecom_user:mvp_ecom_pass@localhost:5432/cart_service_db
KAFKA_CLIENT_ID=cart-service
REDIS_HOST=localhost
```
