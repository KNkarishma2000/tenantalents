📧 @shared/email — Email Utility Library
This shared library provides reusable email-sending utilities for all backend services in the MVP E-Commerce Platform (HKTVmall-style) using the Nx Monorepo architecture.

Instead of duplicating SMTP logic across services like email-service, user-service, or invoice-service, this library centralizes:

Nodemailer client setup

Typed email payloads

Utility functions for sending

Predefined HTML templates

📁 Folder Structure
bash
Copy
Edit
libs/shared/email/
├── README.md # You're here
├── src
│ ├── index.ts # Re-exports all utilities
│ └── lib/
│ ├── client.ts # Creates and exports a Nodemailer SMTP client
│ ├── send.ts # sendEmail() function with logging and error handling
│ ├── service.ts # Reusable email templates (e.g., password reset)
│ └── types.ts # TypeScript interfaces for EmailPayload, etc.
└── tsconfig.lib.json
✉️ What It Does
🔧 Centralizes configuration for SMTP providers like SendGrid, Mailtrap, or SES

📤 Exposes a simple, reusable sendEmail() function with type-safe inputs

🧩 Allows importing common templates like password reset or invoice confirmation

📦 Handles transport setup, error handling, attachments, and HTML/text formatting

🧪 Usage Example
In any microservice (e.g., user-service):

ts
Copy
Edit
import { sendEmail } from '@shared/email';
import { passwordResetTemplate } from '@shared/email';

await sendEmail({
to: 'user@example.com',
subject: 'Reset Your Password',
html: passwordResetTemplate('https://yourapp.com/reset?token=123'),
});
📦 Module Breakdown
File Description
client.ts Sets up and exports the Nodemailer transporter using env config
send.ts Unified sendEmail() utility with optional logging
service.ts Reusable HTML-generating functions (e.g., welcome email, invoice sent)
types.ts Type definitions like EmailPayload, attachments, headers, etc.

📜 Example Types (types.ts)
ts
Copy
Edit
export interface EmailPayload {
to: string;
from?: string;
subject: string;
html?: string;
text?: string;
attachments?: Array<{
filename: string;
content: Buffer | string;
}>;
}
🌐 Example Template (service.ts)
ts
Copy
Edit
export const passwordResetTemplate = (link: string) => `

  <p>Click below to reset your password:</p>
  <a href="${link}">${link}</a>
`;
🔐 Required .env Configuration
Every service that uses @shared/email must include these environment variables:

env
Copy
Edit
SMTP_HOST=smtp.mailtrap.io
SMTP_PORT=2525
SMTP_USER=your_user
SMTP_PASS=your_pass
EMAIL_FROM=no-reply@yourapp.com
🔑 For SendGrid, use:

SMTP_USER=apikey

SMTP_PASS=<your_sendgrid_api_key>

🚀 Benefits
🧱 Reusable email logic across services

✅ Type-safe inputs reduce bugs

✨ Easy to extend with templates, text fallbacks, or attachments

🔁 Decoupled from business logic, making it easier to test
