# 🛍️ Product Service – Multi-Vendor E-Commerce Platform

The **Product Service** manages global products and vendor-specific listings in a multi-vendor marketplace. It enables multiple sellers to list the same product with different pricing, stock, and availability.

---

## 📌 Responsibilities

- ✅ Manage global product catalog (title, category, images)
- ✅ Allow sellers to list existing products (multi-vendor support)
- ✅ Handle pricing, stock, and delivery ETA per vendor listing
- ✅ Store product images via MinIO + ImageKit
- ✅ Emit Kafka events for new/updated listings
- ✅ Support search/indexing through `search-service`

---

## 🧱 Tech Stack

- **Framework**: Express.js (Nx Monorepo)
- **ORM**: Prisma + PostgreSQL
- **Object Storage**: MinIO + ImageKit
- **Messaging**: Kafka (`product.uploaded`)
- **Docs**: Swagger via `@shared/swagger`
- **Auth**: JWT + RBAC via `@shared/auth`

---

## 🧠 Prisma Models

| Model                  | Description                                                   |
| ---------------------- | ------------------------------------------------------------- |
| `Product`              | Global product info (title, description, images)              |
| `ProductListing`       | Vendor-specific listing with price, stock, status             |
| `ProductListingStatus` | Enum to track listing visibility (ACTIVE, OUT_OF_STOCK, etc.) |

See [`schema.prisma`](./prisma/schema.prisma) for full schema.

---

## 🧾 Sample Schema Snippet

```prisma
model Product {
  id        String   @id @default(uuid())
  title     String
  imageUrls String[]
  listings  ProductListing[]
}

model ProductListing {
  id        String   @id @default(uuid())
  productId String
  sellerId  String
  price     Decimal
  stock     Int      @default(0)
  status    ProductListingStatus @default(ACTIVE)
  product   Product  @relation(fields: [productId], references: [id])
}

⚙️ Environment Variables (.env)

DATABASE_URL=postgresql://user:pass@localhost:5432/product_service_db
MINIO_ENDPOINT=http://localhost:9000
MINIO_ACCESS_KEY=minioadmin
MINIO_SECRET_KEY=minioadmin
IMAGEKIT_ENDPOINT=https://ik.imagekit.io/<your_id>
IMAGEKIT_PUBLIC_KEY=xxx
IMAGEKIT_PRIVATE_KEY=xxx

🚀 Getting Started

# Install dependencies
npm install

# Generate Prisma client
npx prisma generate

# Run migrations
npx prisma migrate dev --name init

# Start the service
npm run start:dev

🧪 API Endpoints (Example)
Method	Endpoint	Description
POST	/api/products	Add a global product
GET	/api/products/:id	Get product by ID
POST	/api/listings	Seller adds a listing for a product
GET	/api/products/:id/listings	Get all vendor listings for a product
PATCH	/api/listings/:id	Update price, stock, or status

    All routes are protected with JWT and role-based guards (buyer, seller, admin)

🔁 Kafka Topics
Topic	Produced By	Consumed By
product.uploaded	✅ product-service	search-service
🗃️ Image Handling

    Images are uploaded to MinIO (private)

    Synced to ImageKit (CDN + optimization)

    Image URLs stored in Product.imageUrls[]

🧭 Future Enhancements

    Product attribute system (size, color, etc.)

    Review-based listing ranking

    Sync product views for analytics-service

    Moderation for inappropriate product titles/images

🧩 Related Services

    vendor-service – Seller onboarding

    search-service – Filters and indexing

    admin-service – Moderates listings

    rating-service – Tracks seller/product feedback

```
