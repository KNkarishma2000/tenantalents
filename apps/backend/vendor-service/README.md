# 🛡️ Admin Service – Multi-Vendor E-Commerce Platform

The **Admin Service** manages the moderation and governance aspects of the multi-vendor e-commerce platform. It is used by internal admins and super-admins to review sellers, approve product listings, suspend accounts, and track platform-wide actions.

---

## 📌 Responsibilities

- ✅ Approve or reject **seller registrations**
- ✅ Suspend or remove **product listings**
- ✅ Manage **user roles** (e.g., promote to seller or admin)
- ✅ Track **admin actions** (audit logging)
- ✅ Interact with **analytics-service** for metrics
- ✅ RBAC-protected access (admin / super_admin only)

---

## 🧠 Domain Models (Prisma Schema)

| Model       | Description                                                              |
| ----------- | ------------------------------------------------------------------------ |
| `User`      | Common user across all roles (buyer, seller, admin)                      |
| `Seller`    | Seller registration with `pending/approved/rejected` status              |
| `Admin`     | Internal admin users who perform moderation                              |
| `Product`   | Seller products, moderated with status: `active`, `suspended`, `removed` |
| `ActionLog` | Tracks admin actions (e.g., suspending a seller)                         |

---

## 🧱 Tech Stack

- **Framework**: Express.js
- **ORM**: Prisma (PostgreSQL)
- **RBAC Auth**: JWT-based (`@shared/auth`)
- **Messaging**: Kafka (planned)
- **Monitoring**: Swagger, Prometheus, Redis (optional)
- **Containerization**: Docker, Kubernetes, Helm

---

## 🚀 Getting Started

```bash
# 1. Install dependencies
npm install

# 2. Generate Prisma Client
npx prisma generate

# 3. Run database migrations
npx prisma migrate dev --name init

# 4. Start the service
npm run start:dev

⚙️ Environment Variables (.env)

DATABASE_URL=postgresql://user:password@localhost:5432/admin_service_db
JWT_SECRET=super_secret_jwt_key

📚 Key API Endpoints
Method	Endpoint	Role	Description
GET	/admin/sellers	admin	List all sellers with status
POST	/admin/sellers/:id/approve	admin	Approve a seller
POST	/admin/sellers/:id/reject	admin	Reject a seller
PATCH	/admin/products/:id/suspend	admin	Suspend a product
PATCH	/admin/products/:id/activate	admin	Re-activate a product
GET	/admin/logs	super_admin	View all admin actions

    🔒 All endpoints require valid JWT with role admin or super_admin.

📦 Prisma Schema Location

apps/admin-service/prisma/schema.prisma

🧪 Testing

# Run unit tests
npm run test

# Open Prisma Studio
npx prisma studio

```
