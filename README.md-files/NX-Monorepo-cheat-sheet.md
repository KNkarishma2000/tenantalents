📘 Nx Monorepo Cheat Sheet – E-commerce Edition (HKTVmall Style)

✅ Covers: Nx Workspace • Express Microservices • React Frontend • Shared Libs • Docker • Prisma • Helm • CI/CD • Monitoring
🧱 1. WORKSPACE SETUP

npm i -g nx
npx create-nx-workspace@latest ecommerce-platform

# OR

npx create-nx-workspace@20.5.0 ecommerce-platform

cd ecommerce-platform
nx init
npm install --save-dev @nx/express
nx reset

🔧 2. GENERATE PROJECTS
🛠 Backend Microservices

# Core services

npx nx g @nx/express:app user-service
npx nx g @nx/express:app product-service
npx nx g @nx/express:app order-service
npx nx g @nx/express:app rating-service
npx nx g @nx/express:app email-service
npx nx g @nx/express:app payment-service
npx nx g @nx/express:app search-service
npx nx g @nx/express:app cart-service

# Newly added services

npx nx g @nx/express:app vendor-service
npx nx g @nx/express:app admin-service
npx nx g @nx/express:app analytics-service
npx nx g @nx/express:app invoice-service

🎨 Frontend (Next.js + React)

npx nx g @nx/next:app storefront
npx nx g @nx/react:lib shared-ui
npx nx g @nx/react:component Navbar --project=shared-ui

🧩 Shared Libraries

npx nx g @nx/js:lib shared-utils
npx nx g @nx/js:lib kafka
npx nx g @nx/js:lib redis
npx nx g @nx/js:lib config
npx nx g @nx/js:lib error
npx nx g @nx/js:lib logger
npx nx g @nx/js:lib types
npx nx g @nx/js:lib swagger
npx nx g @nx/js:lib auth
npx nx g @nx/js:lib email
npx nx g @nx/js:lib minio

✅ 3. PRISMA SETUP PER SERVICE

cd apps/<service-name>
npm install prisma --save-dev
npm install @prisma/client

npx prisma init
echo 'DATABASE_URL="postgresql://mvp_ecom_user:mvp_ecom_pass@localhost:5432/<service_name_db>"' > .env

# Define schema.prisma for each service

npx prisma migrate dev --name init
npx prisma generate
npx prisma studio # Optional
npx prisma db seed # Optional
npx prisma migrate reset # Optional reset

🧰 4. MAKEFILE COMMANDS
▶️ Dev & Nx

make dev
make start-service-<name>
make build
make test
make lint
make nx-graph

🔧 Prisma

make prisma-generate
make prisma-migrate
make prisma-seed
make prisma-studio

🐳 Docker & Infra

make docker-build
make docker-push
make docker-clean

make infra-up
make infra-down
make infra-restart

☸️ Kubernetes (kind)

make kind-start
make kind-delete
make load-images

📦 Helm

make helm-init
make helm-deploy
make helm-destroy
make helmfile-sync

📊 Observability

make monitor-start
make monitor-stop
make jaeger-ui # http://localhost:16686
make grafana-ui # http://localhost:3000

🛡️ Security

make scan-images
make falco-install
make falco-uninstall

💡 CI/CD & Nx Affected

make affected
make affected-build
make affected-lint
make affected-test
make affected-deploy

make ci
make deploy
make reset

⚙️ 5. NX ESSENTIAL COMMANDS

nx build <project>
nx test <project>
nx lint <project>
nx serve <project>

nx affected:build --base=main
nx affected:test --base=main
nx affected:lint --base=main
nx affected:graph

nx format:write
nx format:check

nx graph
nx show projects
nx show project <project>

🐳 Docker Target (in project.json)

"docker-build": {
"executor": "nx:run-commands",
"options": {
"command": "docker build -t <service-name> ."
}
}

Run with:

nx run <service-name>:docker-build

⛴️ Helm Target (in project.json)

"helm-deploy": {
"executor": "nx:run-commands",
"options": {
"command": "helm upgrade --install <service> ./infra/microservices/<service>"
}
}

nx run <service-name>:helm-deploy

🧪 Preview Environments (Optional)

nx affected --target=preview-deploy --base=origin/main

✅ Final Production Checklist

nx build --all
nx test --all
nx lint --all
nx format:check

📁 MONOREPO STRUCTURE

ecommerce-platform/
├── apps/
│ ├── user-service/
│ ├── product-service/
│ ├── order-service/
│ ├── rating-service/
│ ├── email-service/
│ ├── payment-service/
│ ├── search-service/
│ ├── cart-service/
│ ├── vendor-service/ ✅
│ ├── admin-service/ ✅
│ ├── analytics-service/ ✅
│ ├── invoice-service/ ✅
│ └── storefront/ # Next.js frontend
├── libs/
│ ├── shared-utils/
│ ├── redis/
│ ├── kafka/
│ ├── config/
│ ├── swagger/
│ ├── error/
│ ├── logger/
│ ├── minio/
│ └── auth/
├── infra/
│ ├── database/
│ ├── microservices/
│ ├── ingress/
│ ├── monitoring/
│ ├── security/
├── Makefile
├── helmfile/
├── nx.json
├── package.json
└── tsconfig.base.json

💡 Pro Tips

    Use libs/ for all shared logic (e.g. Kafka, Redis, Auth, Email)

    Use nx affected:* in GitHub Actions for intelligent CI/CD

    Use helmfile for syncing multiple charts

    Use MinIO for object storage: invoice PDFs, user avatars, etc.

    Enable nx graph to monitor dependency boundaries
