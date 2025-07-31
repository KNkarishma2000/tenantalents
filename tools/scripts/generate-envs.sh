#!/bin/bash

# Shared configurations
KAFKA_BROKERS="localhost:9092"
REDIS_HOST="localhost"
REDIS_PORT="26379"
REDIS_SENTINEL_NAME="myredis"
REDIS_PASSWORD="redis_pass"

MINIO_ENDPOINT="http://localhost:9000"
MINIO_ACCESS_KEY="minio"
MINIO_SECRET_KEY="minio123"
MINIO_BUCKET="images"

JWT_SECRET="psyrim3ReSNikbVHwq/R624osFaIpjxGjt8HxNqUFAg="

# SendGrid SMTP credentials
SMTP_HOST="smtp.sendgrid.net"
SMTP_PORT="587"
SMTP_USER="apikey"
SMTP_PASS="A2ZS5PXY3LGLEP2TGMWXC1UX"
EMAIL_FROM="noreply@ecommerce.com"

# List of services and their ports
declare -A services=(
  [user-service]=3000
  [product-service]=3001
  [order-service]=3002
  [rating-service]=3003
  [email-service]=3004
  [payment-service]=3005
  [search-service]=3006
  [cart-service]=3007
  [admin-service]=3008
  [invoice-service]=3009
  [analytics-service]=3010
  [vendor-service]=3011
)

for service in "${!services[@]}"; do
  port=${services[$service]}
  db_name="${service//-/_}_db"
  db_url="postgresql://mvp_ecom_user:mvp_ecom_pass@localhost:5432/$db_name"

  kafka_client_id="${service}-client"
  kafka_group_id="${service}-group"

  env_file="apps/backend/$service/.env"
  mkdir -p "apps/backend/$service"

  echo "Writing $env_file"

  cat > "$env_file" <<EOF
# 🌐 Shared
KAFKA_BROKERS=$KAFKA_BROKERS

REDIS_HOST=$REDIS_HOST
REDIS_PORT=$REDIS_PORT
REDIS_SENTINEL_NAME=$REDIS_SENTINEL_NAME
REDIS_PASSWORD=$REDIS_PASSWORD

MINIO_ENDPOINT=$MINIO_ENDPOINT
MINIO_ACCESS_KEY=$MINIO_ACCESS_KEY
MINIO_SECRET_KEY=$MINIO_SECRET_KEY
MINIO_BUCKET=$MINIO_BUCKET

JWT_SECRET=$JWT_SECRET

# 📦 $service
PORT=$port
SERVICE_NAME=$service
DATABASE_URL=$db_url
KAFKA_CLIENT_ID=$kafka_client_id
KAFKA_GROUP_ID=$kafka_group_id
EOF

  # Add SMTP settings for email-service
  if [[ "$service" == "email-service" ]]; then
    cat >> "$env_file" <<EOF

# 📧 SendGrid SMTP (Email)
SMTP_HOST=$SMTP_HOST
SMTP_PORT=$SMTP_PORT
SMTP_USER=$SMTP_USER
SMTP_PASS=$SMTP_PASS
EMAIL_FROM=$EMAIL_FROM
EOF
  fi

done

echo "✅ All .env files created in apps/backend/$service/.env"
