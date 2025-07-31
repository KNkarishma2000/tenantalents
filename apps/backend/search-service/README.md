---

## 📄 `apps/search-service/README.md`

````md
# 🔍 Search Service

Enables full-text and filtered search across product catalog.

## 🚀 Features

- Text + tag search
- Redis for caching hot queries
- Kafka listener for product updates
- Swagger `/api/docs/search`

## ⚙️ `.env`

```env
PORT=3003
KAFKA_CLIENT_ID=search-service
REDIS_HOST=localhost
```
````
