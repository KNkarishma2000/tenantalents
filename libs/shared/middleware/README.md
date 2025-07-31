🧱 @shared/middleware — Common Express Middlewares
This folder contains reusable middlewares for all backend services in the e-commerce platform (HKTVmall-style) using Nx Monorepo.

It helps you avoid repeating the same code in every service by centralizing useful Express features like:

✅ Security headers

🌐 CORS (Cross-Origin support)

📈 Request logging

🛡️ Rate limiting

🔐 Role-based access

🚫 404 not found handling

❌ Error handling

🗂 Folder Structure
pgsql
Copy
Edit
libs/shared/middleware/
├── index.ts # Entry point: exports all middlewares
├── lib/
│ ├── cors.middleware.ts # Handle frontend-backend cross-origin setup
│ ├── error.middleware.ts # Catch and format errors
│ ├── helmet.middleware.ts # Add HTTP security headers
│ ├── notFound.middleware.ts # Handle 404s (route not found)
│ ├── rateLimiter.middleware.ts # Limit request rate per IP
│ ├── requestLogger.middleware.ts# Log all incoming requests
│ └── role.middleware.ts # Check user roles like 'admin', 'vendor'
✨ What Each Middleware Does
🔐 helmet.middleware.ts — Security Headers
Adds HTTP headers to protect the app.

ts
Copy
Edit
import { helmetMiddleware } from '@shared/middleware';
app.use(helmetMiddleware);
🌐 cors.middleware.ts — Cross-Origin Support
Allows requests from your frontend (e.g., localhost or Vercel).

ts
Copy
Edit
import { corsMiddleware } from '@shared/middleware';
app.use(corsMiddleware);
📈 requestLogger.middleware.ts — Console Logging
Logs each HTTP request with method and path.

ts
Copy
Edit
import { requestLoggerMiddleware } from '@shared/middleware';
app.use(requestLoggerMiddleware);
🛡️ rateLimiter.middleware.ts — Prevent Abuse
Limits how many times a user can hit the API (e.g., max 100 requests every 15 mins).

ts
Copy
Edit
import { rateLimiterMiddleware } from '@shared/middleware';
app.use(rateLimiterMiddleware);
🚫 notFound.middleware.ts — 404 Handling
If a user hits a route that doesn’t exist, return a proper 404 message.

ts
Copy
Edit
import { notFoundMiddleware } from '@shared/middleware';
app.use(notFoundMiddleware);
❌ error.middleware.ts — Catch Errors
Handles any errors that happen and shows clean JSON error responses.

ts
Copy
Edit
import { errorMiddleware } from '@shared/middleware';
app.use(errorMiddleware);
🔐 role.middleware.ts — Role Check (Admin, Vendor, etc.)
Use this to protect admin or vendor routes.

ts
Copy
Edit
import { roleMiddleware } from '@shared/middleware';

app.get('/admin', roleMiddleware(['admin']), (req, res) => {
res.send('Hello Admin');
});
✅ Make sure req.user is set by using JWT auth from @shared/auth.

✅ How to Use All Middlewares in a Service
ts
Copy
Edit
import express from 'express';
import {
corsMiddleware,
helmetMiddleware,
rateLimiterMiddleware,
requestLoggerMiddleware,
notFoundMiddleware,
errorMiddleware,
roleMiddleware,
} from '@shared/middleware';

const app = express();

// Apply shared middlewares
app.use(corsMiddleware);
app.use(helmetMiddleware);
app.use(requestLoggerMiddleware);
app.use(rateLimiterMiddleware);

// Example protected route
app.get('/admin', roleMiddleware(['admin']), (req, res) => {
res.send('Welcome Admin');
});

// Fallback for 404s and errors
app.use(notFoundMiddleware);
app.use(errorMiddleware);
🧠 Pro Tips for New Developers
Always import from @shared/middleware (not from lib/)

Use helmet and cors in every service

Apply notFoundMiddleware and errorMiddleware at the end of all routes

Use roleMiddleware only on routes that need protection (like admin/vendor)

📦 Related Libraries
Library Why Use It
@shared/auth To check JWT and get req.user
@shared/logger To log things like errors or events
@shared/error To throw clean ApiErrors
@shared/config To set custom CORS origins or limits
