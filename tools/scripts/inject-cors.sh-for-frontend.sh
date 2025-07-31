#!/bin/bash

# List of all microservices
services=(
  user-service
  product-service
  order-service
  rating-service
  email-service
  payment-service
  search-service
  cart-service
  admin-service
  invoice-service
  analytics-service
  vendor-service
)

echo "📦 Injecting CORS setup into app.ts files..."

for service in "${services[@]}"; do
  app_ts="apps/$service/src/app.ts"

  if [ -f "$app_ts" ]; then
    echo "🔧 Updating $app_ts..."

    # 1. Inject import line
    sed -i "/^import express from 'express';/a import cors from 'cors';" "$app_ts"

    # 2. Insert app.use(cors(...)) after app.set or app initialization
    sed -i "/const app = express();/a\n\n// 🌐 Enable CORS for frontend integration\napp.use(cors({\n  origin: process.env.FRONTEND_URL || 'http://localhost:3000',\n  credentials: true,\n}));" "$app_ts"
  else
    echo "⚠️ File not found: $app_ts"
  fi
done

echo "✅ Done injecting CORS support into all services."
