#!/bin/bash

set -e  # Exit immediately on error

# Array of services with matching Nx names and Docker context folders
services=(
  "user-service"
  "product-service"
  "order-service"
  "search-service"
  "email-service"
  "payment-service"
  "cart-service"
  "rating-service"
)

echo "🔨 Building services with Nx and Dockerizing..."

for service in "${services[@]}"; do
  echo ""
  echo "🚧 Building ${service} with Nx..."
  npx nx build "$service"

  echo "🐳 Building Docker image for ${service}..."
  docker build -t "${service}:latest" -f "apps/${service}/Dockerfile" .

  echo "✅ Done: ${service}"
done

echo ""
echo "🎉 All services built and dockerized successfully!"
