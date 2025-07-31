🔐 Shared Auth Library (@shared/auth)
Welcome! This is the authentication and authorization library used by all backend services in your e-commerce platform.

It helps make sure:

Only logged-in users can access certain routes.

Only users with the right roles (like admin, seller, or buyer) can do certain actions.

User info (like email and role) is added to every request so services know who is making it.

💡 What Is This For?
This library:

✅ Checks if a user is logged in (using JWT tokens).

🔐 Blocks users without permission (RBAC – Role-Based Access Control).

🌐 Works with OAuth2 systems (like Keycloak or Google Login).

🧠 Makes user data available as req.user inside route handlers.

🧩 Can be strict (require login) or optional (just add user if logged in).

🔧 What is JWT?
JWT (JSON Web Token) is a small string that represents the user. It looks like this:

Copy
Edit
eyJhbGciOiJIUzI1NiIsInR5cCI6...
The backend sends this to the user after login. Then the user includes it in every request like this:

makefile
Copy
Edit
Authorization: Bearer <your_token_here>
The backend checks the token to know:

Who the user is

If their token is valid

What role they have (e.g., admin or buyer)

📁 What's Inside?
pgsql
Copy
Edit
libs/shared/auth/
├── authMiddleware.ts # Checks JWT and sets req.user
├── optionalAuthMiddleware.ts # Only adds user if token exists
├── requireRole.ts # Blocks users without required role
├── roleGuard.ts # Simple role/auth checks
├── oauth.ts # For OAuth2 / Keycloak
├── jwt.ts # Create and verify tokens
├── generateToken.ts # Tool to create sample tokens
├── types.ts # Defines what a user looks like
├── global.d.ts # Adds user type to Express.Request
└── index.ts # Re-exports all files
✅ Step-by-Step: How to Use

1. Install Required Packages
   Run this in your terminal:

bash
Copy
Edit
npm install jsonwebtoken dotenv 2. Create a .env File in Your Project Root
Add a secret for signing JWTs:

ini
Copy
Edit
JWT_SECRET=your_super_secret_key
To generate a strong secret:

bash
Copy
Edit
openssl rand -base64 32 3. Add Auth Middleware to Your Express App
ts
Copy
Edit
import express from 'express';
import { authMiddleware } from '@shared/auth';

const app = express();

// This will block users without a valid token
app.use(authMiddleware());
Now, req.user will contain info like:

ts
Copy
Edit
{
userId: '123',
email: 'test@example.com',
role: 'buyer'
} 4. Protect Routes with Role Check
ts
Copy
Edit
import { requireRole } from '@shared/auth';

app.get('/admin', requireRole('admin'), (req, res) => {
res.send('Welcome Admin');
});
Only users with role admin can access this route.

5. Allow Public Routes with Optional Login
   ts
   Copy
   Edit
   import { optionalAuthMiddleware } from '@shared/auth';

app.get('/products', optionalAuthMiddleware(), (req, res) => {
if (req.user) {
console.log('User is logged in:', req.user.email);
} else {
console.log('No user logged in.');
}
res.send('Product list');
}); 6. OAuth2 Support (Optional)
If you're using login with Google, Keycloak, or other OAuth:

ts
Copy
Edit
import { oauthMiddleware } from '@shared/auth';

app.use('/oauth', oauthMiddleware, (req, res) => {
res.send(`Logged in as ${req.user?.email}`);
});
🧪 Create a Test Token
Run this script:

bash
Copy
Edit
ts-node libs/shared/auth/src/generateToken.ts
It prints a token you can use in Postman:

makefile
Copy
Edit
Authorization: Bearer <token>
🔢 Roles You Can Use
These roles are built-in:

ts
Copy
Edit
'buyer' | 'seller' | 'buyer_seller' | 'admin' | 'super_admin'
Use them with requireRole('admin') or requireRole('seller').

🧠 What You Learned
Term Meaning
JWT A signed token that proves who the user is
Middleware A function that runs before your API route
Auth Checking if the user is logged in
Role What the user is allowed to do
RBAC Giving access based on role (admin, seller, etc.)

🧱 Services That Use This
This auth library is used in all services:

👤 user-service

🛍️ product-service

🧾 invoice-service

💳 payment-service

📦 order-service

⭐ rating-service

🔍 search-service

💬 email-service

🛒 cart-service

🛠️ admin-service

🧩 Why This Library is Useful for MVP
✅ Centralized logic (no copy-paste in every service)
✅ Works with JWT or OAuth2
✅ Allows strict and public access
✅ Very easy to use in Express apps
✅ Can grow with your system (e.g., Keycloak, Google, etc.)

🧙 Tips for New Developers
✅ Always protect sensitive routes with authMiddleware()

✅ Use requireRole() for admin-only or seller-only pages

❌ Never trust the client — always verify the token

🧪 Use generateToken.ts for local testing

🔁 Update types.ts if you add new roles or fields
