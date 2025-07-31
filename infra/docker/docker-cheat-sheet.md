🧰 Tools (Redis, Kafka, MinIO, Swagger, etc.)

# Restart tools only (force remove existing containers and start fresh)
docker compose -f docker-compose.tools.yml down --remove-orphans \
  && docker rm -f redis kafka minio swagger 2>/dev/null || true \
  && docker compose -f docker-compose.tools.yml up -d


# Standard up/down for tools
postgres
docker compose -f infra/docker/docker-compose.yaml up -d
docker compose -f infra/docker/docker-compose.yaml down

tools
docker compose -f infra/docker/docker-compose.tools.yml up -d
docker compose -f infra/docker/docker-compose.tools.yml down





docker-compose down -v --remove-orphans --rmi local
docker-compose up -d kafka kafka-ui


🚀 Run All Services Together (from infra/docker)

cd infra/docker \
  && docker compose -f docker-compose.tools.yml -f docker-compose.services.yml up -d --build
🔧 Run Individually
✅ Tools Only
docker compose -f docker-compose.tools.yml up -d

✅ Services Only
docker compose -f docker-compose.services.yml up -d

✅ Monitoring Only
docker compose -f docker-compose.monitoring.yml --env-file .env up -d
Or, absolute path to .env:

docker compose --env-file infra/docker/.env -f docker-compose.monitoring.yml up -d

🧹 Clean Up Everything

# Stop and remove all containers, networks, volumes, and images
docker compose down -v --remove-orphans
docker system prune -a --volumes
🔄 Rebuild & Restart All

docker compose -f docker-compose.tools.yml -f docker-compose.services.yml --env-file infra/docker/.env down --remove-orphans \
  && docker compose -f docker-compose.tools.yml -f docker-compose.services.yml --env-file infra/docker/.env up -d --build
