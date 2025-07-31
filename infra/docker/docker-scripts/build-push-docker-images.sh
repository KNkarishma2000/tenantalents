#!/bin/bash

# Exit on any error
set -e

REGISTRY="your-dockerhub-username"     # 🔁 Change to your Docker Hub org/username
VERSION="v1.0.0"                        # 🔁 Set your release version (e.g. from Git tag or env var)

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

echo "🔐 Logging in to Docker Hub..."
docker login

echo ""
echo "🚧 Building and testing services..."

for service in "${services[@]}"; do
  echo "📦 nx build $service"
  nx build "$service"

  echo "🐳 Building Docker image for $service..."
  docker build -t "$service:latest" -f "apps/$service/Dockerfile" .

  echo "🧪 Running $service container for test..."

  case $service in
    user-service) port=3000 ;;
    product-service) port=3001 ;;
    order-service) port=3002 ;;
    search-service) port=3003 ;;
    email-service) port=3004 ;;
    payment-service) port=3005 ;;
    cart-service) port=3006 ;;
    rating-service) port=3007 ;;
    *) echo "❌ Unknown service: $service" && exit 1 ;;
  esac

  docker run -d --rm --name "test-$service" -p "$port:$port" "$service:latest"
  sleep 3
  docker stop "test-$service"
done

echo ""
echo "📤 Tagging and pushing images with version: $VERSION"

for service in "${services[@]}"; do
  # Tag with version and latest
  docker tag "$service:latest" "$REGISTRY/$service:$VERSION"
  docker tag "$service:latest" "$REGISTRY/$service:latest"

  # Push both
  docker push "$REGISTRY/$service:$VERSION"
  docker push "$REGISTRY/$service:latest"
done

echo "✅ All images built, tested, tagged with '$VERSION', and pushed to $REGISTRY!"
