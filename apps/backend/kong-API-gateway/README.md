🚪 Kong API Gateway for MVP E-Commerce Platform

Kong acts as the entry point to all backend services. Instead of calling each service directly (like user-service:3000), your frontend or clients can just call http://localhost:8000/api/user, and Kong will route it correctly.
🧰 What’s Inside

    ✅ DB-less mode (no PostgreSQL needed)

    📁 Routes for each microservice (via kong.yaml)

    🧱 Optional UI (Konga) for admin dashboard

    🔐 Support for JWT auth, rate-limiting, and plugins

📦 Files Overview

infra/
└── kong/
├── docker-compose.yaml # Spins up Kong and Konga
└── kong.yaml # Declarative config for services and routes

⚙️ 1. Install Kong Locally

Make sure Docker is running. Then run:

cd infra/kong
docker-compose up -d

🛠 2. Register Services with Kong
Option 1: Use Admin API

curl -i -X POST http://localhost:8001/config \
 --data-binary @kong.yaml \
 -H "Content-Type: application/yaml"

Option 2: Use Deck CLI (Recommended)

Install Deck:

brew install kong/deck/deck # macOS

# or download from https://github.com/kong/deck

Then sync config:

deck sync --config kong.yaml

🔁 3. Example Services (kong.yaml)

\_format_version: "3.0"

services:

- name: user-service
  url: http://host.docker.internal:3000
  routes:

  - name: user
    paths: ["/api/user"]

- name: product-service
  url: http://host.docker.internal:3001
  routes:

  - name: product
    paths: ["/api/product"]

- name: order-service
  url: http://host.docker.internal:3002
  routes:
  - name: order
    paths: ["/api/order"]

# Example Plugin (JWT)

plugins:

- name: jwt
  service: admin-service

🧪 4. Test Your Routes

Once Kong is up:

# Call user-service through Kong

curl http://localhost:8000/api/user

# Call product-service through Kong

curl http://localhost:8000/api/product

🔐 5. Add Security (Optional)
✅ Protect Routes with JWT

plugins:

- name: jwt
  service: admin-service

Add consumers, keys, and use Authorization: Bearer <token> in requests.
⚙️ Add Rate Limiting

plugins:

- name: rate-limiting
  config:
  minute: 100
  policy: local

🧭 6. Konga UI (Optional)

Konga is a GUI dashboard for Kong.

http://localhost:1337

🔄 7. Update Your Frontend/Clients

Instead of calling individual services:

http://localhost:3000/api/user

Switch to using Kong Gateway:

http://localhost:8000/api/user

🧼 8. Tear Down

docker-compose down

🧠 Why Kong for MVP?
Feature Benefit
🧩 Route Management Centralized control of all service paths
🔒 Plugins Add JWT, OAuth2, rate limiting, etc.
🧰 DB-less Mode Simpler, lightweight for local dev & CI/CD
📊 Metrics & Logs Can be hooked into Prometheus, Grafana
