#!/bin/bash

DATABASES=(
  user_service_db
  product_service_db
  order_service_db
  rating_service_db
  email_service_db
  payment_service_db
  search_service_db
  cart_service_db
  admin_service_db
  invoice_service_db
  analytics_service_db
  vendor_service_db
)

echo "🧨 Dropping and recreating all databases..."
for DB in "${DATABASES[@]}"; do
  echo "🔥 Dropping database: $DB"
  docker exec -i postgres-mvp psql -U postgres -c "DROP DATABASE IF EXISTS $DB;"
  
  echo "📦 Creating database: $DB"
  docker exec -i postgres-mvp psql -U postgres -c "CREATE DATABASE $DB;"
done

echo "✅ All databases dropped and recreated."
