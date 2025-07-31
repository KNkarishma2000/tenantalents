# ====================== 🧭 GENERAL ======================
help: ## Show all available commands
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-25s\033[0m %s\n", $$1, $$2}'

dev: ## Run all core + post-MVP services
	make all-services

start-service-%: ## Start a specific service by name (e.g. make start-service-user-service)
	npx nx serve $*

nx-graph: ## Show Nx project dependency graph
	npx nx graph


# ==================== ✅ CODE QUALITY ====================
lint: ## Run ESLint across all services
	npx nx run-many --target=lint --all

test: ## migrateRun all unit tests with Jest
	npx nx run-many --target=test --all

build: ## Build all services
	npx nx run-many --target=build --all


# ==================== 🧠 PRISMA & DB ====================
PRISMA_SERVICES := user-service vendor-service product-service order-service payment-service invoice-service cart-service rating-service search-service analytics-service admin-service email-service

prisma-: ## Apply Prisma migrations for all Prisma services
	@for service in $(PRISMA_SERVICES); do \
		SCHEMA_PATH=apps/backend/$$service/prisma/schema.prisma; \
		if [ -f $$SCHEMA_PATH ]; then \
			echo "🚀 Migrating $$service..."; \
			cd apps/backend/$$service && \
			npx prisma migrate dev --name init --schema=prisma/schema.prisma || echo "⚠️  Migration failed for $$service"; \
			cd - >/dev/null; \
		else \
			echo "❌ Skipping $$service: No schema.prisma found."; \
		fi \
	done

# Apply Prisma migrations for all services with a Prisma schema
prisma-migrate: ## 🔄 Apply Prisma migrations
	@PRISMA_SERVICES="user-service product-service order-service payment-service vendor-service invoice-service admin-service" && \
	for service in $$PRISMA_SERVICES; do \
		echo "🚀 Migrating $$service..."; \
		cd apps/backend/$$service && \
		if [ -f .env ]; then \
			echo "📦 Loading environment for $$service"; \
			set -a; source .env; set +a; \
		fi && \
		npx prisma migrate dev --name init --schema=prisma/schema.prisma || true; \
		cd - >/dev/null; \
	done

prisma-generate: ## Generate Prisma clients for all Prisma services
	@for service in $(PRISMA_SERVICES); do \
		if [ -f apps/backend/$$service/prisma/schema.prisma ]; then \
			echo "🔧 Generating client for $$service..."; \
			cd apps/backend/$$service && \
			npx prisma generate --schema=prisma/schema.prisma; \
			cd - >/dev/null; \
		fi \
	done

prisma-seed seed: ## Seed all services with seed.ts (if exists)
	@for service in $(PRISMA_SERVICES); do \
		SEED_FILE=apps/backend/$$service/prisma/seed.ts; \
		if [ -f $$SEED_FILE ]; then \
			echo "🌱 Seeding $$service..."; \
			cd apps/backend/$$service && \
			npx tsx prisma/seed.ts; \
			cd - >/dev/null; \
		else \
			echo "❌ No seed.ts for $$service"; \
		fi \
	done

prisma-studio: ## Open Prisma Studio for user-service
	cd apps/backend/user-service && npx prisma studio

check-readiness: ## Check if all backend services are ready
	@curl -s http://localhost:3000/health || echo "🛑 Service not ready"


# ==================== 🐳 DOCKER ====================
docker-build: ## Build Docker images for all services
	docker compose build

docker-push: ## Push Docker images to registry
	docker compose push

docker-clean: ## Remove local Docker images for all services
	docker image prune -af


# ========== 🏗️ INFRASTRUCTURE (Docker Compose) ==========
infra-up: ## Start infrastructure stack (Postgres, Redis, Kafka, MinIO, etc.)
	docker compose up -d postgres redis kafka minio zookeeper

infra-down: ## Stop infrastructure containers
	docker compose down

infra-restart: ## Restart infra containers
	make infra-down && make infra-up

postgres-init: ## Reinitialize Postgres volumes
	docker volume rm tentalents_postgres_data || true
	make infra-up


# ========== ☸️ KUBERNETES (kind + Helm) ==========
kind-start: ## Start local kind cluster
	kind create cluster --name tentalents --config=infra/kind/kind-config.yaml

kind-delete: ## Delete kind cluster
	kind delete cluster --name tentalents

load-images: ## Load built Docker images into kind
	@for service in $(PRISMA_SERVICES); do \
		kind load docker-image tentalents/$$service; \
	done


helm-init: ## Add/update Helm repositories
	helm repo add bitnami https://charts.bitnami.com/bitnami
	helm repo update

helm-deploy: ## Deploy all services via Helm
	helm upgrade --install tentalents ./infra/helm

helm-destroy: ## Uninstall Helm releases
	helm uninstall tentalents

helmfile-sync: ## Sync Helm deployments using helmfile.yaml
	helmfile -f infra/helm/helmfile.yaml sync


# ========== 📊 OBSERVABILITY ==========
monitor-start: ## Start observability stack (Prometheus, Grafana, Loki, Jaeger)
	docker compose up -d prometheus grafana loki jaeger

monitor-stop: ## Stop observability services
	docker compose stop prometheus grafana loki jaeger

jaeger-ui: ## Port forward Jaeger UI (localhost:16686)
	kubectl port-forward svc/jaeger 16686:16686 -n observability

grafana-ui: ## Port forward Grafana UI (localhost:3000)
	kubectl port-forward svc/grafana 3000:3000 -n observability


# ========== 📄 LOGGING ==========
logs-%: ## Tail logs from a service pod
	kubectl logs -f deployment/$*


# ========== 🔐 SECURITY ==========
scan-images: ## Scan Docker images with Trivy
	@for service in $(PRISMA_SERVICES); do \
		trivy image tentalents/$$service; \
	done

falco-install: ## Install Falco for runtime security
	helm repo add falcosecurity https://falcosecurity.github.io/charts
	helm repo update
	helm install falco falcosecurity/falco

falco-uninstall: ## Uninstall Falco
	helm uninstall falco


# ========== 🎯 NX AFFECTED COMMANDS ==========
affected: ## Show affected Nx projects
	npx nx show projects --affected

affected-build: ## Build only affected projects
	npx nx affected --target=build

affected-lint: ## Lint only affected projects
	npx nx affected --target=lint

affected-test: ## Test only affected projects
	npx nx affected --target=test

affected-deploy: ## Build + push + deploy affected
	make affected-build && make docker-push && make helm-deploy


# ========== 🚀 CI/CD SHORTCUTS ==========
ci: ## Run lint + test + build
	make lint && make test && make build

deploy: ## Build, push and deploy all
	make docker-build && make docker-push && make helm-deploy

reset: ## Full clean, rebuild and redeploy
	make docker-clean && make kind-delete && make kind-start && make deploy


# ========== 👟 SERVICE STARTERS ==========
user-service: ## Start user-service
	npx nx serve user-service

product-service:
	npx nx serve product-service

order-service:
	npx nx serve order-service

payment-service:
	npx nx serve payment-service

invoice-service:
	npx nx serve invoice-service

vendor-service:
	npx nx serve vendor-service

analytics-service:
	npx nx serve analytics-service

admin-service:
	npx nx serve admin-service

search-service:
	npx nx serve search-service

cart-service:
	npx nx serve cart-service

rating-service:
	npx nx serve rating-service

email-service:
	npx nx serve email-service

core-services: ## Start all core services concurrently
	npx concurrently \
		"npx nx serve user-service" \
		"npx nx serve product-service" \
		"npx nx serve order-service" \
		"npx nx serve rating-service" \
		"npx nx serve email-service" \
		"npx nx serve payment-service" \
		"npx nx serve search-service" \
		"npx nx serve cart-service" \
		"npx nx serve admin-service" \
		"npx nx serve invoice-service" \
		"npx nx serve analytics-service" \
		"npx nx serve vendor-service"

post-mvp-services: ## Start additional post-MVP services
	npx concurrently \
		"npx nx serve coupon-service" \
		"npx nx serve refund-service" \
		"npx nx serve cms-service" \
		"npx nx serve recommendation-service"

all-services: ## Start all services
	make core-services & make post-mvp-services


# === 🔁 Run Prisma Migrations For All Services ===

# USER
migrate-user:
	DATABASE_URL=postgresql://mvp_ecom_user:mvp_ecom_pass@localhost:5432/user_service_db npx prisma migrate dev --schema=apps/backend/user-service/prisma/schema.prisma

# PRODUCT
migrate-product:
	DATABASE_URL=postgresql://mvp_ecom_user:mvp_ecom_pass@localhost:5432/product_service_db npx prisma migrate dev --schema=apps/backend/product-service/prisma/schema.prisma

# ORDER
migrate-order:
	DATABASE_URL=postgresql://mvp_ecom_user:mvp_ecom_pass@localhost:5432/order_service_db npx prisma migrate dev --schema=apps/backend/order-service/prisma/schema.prisma

# RATING
migrate-rating:
	DATABASE_URL=postgresql://mvp_ecom_user:mvp_ecom_pass@localhost:5432/rating_service_db npx prisma migrate dev --schema=apps/backend/rating-service/prisma/schema.prisma

# EMAIL
migrate-email:
	DATABASE_URL=postgresql://mvp_ecom_user:mvp_ecom_pass@localhost:5432/email_service_db npx prisma migrate dev --schema=apps/backend/email-service/prisma/schema.prisma

# PAYMENT
migrate-payment:
	DATABASE_URL=postgresql://mvp_ecom_user:mvp_ecom_pass@localhost:5432/payment_service_db npx prisma migrate dev --schema=apps/backend/payment-service/prisma/schema.prisma

# SEARCH
migrate-search:
	DATABASE_URL=postgresql://mvp_ecom_user:mvp_ecom_pass@localhost:5432/search_service_db npx prisma migrate dev --schema=apps/backend/search-service/prisma/schema.prisma

# CART
migrate-cart:
	DATABASE_URL=postgresql://mvp_ecom_user:mvp_ecom_pass@localhost:5432/cart_service_db npx prisma migrate dev --schema=apps/backend/cart-service/prisma/schema.prisma

# ADMIN
migrate-admin:
	DATABASE_URL=postgresql://mvp_ecom_user:mvp_ecom_pass@localhost:5432/admin_service_db npx prisma migrate dev --schema=apps/backend/admin-service/prisma/schema.prisma

# INVOICE
migrate-invoice:
	DATABASE_URL=postgresql://mvp_ecom_user:mvp_ecom_pass@localhost:5432/invoice_service_db npx prisma migrate dev --schema=apps/backend/invoice-service/prisma/schema.prisma

# ANALYTICS
migrate-analytics:
	DATABASE_URL=postgresql://mvp_ecom_user:mvp_ecom_pass@localhost:5432/analytics_service_db npx prisma migrate dev --schema=apps/backend/analytics-service/prisma/schema.prisma

# VENDOR
migrate-vendor:
	DATABASE_URL=postgresql://mvp_ecom_user:mvp_ecom_pass@localhost:5432/vendor_service_db npx prisma migrate dev --schema=apps/backend/vendor-service/prisma/schema.prisma

# 🔁 All Migrations
migrate-all: migrate-user migrate-product migrate-order migrate-rating migrate-email migrate-payment migrate-search migrate-cart migrate-admin migrate-invoice migrate-analytics migrate-vendor

# === Prisma Migration Reset for All Services ===

reset-user:
	npx prisma migrate reset --force --skip-seed --schema=apps/backend/user-service/prisma/schema.prisma

reset-product:
	npx prisma migrate reset --force --skip-seed --schema=apps/backend/product-service/prisma/schema.prisma

reset-order:
	npx prisma migrate reset --force --skip-seed --schema=apps/backend/order-service/prisma/schema.prisma

reset-rating:
	npx prisma migrate reset --force --skip-seed --schema=apps/backend/rating-service/prisma/schema.prisma

reset-email:
	npx prisma migrate reset --force --skip-seed --schema=apps/backend/email-service/prisma/schema.prisma

reset-payment:
	npx prisma migrate reset --force --skip-seed --schema=apps/backend/payment-service/prisma/schema.prisma

reset-search:
	npx prisma migrate reset --force --skip-seed --schema=apps/backend/search-service/prisma/schema.prisma

reset-cart:
	npx prisma migrate reset --force --skip-seed --schema=apps/backend/cart-service/prisma/schema.prisma

reset-admin:
	npx prisma migrate reset --force --skip-seed --schema=apps/backend/admin-service/prisma/schema.prisma

reset-invoice:
	npx prisma migrate reset --force --skip-seed --schema=apps/backend/invoice-service/prisma/schema.prisma

reset-analytics:
	npx prisma migrate reset --force --skip-seed --schema=apps/backend/analytics-service/prisma/schema.prisma

reset-vendor:
	npx prisma migrate reset --force --skip-seed --schema=apps/backend/vendor-service/prisma/schema.prisma

# Run all resets in sequence
reset-all: reset-user reset-product reset-order reset-rating reset-email reset-payment reset-search reset-cart reset-admin reset-invoice reset-analytics reset-vendor


# ====================== 🧭 GENERAL ======================
# make help                     # Show all available commands
# make dev                      # Run all microservices in dev mode
# make start-service-<name>     # Start a single service using `npx nx serve`
# make build-service-<name>     # Build a single service using `npx nx build`
# make nx-graph                 # Show Nx dependency graph

# ==================== ✅ CODE QUALITY ====================
# make lint                     # Run ESLint across all services
# make test                     # Run all Jest unit tests
# make build                    # Build all services

# ==================== 🧠 PRISMA & DB ====================
# make prisma-migrate           # Apply Prisma migrations for all Prisma services
# make prisma-generate          # Generate Prisma clients
# make prisma-seed              # Seed all services with seed.ts (if exists)
# make seed                     # Alias for `prisma-seed`
# make prisma-studio            # Open Prisma Studio (user-service default)
# make check-readiness          # Check if DB services are ready (used before migrations)

# ==================== 🐳 DOCKER ====================
# make docker-build             # Build Docker images for all services
# make docker-push              # Push Docker images to registry
# make docker-clean             # Remove local Docker images

# ========== 🏗️ INFRASTRUCTURE (Docker Compose) ==========
# make infra-up                 # Start PostgreSQL, Redis, Kafka, MinIO, etc.
# make infra-down               # Stop infra stack
# make infra-restart            # Restart infra
# make postgres-init            # Reinitialize PostgreSQL volumes

# ========== ☸️ KUBERNETES (kind + Helm) ==========
# make kind-start               # Start kind cluster
# make kind-delete              # Delete kind cluster
# make load-images              # Load images into kind

# make helm-init                # Add/update Helm repos
# make helm-deploy              # Deploy all services via Helm
# make helm-destroy             # Uninstall all Helm releases
# make helmfile-sync            # Sync Helm deployments via helmfile.yaml

# ========== 📊 OBSERVABILITY ==========
# make monitor-start            # Deploy Prometheus, Grafana, Loki, Jaeger
# make monitor-stop             # Uninstall observability stack
# make jaeger-ui                # Port-forward Jaeger UI (localhost:16686)
# make grafana-ui               # Port-forward Grafana UI (localhost:3000)

# ========== 📄 LOGGING ==========
# make logs-<service>           # Tail logs from a service pod (e.g., logs-user-service)

# ========== 🔐 SECURITY ==========
# make scan-images              # Scan all Docker images with Trivy
# make falco-install            # Install Falco (runtime threat detection)
# make falco-uninstall          # Uninstall Falco

# ========== 🎯 NX AFFECTED COMMANDS ==========
# make affected                 # Show affected projects
# make affected-build           # Build only affected services
# make affected-lint            # Lint only affected services
# make affected-test            # Test only affected services
# make affected-deploy          # Build + Push + Deploy only affected services

# ========== 🚀 CI/CD SHORTCUTS ==========
# make ci                       # Lint + Test + Build (CI shortcut)
# make deploy                   # Docker build + push + deploy via Helm
# make reset                    # Clean Docker + kind + redeploy all

# ========== 🎯 SERVICE SHORTCUTS ==========
# make user-service             # Start user-service (uses `npx nx serve`)
# make product-service          # Start product-service
# make order-service            # Start order-service
# make vendor-service           # Start vendor-service
# make build-user-service       # Build user-service (uses `npx nx build`)
# make build-order-service      # Build order-service
# make build-payment-service    # Build payment-service

# ========== 🔁 GROUPED SERVICE STARTS ==========
# make core-services            # Start user, product, order, cart, payment
# make post-mvp-services        # Start vendor, rating, analytics, search, email, invoice
# make all-services             # Start all services

