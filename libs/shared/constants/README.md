.

📦 @shared/constants — Shared Constants Library
This shared library provides reusable, centralized constants for all backend microservices in the MVP E-Commerce Platform (HKTVmall-style) using an Nx Monorepo.

It includes standardized values for:

✅ JWT configuration

🔁 Kafka topic names

🔑 Redis key templates

🧑 User roles for RBAC

🚪 Service port mappings

🗄️ Database names per microservice

Centralizing constants ensures all services speak the same language, eliminates duplication, and improves maintainability.

📁 Folder Structure
pgsql
Copy
Edit
libs/shared/constants/
├── README.md
├── src/
│ ├── index.ts # Re-exports all constants
│ └── lib/
│ ├── jwt-config.ts # JWT secret and expiration
│ ├── kafka-topics.ts # Kafka topic names
│ ├── redis-keys.ts # Redis key patterns/functions
│ ├── roles.ts # Role list + role type
│ ├── service-ports.ts # Port number per microservice
│ └── database-names.ts # Database name per microservice
├── tsconfig.json
└── tsconfig.lib.json
📚 What's Inside
File Description
jwt-config.ts JWT secret and expiration time for token signing
kafka-topics.ts Shared Kafka topic names (e.g. user.created, order.placed)
redis-keys.ts Redis key templates like otp:{email} and cart:{userId}
roles.ts List of user roles (admin, seller, etc.) and a Role type
service-ports.ts Standardized port assignments for each microservice
database-names.ts Logical database name per service (used in .env and config)

🧪 Usage Examples
ts
Copy
Edit
import { JWT_CONFIG, KAFKA_TOPICS, REDIS_KEYS, ROLES, SERVICE_PORTS, DATABASE_NAMES } from '@shared/constants';

// JWT
console.log(JWT_CONFIG.expiresIn); // '1d'

// Kafka
console.log(KAFKA_TOPICS.ORDER_PLACED); // 'order.placed'

// Redis
console.log(REDIS_KEYS.otp('swapna@example.com')); // 'otp:swapna@example.com'

// Role-based Access Control
console.log(ROLES.includes('admin')); // true

// Ports
console.log(SERVICE_PORTS.USER_SERVICE); // 3000

// DB Names
console.log(DATABASE_NAMES.USER); // 'user_service_db'
🔐 jwt-config.ts
ts
Copy
Edit
export const JWT_CONFIG = {
secret: process.env.JWT_SECRET || 'default_jwt_secret',
expiresIn: '1d',
};
📩 kafka-topics.ts
ts
Copy
Edit
export const KAFKA_TOPICS = {
USER_CREATED: 'user.created',
USER_REGISTERED: 'user.registered',
USER_REGISTRATION_OTP: 'user.registration.otp',
USER_REGISTRATION_EMAIL: 'user.registration.email',
PRODUCT_UPDATED: 'product.updated',
ORDER_PLACED: 'order.placed',
PAYMENT_SUCCESS: 'payment.success',
INVOICE_GENERATE: 'invoice.generate',
};
🧊 redis-keys.ts
ts
Copy
Edit
export const REDIS_KEYS = {
otp: (identifier: string) => `otp:${identifier}`,
cart: (userIdOrSessionId: string) => `cart:${userIdOrSessionId}`,
};
🧑‍⚖️ roles.ts
ts
Copy
Edit
export const ROLES = [
'buyer',
'seller',
'buyer_seller',
'admin',
'super_admin',
] as const;

export type Role = typeof ROLES[number];
✅ Use Role as a strict union type:

ts
Copy
Edit
const role: Role = 'seller'; // ✅ Valid
const role: Role = 'manager'; // ❌ Error: not in ROLES
🚪 service-ports.ts
ts
Copy
Edit
export const SERVICE_PORTS = {
USER_SERVICE: 3000,
PRODUCT_SERVICE: 3001,
ORDER_SERVICE: 3002,
RATING_SERVICE: 3003,
SEARCH_SERVICE: 3004,
EMAIL_SERVICE: 3005,
PAYMENT_SERVICE: 3006,
CART_SERVICE: 3007,
ADMIN_SERVICE: 3008,
INVOICE_SERVICE: 3009,
ANALYTICS_SERVICE: 3010,
VENDOR_SERVICE: 3011,
} as const;

export type ServiceName = keyof typeof SERVICE_PORTS;
✅ Use ServiceName as a type-safe key:

ts
Copy
Edit
const service: ServiceName = 'ORDER_SERVICE'; // ✅
🗄️ database-names.ts
ts
Copy
Edit
export const DATABASE_NAMES = {
USER: 'user_service_db',
PRODUCT: 'product_service_db',
ORDER: 'order_service_db',
RATING: 'rating_service_db',
EMAIL: 'email_service_db',
PAYMENT: 'payment_service_db',
SEARCH: 'search_service_db',
CART: 'cart_service_db',
ADMIN: 'admin_service_db',
INVOICE: 'invoice_service_db',
ANALYTICS: 'analytics_service_db',
VENDOR: 'vendor_service_db',
};
💡 Why Use This Library?
Benefit Explanation
🧠 Consistency All services use the same role names, topic names, port numbers
🔁 Reusability Avoid repeating constant strings across the codebase
🔐 Security Prevent accidental hardcoding of secrets or config values
🔍 Maintainability Easy to audit and update constants in one place
🧪 Type Safety TypeScript types prevent invalid values at compile time

🧠 Pro Tips
Use constants in API routes, message handlers, RBAC checks, and Redis cache strategies.

Avoid using raw strings for topic names, DB names, or roles — always import from @shared/constants.

You can auto-generate .env.example using DATABASE_NAMES, SERVICE_PORTS, and ROLES.
