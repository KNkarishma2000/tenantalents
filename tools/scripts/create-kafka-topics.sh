#!/bin/bash

# Path to Kafka CLI inside container
KAFKA_BIN="/opt/bitnami/kafka/bin/kafka-topics.sh"
BROKER="localhost:9092"
CONTAINER_NAME="kafka"

echo "🌀 Creating Kafka topics..."

# Extract topics using grep/regex (simple version)
TOPICS=$(grep -oP "'[^']+'" libs/shared/kafka/src/lib/kafka-topics.ts | tr -d "'")

for TOPIC in $TOPICS; do
  echo "🛠 Creating topic: $TOPIC"
  docker exec $CONTAINER_NAME $KAFKA_BIN \
    --bootstrap-server $BROKER \
    --create \
    --topic "$TOPIC" \
    --partitions 3 \
    --replication-factor 1 \
    --if-not-exists
done

echo "✅ All topics created!"
