# 🚀 @shared/redis — Redis Client & Caching Utility

This shared library provides a robust and centralized Redis integration for all microservices in the MVP E-Commerce Platform (HKTVmall-style), built using the Nx Monorepo architecture.

It supports both **Redis Sentinel** (for HA environments) and **standalone Redis** (for local/dev) modes, while exposing clean and reusable utilities for caching, TTL management, and typed key-value handling.

---

## ✨ Features

- 🧠 Simple `getCache`, `setCache`, `deleteCache` helpers
- 🔄 Shared Redis key management for naming consistency across services
- 🔐 Redis Sentinel support with automatic failover (`ioredis`)
- ⏳ Built-in TTL (Time To Live) for all cache entries
- ♻️ Safe, singleton Redis client used across all services
- 🧪 Type-safe cache value definitions for user, product, cart, etc.

---

## 📁 Directory Structure

libs/shared/redis/
├── src/
│ ├── cache.ts # High-level get/set/delete cache helpers
│ ├── connectRedis.ts # Connect Redis safely during app startup
│ ├── keys.ts # Centralized Redis key patterns (with enums/functions)
│ ├── redis-client.ts # Singleton Redis (or Sentinel) client instance
│ ├── redis-config.ts # Env-based config for Redis connection
│ ├── redis-utils.ts # Low-level Redis wrappers (get/set/del)
│ ├── types.ts # Shared types for config + typed value cache
├── tsconfig.json
└── tsconfig.lib.json

yaml
Copy
Edit

---

## ⚙️ Redis Sentinel Environment Setup

Example `.env`:

REDIS_SENTINEL_ENABLED=true
REDIS_SENTINEL_NAME=mymaster
REDIS_SENTINELS=redis-sentinel-0:26379,redis-sentinel-1:26379,redis-sentinel-2:26379
REDIS_PASSWORD=your_redis_password

yaml
Copy
Edit

---

## 🧪 Basic Usage

### 🔌 1. Connect Redis on App Startup

```ts
import { connectRedis } from '@shared/redis';

await connectRedis();
💾 2. Set, Get, and Delete from Cache
ts
Copy
Edit
import { setCache, getCache, deleteCache } from '@shared/redis';
import { REDIS_KEYS } from '@shared/redis';

// Set
await setCache(REDIS_KEYS.PRODUCT('123'), { name: 'iPhone 15' }, 300);

// Get
const product = await getCache<{ name: string }>(REDIS_KEYS.PRODUCT('123'));

// Delete
await deleteCache(REDIS_KEYS.PRODUCT('123'));
📦 Module Overview
File	Description
cache.ts	High-level cache helpers: getCache, setCache, deleteCache
keys.ts	Enum/functions for consistent Redis key naming
redis-client.ts	Singleton Redis client (standalone or Sentinel)
redis-config.ts	Loads Redis connection config from environment
redis-utils.ts	Low-level helpers (setEx, get, del, etc.)
types.ts	Cache interfaces and Redis config types

🧠 Redis TTL — What & Why
TTL (Time To Live) defines how long a key should remain in Redis before expiring.

⏱️ Common TTL Use Cases
Use Case	TTL Example
🛒 Cart cache	60 * 60 * 24 (1 day)
🔒 Session token	60 * 60 * 24 * 7 (7 days)
🔍 Search results	60 * 10 (10 minutes)

ts
Copy
Edit
await setCache(key, value, 3600); // 1 hour TTL
🧰 Key Pattern Example
ts
Copy
Edit
// keys.ts
export const REDIS_KEYS = {
  PRODUCT: (id: string) => `product:${id}`,
  USER_SESSION: (id: string) => `session:${id}`,
  CART: (userId: string) => `cart:${userId}`,
};

// Usage
const key = REDIS_KEYS.CART('user-123');
🧪 Typed Cache Value Interfaces
ts
Copy
Edit
// types.ts

export interface ProductDetailCache {
  id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  rating?: number;
}
ts
Copy
Edit
const product = await getCache<ProductDetailCache>(REDIS_KEYS.PRODUCT('p123'));
✅ Best Practices
✅ Use REDIS_KEYS to standardize key structure

✅ Set TTLs to avoid memory bloat

✅ Always reuse the shared Redis client

✅ Wrap Redis calls in try-catch or use @shared/error

🛠️ Combine With
@shared/logger — log cache hits/misses or connection issues

@shared/config — load Redis env vars centrally

@shared/constants — define and share TTL constants

@shared/error — for graceful error handling

📚 Related Services That Use This
user-service — session/user profile caching

cart-service — user cart data

product-service — cached product detail fetches

search-service — store frequent queries

rating-service — average rating data

🔐 Auth & Security Notes
Avoid storing sensitive data (like tokens/passwords) directly in Redis unless encrypted.

Consider namespace prefixes (e.g. prod: vs dev:) to separate environments.

```
