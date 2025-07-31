#!/bin/bash

# Base path
BASE_DIR="apps/backend"
DIST_DIR="dist/out-tsc"

echo "Updating tsconfig.json files in $BASE_DIR/*..."

for SERVICE_DIR in "$BASE_DIR"/*; do
  if [ -d "$SERVICE_DIR" ]; then
    TSCONFIG="$SERVICE_DIR/tsconfig.json"
    SERVICE_NAME=$(basename "$SERVICE_DIR")

    if [ -f "$TSCONFIG" ]; then
      echo "Patching $TSCONFIG..."

      cat > "$TSCONFIG" <<EOF
{
  "extends": "../../../../tsconfig.base.json",
  "compilerOptions": {
    "rootDir": "src",
    "outDir": "../../../../$DIST_DIR/$SERVICE_NAME",
    "baseUrl": ".",
    "paths": {
      "@shared/*": ["../../../../libs/shared/*"]
    }
  },
  "include": [
    "src/**/*",
    "../../../../libs/shared/**/*"
  ],
  "exclude": ["node_modules", "dist"]
}
EOF

    else
      echo "⚠️ Skipping $SERVICE_DIR — tsconfig.json not found."
    fi
  fi
done

echo "✅ All tsconfig.json files updated."
