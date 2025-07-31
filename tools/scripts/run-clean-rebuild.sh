#!/bin/bash

set -e  # Exit immediately if a command exits with a non-zero status

echo "🔄 Cleaning dist & tmp folders..."
rm -rf dist tmp

echo "🧹 Resetting Nx cache..."
npx nx reset

echo "🧼 Removing TypeScript build artifacts (.tsbuildinfo, .d.ts, .js)..."
find . \
  -type d -name 'node_modules' -prune -false \
  -o -type f \( -name '*.tsbuildinfo' -o -name '*.d.ts' -o -name '*.js' \) \
  -print -delete

echo "📦 Reinstalling dependencies..."
rm -rf node_modules package-lock.json
npm install

echo "🚧 Rebuilding all projects using Nx..."
npx nx run-many --target=build --all

echo "✅ Clean and rebuild complete!"
