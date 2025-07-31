# 📘 @shared/swagger — Swagger Setup Utility

This shared library provides a reusable utility to initialize and standardize **Swagger (OpenAPI)** documentation across all backend services in the **MVP E-Commerce Platform (HKTVmall-style)** built using the **Nx Monorepo** architecture.

It ensures consistent API documentation, supports service-specific tags, and integrates easily into any Express.js application.

---

## 📁 Directory Structure

libs/shared/swagger/
├── src/
│ ├── setupSwagger.ts # Initializes Swagger UI for any Express service
│ └── tags.ts # Predefined tag descriptions for service grouping
├── tsconfig.json
└── tsconfig.lib.json

yaml
Copy
Edit

---

## 🚀 What It Provides

- 📄 Auto-generated **OpenAPI 3.0 spec**
- 🔖 Predefined **tags** for grouping routes by service
- 🧼 Consistent **Swagger UI** setup across all services
- ⚙️ Easily **pluggable** into any Express app at `/api/docs/<service-name>`

---

## 🧪 Usage Guide

### 🧷 Step 1: Import and Call `setupSwagger` in your `main.ts` or `app.ts`

```ts
import { setupSwagger } from '@shared/swagger';

setupSwagger(app, {
  title: 'Product Service API',
  version: '1.0.0',
  basePath: '/api/product',
  docsPath: '/api/docs/product',
});
➡️ This enables Swagger UI at:
http://localhost:3001/api/docs/product

🏷️ Step 2: Add Route-Level Swagger Comments (Optional)
ts
Copy
Edit
/**
 * @swagger
 * /api/product/list:
 *   get:
 *     tags: [Product]
 *     description: Get all products
 */
🧠 Tip: These comments help Swagger auto-document each route correctly and group them by tag.

🧩 Function Signature
ts
Copy
Edit
setupSwagger(
  app: Express,
  options: {
    title: string;       // Title shown in Swagger UI
    version: string;     // API version
    basePath: string;    // Service base path (e.g. /api/user)
    docsPath: string;    // Path where Swagger UI is served (e.g. /api/docs/user)
  }
): void
🏷️ Swagger Tags (Defined in tags.ts)
To keep your API documentation clean and consistent across all services, use shared tags like:

ts
Copy
Edit
export const swaggerTags = [
  { name: 'User', description: 'User management endpoints' },
  { name: 'Product', description: 'Product management endpoints' },
  { name: 'Order', description: 'Order processing and tracking' },
  { name: 'Rating', description: 'User-submitted ratings and reviews' },
  { name: 'Search', description: 'Search and indexing services' },
  { name: 'Email', description: 'Transactional email operations' },
  { name: 'Payment', description: 'Payment and billing endpoints' },
  { name: 'Cart', description: 'Shopping cart management' },
];
You can extend this with more tags like:

ts
Copy
Edit
{ name: 'Admin', description: 'Admin dashboards and roles' },
{ name: 'Invoice', description: 'PDF billing and history' },
{ name: 'Analytics', description: 'Data and metrics endpoints' },
{ name: 'Vendor', description: 'Marketplace partner operations' }
📚 Output UI Example
After setup, visit:

bash
Copy
Edit
http://localhost:3001/api/docs/product
You’ll see a Swagger UI like:

mathematica
Copy
Edit
Product Service API (v1.0.0)
├── GET /api/product/list      [Product]
├── POST /api/product/create   [Product]
Click on any endpoint to test it directly from the browser!

🧠 Best Practices
✅ Add clear Swagger comments to each route

✅ Use swaggerTags to keep route grouping consistent

⚠️ Expose Swagger only in development

Use NODE_ENV !== 'production'

Or protect with middleware/auth

📁 Place Swagger setup after global middlewares, before routes

🧼 Keep descriptions short, clear, and business-friendly

🛠️ Combine With
Library	Purpose
@shared/constants	Define common paths or API versions
@shared/config	Enable/disable Swagger per environment
@shared/logger	Log successful Swagger bootstrapping

✅ Summary
📘 This library gives every Express service a beautiful, documented API UI

🧩 Plug it in with just a few lines of code

🧪 Test your API directly from the browser

💼 Works consistently across your monorepo

```
