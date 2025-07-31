#!/bin/bash

# List of all services
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

echo "🔄 Updating swagger-tags.ts files..."

for service in "${services[@]}"; do
  base_name="${service/-service/}"                  # Strip '-service'
  pascal_name="$(tr '[:lower:]' '[:upper:]' <<< ${base_name:0:1})${base_name:1}"  # Capitalize
  path="apps/$service/src/app/swagger-tags.ts"

  # Create or overwrite the file
  cat <<EOF > "$path"
export const tags = [
  {
    name: '${base_name}',
    description: 'Endpoints related to ${base_name}',
  },
];
EOF

  echo "✅ Updated: $path"
done

echo "🎉 All swagger-tags.ts files updated."
