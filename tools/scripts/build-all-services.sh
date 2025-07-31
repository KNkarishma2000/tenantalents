#!/bin/bash

services=(
  "user-service"
  "product-service"
  "order-service"
  "rating-service"
  "email-service"
  "payment-service"
  "search-service"
  "cart-service"
  "admin-service"
  "invoice-service"
  "analytics-service"
  "vendor-service"
)

echo "🔧 Building all services..."

for service in "${services[@]}"; do
  tsconfig_path="apps/$service"
  if [ -f "$tsconfig_path/tsconfig.json" ]; then
    echo "🚀 Building $service..."
    npx tsc --build "$tsconfig_path"
  else
    echo "❌ Skipping $service (tsconfig.json not found)"
  fi
done

echo "✅ All builds complete."
