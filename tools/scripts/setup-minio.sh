#!/bin/bash

# Exit on error
set -e

# Configuration
MINIO_CONTAINER_NAME="minio-server"
MINIO_ACCESS_KEY="minio"
MINIO_SECRET_KEY="minio123"
MINIO_PORT="9000"
MINIO_CONSOLE_PORT="9001"
MINIO_BUCKET_NAME="vendor-bucket"

# Start MinIO Docker container
echo "🚀 Starting MinIO container..."
docker run -d --rm \
  --name $MINIO_CONTAINER_NAME \
  -p $MINIO_PORT:9000 -p $MINIO_CONSOLE_PORT:9001 \
  -e MINIO_ROOT_USER=$MINIO_ACCESS_KEY \
  -e MINIO_ROOT_PASSWORD=$MINIO_SECRET_KEY \
  quay.io/minio/minio server /data --console-address ":${MINIO_CONSOLE_PORT}"

sleep 5

# Download and install mc (MinIO client)
if ! command -v mc &> /dev/null; then
  echo "📦 Installing MinIO Client (mc)..."
  curl -s https://dl.min.io/client/mc/release/linux-amd64/mc -o mc
  chmod +x mc
  sudo mv mc /usr/local/bin/mc
else
  echo "✅ mc is already installed"
fi

# Add local MinIO alias
echo "🔧 Configuring mc alias..."
mc alias set local http://localhost:$MINIO_PORT $MINIO_ACCESS_KEY $MINIO_SECRET_KEY

# Create bucket
echo "🪣 Creating bucket: $MINIO_BUCKET_NAME..."
mc mb local/$MINIO_BUCKET_NAME || echo "⚠️ Bucket already exists"

# List all buckets
echo "📂 Listing all buckets:"
mc ls local

echo "✅ MinIO setup complete"
echo "🔗 Web console: http://localhost:$MINIO_CONSOLE_PORT"
