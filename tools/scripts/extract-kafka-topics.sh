#!/bin/bash

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

BROKER="localhost:9092"
DOCKER_KAFKA_CONTAINER="kafka"

echo "🔍 Extracting Kafka topics from libs/shared/kafka/src/lib/kafka-topics.ts..."

TOPICS=$("$SCRIPT_DIR/extract-kafka-topics.sh")

if [[ -z "$TOPICS" ]]; then
  echo "❌ No Kafka topics found. Exiting."
  exit 1
fi

echo "📡 Creating Kafka topics..."

while IFS= read -r TOPIC; do
  echo "➡️ Creating topic: $TOPIC"
  docker exec -i "$DOCKER_KAFKA_CONTAINER" kafka-topics.sh \
    --bootstrap-server "$BROKER" \
    --create --if-not-exists \
    --topic "$TOPIC" \
    --partitions 1 \
    --replication-factor 1
done <<< "$TOPICS"

echo "✅ All topics processed."
