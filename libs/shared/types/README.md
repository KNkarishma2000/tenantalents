🧩 @shared/types — Shared Type Definitions
This library contains common TypeScript types used by all backend services in our MVP E-Commerce Platform (HKTVmall-style), built using the Nx Monorepo.

Think of it like a toolbox of shapes (types and interfaces) that all services can use — so that everyone speaks the same language when passing data (HTTP, Kafka, JWT, etc.).

📁 Folder Structure
bash
Copy
Edit
libs/shared/types/
├── src/
│ └── lib/
│ ├── cart.ts # Cart item types
│ ├── common.ts # Generic API response types
│ ├── jwt-payload.ts # Structure of JWT token data
│ └── kafka-events.ts # Kafka event message types
🧱 What Each File Does
File What It Contains
cart.ts Defines what a cart item looks like (productId, quantity)
common.ts A reusable response format used in all APIs (success, message, data)
jwt-payload.ts Defines what's inside a decoded JWT token (email, role, etc.)
kafka-events.ts Describes the shape of messages sent between services via Kafka

🛠️ How To Use It
You can import and use these types in any backend service like this:

🔐 JWT Payload Example
ts
Copy
Edit
import { JwtPayload } from '@shared/types';

function decodeToken(token: string): JwtPayload {
// Decode and validate token
}
🛒 Cart Example
ts
Copy
Edit
import { CartItem } from '@shared/types';

const cart: CartItem[] = [
{ productId: 'abc123', quantity: 2 }
];
📦 API Response Wrapper
ts
Copy
Edit
import { ServiceResponse } from '@shared/types';

const res: ServiceResponse<string> = {
success: true,
message: 'Data fetched',
data: 'Hello World'
};
✅ Why This Matters
Keeps all services consistent

Makes your code type-safe (fewer bugs)

Avoids repeating the same definitions everywhere

Helps services talk to each other clearly and safely

👨‍🏫 Best Practices
Only put shared types here — no logic or functions.

Group by feature/domain (e.g. cart, auth, events, etc.)

Use in all services like this:

ts
Copy
Edit
import { CartItem } from '@shared/types';
🔗 Works Well With
Library Purpose
@shared/kafka Sends/receives Kafka events using typed payloads
@shared/auth Uses JwtPayload to validate users
@shared/redis Cache typed objects safely in Redis
