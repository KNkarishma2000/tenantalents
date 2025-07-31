HKTVmall-Style E-Commerce Backend — Microservices Overview
✅ 1. Summary
Our backend is built as a modular microservices system — each service handles a specific job like users, products, vendors, orders, payments, and more. All services communicate asynchronously using Kafka events to ensure reliability, scalability, and loose coupling.

✅ 2. What a Microservice Is
Instead of one big monolithic backend, we use many small independent services. Each has its own codebase, database, and responsibility. If one service fails or gets updated, it won’t break the others — making the platform robust and easier to maintain.

✅ 3. User Flow (End-to-End Journey)
Step Service Description
Registers with OTP 📲 user-service User authentication and registration
Adds products to cart 🛒 cart-service Stores cart items, supports multi-vendor
Checkout & payment 💳 payment-service Payment processing and confirmation
Order is placed & split per seller 📦 order-service Creates orders split by vendor
PDF invoice is generated 🧾 invoice-service Creates PDF invoices and stores securely
Confirmation email is sent 📧 email-service Sends order confirmation emails
Data logged for reporting 📊 analytics-service Tracks events for dashboards and reports
Admin monitors the platform 🛡️ admin-service Platform monitoring and admin controls
Vendors manage their store 🧑‍💼 vendor-service Seller onboarding and product management

✅ 4. Microservice List & Roles
Service Description
user-service Handles OTP login, registration, roles, MFA
vendor-service Seller onboarding, KYC, business profile mgmt
product-service Product catalog, pricing, stock management
cart-service Buyer cart storage using Redis
order-service Order creation, status updates, multi-vendor split
payment-service Payment acceptance (UPI, COD), notifications
invoice-service PDF invoice generation, MinIO storage
email-service Email sending (OTP, confirmations) via Kafka
rating-service Buyer product/seller ratings and averages
admin-service Dashboards, approvals, product moderation
analytics-service Event aggregation and real-time analytics
search-service Product & seller search with filters

✅ 5. Technologies (Simplified)
Tool Purpose
PostgreSQL Each service uses its own isolated database
Redis Fast cache & session storage (e.g., OTP, carts)
Kafka Async inter-service communication via events
MinIO Object storage for invoices, KYC docs, images
Docker + K8s Containerization and scalable orchestration
GitHub Actions CI/CD pipeline for testing, building, deploying
Jaeger/Grafana Distributed tracing and monitoring dashboards
Falco / Trivy Security scanning and runtime protection

✅ 6. Benefits of This Architecture
🔄 Scalable: Each service scales independently based on demand

🧱 Modular: Teams can work on individual services without stepping on each other

⚡ Fast: Kafka & Redis provide real-time data flow with low latency

🔒 Secure: OTP login, RBAC, isolated DBs, signed invoice links ensure strong security

🧾 Traceable: Jaeger tracing enables full request tracking and debugging

📊 Insightful: Real-time dashboards for admins and vendors via analytics service

✅ 7. Analogy
Think of our backend as a modern shopping mall — each counter (billing, security, product shelf) is independent but works together seamlessly. This distributed microservices approach ensures reliability, specialization, and easy maintenance.

✅ 8. TL;DR
We’re building a modern, production-ready multi-vendor e-commerce backend with Kafka-driven microservices. Each service is independently developed, scalable, and secure — ensuring a smooth, seamless experience for buyers, sellers, and admins alike.
