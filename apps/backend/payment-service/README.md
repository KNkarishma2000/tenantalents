---

## 📄 `apps/payment-service/README.md`

````md
# 💳 Payment Service

Handles payment gateway integration, invoicing (PDF via PDFKit), and Kafka events.

## 🚀 Features

- Payment intent & capture
- PDF invoice generation
- MinIO for storing invoices
- Kafka integration
- Swagger `/api/docs/payment`

## ⚙️ `.env`

```env
PORT=3005
DATABASE_URL=postgresql://mvp_ecom_user:mvp_ecom_pass@localhost:5432/payment_service_db
KAFKA_CLIENT_ID=payment-service
MINIO_ACCESS_KEY=minio
MINIO_SECRET_KEY=minio123
```
````
