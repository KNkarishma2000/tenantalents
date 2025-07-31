#!/bin/bash

# Define list of services
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

SWAGGER_REF='{ "path": "../../libs/shared/swagger" }'
SWAGGER_INCLUDE='"../../libs/shared/swagger/**/*"'

for service in "${services[@]}"; do
  tsconfig="apps/$service/tsconfig.json"

  if [ ! -f "$tsconfig" ]; then
    echo "❌ $tsconfig not found. Skipping..."
    continue
  fi

  echo "🔧 Modifying $tsconfig"

  # Add swagger reference if not present
  if ! grep -q '"path": "../../libs/shared/swagger"' "$tsconfig"; then
    tmp=$(mktemp)
    jq --argjson ref "$SWAGGER_REF" \
      '.references += [$ref]' "$tsconfig" > "$tmp" && mv "$tmp" "$tsconfig"
  fi

  # Add swagger include if not present
  if ! grep -q "$SWAGGER_INCLUDE" "$tsconfig"; then
    tmp=$(mktemp)
    jq --arg inc "$SWAGGER_INCLUDE" \
      '.include += [$inc]' "$tsconfig" > "$tmp" && mv "$tmp" "$tsconfig"
  fi

  echo "✅ Updated $tsconfig"
done
