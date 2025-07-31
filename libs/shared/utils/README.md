🛠️ @shared/utils — Common Utility Functions
This library provides a collection of lightweight, reusable utility functions that are commonly used across all backend microservices in the MVP E-Commerce Platform (HKTVmall-style), built using the Nx Monorepo architecture.

These utilities improve code reusability, readability, and reliability without relying on large external libraries.

📁 Directory Structure
pgsql
Copy
Edit
libs/shared/utils/
├── src/
│ └── lib/
│ ├── env.ts # Environment variable loader with validation
│ ├── formatDate.ts # Date formatting helper
│ ├── hash.ts # SHA-256 hashing
│ ├── invoice-generator.ts # PDF invoice generator + MinIO upload
│ ├── parseJSON.ts # Safe JSON parser
│ ├── response.ts # Standard API response formatting
│ ├── retry.ts # Retry logic wrapper
│ ├── sleep.ts # Async sleep/delay
│ ├── uuid.ts # UUID v4 generator
│ └── validator.ts # Email and UUID validation helpers
├── tsconfig.json
└── tsconfig.lib.json
✨ Utility Highlights
File Description
env.ts Safe access to process.env with fallback or throw
formatDate.ts Formats Date to ISO string — used in logs, events
hash.ts Secure SHA-256 string hashing (e.g., idempotency tokens)
invoice-generator.ts Generates invoice PDF and uploads to MinIO
parseJSON.ts Safe JSON.parse() with try/catch fallback
response.ts Uniform Express API response formatting (success/error)
retry.ts Retries a function with configurable attempts/delay
sleep.ts Awaitable sleep delay (in ms)
uuid.ts Generates RFC4122-compliant UUID v4
validator.ts Email and UUID format validation using regex

🧪 Usage Examples
✅ Required Env with Fallback
ts
Copy
Edit
import { getEnv } from '@shared/utils';

const jwtSecret = getEnv('JWT_SECRET');
🕰️ Date Formatting
ts
Copy
Edit
import { formatDate } from '@shared/utils';

console.log(formatDate(new Date())); // e.g., "2025-07-20T10:00:00.000Z"
🔁 Retry on Failure
ts
Copy
Edit
import { retry } from '@shared/utils';

await retry(() => fetchRemoteConfig(), 3, 1000); // 3 retries with 1s delay
💤 Sleep for Delay
ts
Copy
Edit
import { sleep } from '@shared/utils';

await sleep(2000); // waits 2 seconds
🔐 Hashing
ts
Copy
Edit
import { hashString } from '@shared/utils';

const tokenHash = hashString('my-session-token');
🧾 Generate Invoice PDF
ts
Copy
Edit
import { generateInvoiceAndUpload } from '@shared/utils';

const pdfPath = await generateInvoiceAndUpload('ORDER-12345');
✅ Email Validation
ts
Copy
Edit
import { isEmail } from '@shared/utils';

if (!isEmail(user.email)) throw new Error('Invalid email format');
🆔 Generate UUID
ts
Copy
Edit
import { generateUUID } from '@shared/utils';

const requestId = generateUUID();
🧠 Best Practices
Use getEnv() for all required configuration keys instead of raw process.env

Wrap remote service calls with retry() to handle transient failures

Use sendSuccess() and sendError() from response.ts for consistent API responses

Apply sleep() for polling or rate-limited operations

Validate all user inputs with helpers in validator.ts

🔗 Combine With
Library Purpose
@shared/config Centralized config + environment values, loaded via getEnv()
@shared/error Format and throw custom API errors, pair with response.ts
@shared/logger Log warnings, retries, hash generation, or invalid inputs
@shared/minio Used by invoice-generator.ts to upload PDFs

📦 Designed For
Resilience — Safe defaults, retries, and graceful failure handling

Security — Secure hashing, UUIDs, and validated input

Productivity — Prebuilt, well-tested utilities for common backend patterns

Uniformity — Ensures a consistent developer experience across services
