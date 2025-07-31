---

## 📄 `apps/rating-service/README.md`

````md
# 🌟 Rating Service

Allows users to rate and review products.

## 🚀 Features

- Star ratings
- Review text/comments
- Kafka events for new ratings
- PostgreSQL + Prisma
- Redis cache
- Swagger `/api/docs/rating`

## ⚙️ `.env`

```env
PORT=3007
DATABASE_URL=postgresql://mvp_ecom_user:mvp_ecom_pass@localhost:5432/rating_service_db
KAFKA_CLIENT_ID=rating-service
```
````
