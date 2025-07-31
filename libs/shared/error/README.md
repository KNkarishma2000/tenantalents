❌ @shared/error — Shared Error Handling Library
This library provides a consistent and reusable error-handling mechanism for all backend services in the MVP E-Commerce Platform (HKTVmall-style) built with the Nx Monorepo architecture.

By centralizing custom error classes and middleware, it ensures standardized responses, improves debuggability, and simplifies maintenance across microservices.

📁 Directory Structure
vbnet
Copy
Edit
libs/shared/error/
├── src/
│ ├── index.ts # Re-exports error utilities
│ └── lib/
│ ├── api-error.ts # Custom APIError class
│ └── error-handler.ts # Express-compatible global error handler middleware
├── tsconfig.json
└── tsconfig.lib.json
🚀 What It Provides
✅ A custom ApiError class to throw structured HTTP errors

🛡️ A centralized Express errorHandler middleware to format error responses

🔒 Secure error messaging in production, detailed stack traces in development

📦 Shared across all backend services like user-service, product-service, email-service, etc.

📦 Modules
api-error.ts
A custom error class extending the native Error object, allowing structured errors with HTTP status codes.

ts
Copy
Edit
export class ApiError extends Error {
statusCode: number;
isOperational: boolean;

constructor(statusCode: number, message: string, isOperational = true, stack = '') {
super(message);
this.statusCode = statusCode;
this.isOperational = isOperational;

    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }

}
}
✅ Example
ts
Copy
Edit
throw new ApiError(404, 'User not found');
error-handler.ts
An Express-compatible middleware that catches all thrown errors and returns a consistent JSON format response.

ts
Copy
Edit
import { Request, Response, NextFunction } from 'express';
import { ApiError } from './api-error';

export const errorHandler = (
err: Error,
req: Request,
res: Response,
next: NextFunction
) => {
let customError = err;

if (!(err instanceof ApiError)) {
customError = new ApiError(500, 'Something went wrong');
}

const apiError = customError as ApiError;

res.status(apiError.statusCode || 500).json({
success: false,
message: apiError.message || 'Internal Server Error',
});
};
🧪 Example Usage in a Microservice
ts
Copy
Edit
import express from 'express';
import { ApiError, errorHandler } from '@shared/error';

const app = express();

app.get('/user/:id', async (req, res, next) => {
const user = await findUser(req.params.id);
if (!user) {
throw new ApiError(404, 'User not found');
}
res.json(user);
});

// Global error handler (always last)
app.use(errorHandler);
🧱 ApiError Signature
ts
Copy
Edit
new ApiError(statusCode: number, message: string, isOperational = true, stack = '')
Param Type Description
statusCode number HTTP status code (e.g. 400, 404, 500)
message string Human-readable error message
isOperational boolean Defaults to true, helps differentiate known vs unknown errors
stack string Optional custom stack trace

🌐 Example Response
json
Copy
Edit
{
"success": false,
"message": "User not found"
}
In non-production environments, you can optionally expose more error details if needed for debugging.

🧠 Best Practices
Use ApiError in all service-level logic and route handlers

Avoid throwing raw Error objects

Always pass errors to next(err) so the middleware can handle them

Don’t expose internal stack traces or system errors in production

🧰 Combine With
@shared/logger — for consistent error logging

@shared/constants — for centralized error messages or status codes
