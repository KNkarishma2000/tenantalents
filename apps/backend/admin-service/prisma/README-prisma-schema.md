🛡️ Admin Moderation System – Prisma Schema Guide

Welcome! This guide helps you understand how the Admin Moderation System is structured using **Prisma ORM** and **PostgreSQL**. This system is part of a backend application for an e-commerce platform — similar to Amazon or HKTVmall — where **admins moderate sellers, products, users, and more**.

---

## 🎯 What Is This?

This schema defines:

- **Who are the users** of the platform (users, admins, sellers).
- **What actions** admins can take (like suspending sellers).
- **Which targets** those actions affect (e.g., products, sellers).
- **How to track** moderation history and its status.

---

## 🧱 Basic Concepts

### 🧰 What is Prisma?

[Prisma](https://www.prisma.io/) is a TypeScript-based ORM (Object Relational Mapper). It lets you:

- Define your **database structure** using `schema.prisma`.
- Generate **TypeScript code** to read/write to your database easily.
- Automatically handle **relations between models**.

---

## 📦 Files and Setup

### `schema.prisma`

This file is like a **blueprint for your database**. It describes the structure of tables, enums (types), and their relationships.

You can use the Prisma CLI to generate the database and client code:

```bash
npx prisma generate       # Create TypeScript client
npx prisma db push        # Apply schema to your PostgreSQL DB
npx prisma studio         # Open a UI to see your data
⚙️ Configuration
PostgreSQL connection
prisma
Copy
Edit
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL") // Found in your .env file
}
Prisma client generator
prisma
Copy
Edit
generator client {
  provider = "prisma-client-js"
}
🔠 Enums – Custom Types
Enums are predefined values you use in your models.

AdminRole
Who is moderating?

prisma
Copy
Edit
enum AdminRole {
  ADMIN         // Normal moderator
  SUPER_ADMIN   // Full access
}
ModerationActionType
What is the admin doing?

prisma
Copy
Edit
enum ModerationActionType {
  SUSPEND_SELLER
  REMOVE_PRODUCT
  APPROVE_SELLER
  REJECT_SELLER
  WARN_SELLER
  SYSTEM_NOTE
}
TargetType
Who is being affected?

prisma
Copy
Edit
enum TargetType {
  SELLER
  PRODUCT
  USER
  ORDER
}
ModerationStatus
What is the progress of the action?

prisma
Copy
Edit
enum ModerationStatus {
  PENDING
  RESOLVED
  ESCALATED
  DISMISSED
}
🧩 Models – Database Tables
👤 User
Every user has an email, password, and a role. They can be a buyer, admin, or seller.

prisma
Copy
Edit
model User {
  id       String   @id @default(uuid())
  email    String   @unique
  password String
  role     UserRole @default(USER)

  seller   Seller?
  admin    Admin?

  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}
🛍️ Seller
A seller is a type of user who sells products. They go through an approval process.

prisma
Copy
Edit
model Seller {
  id        String       @id @default(uuid())
  userId    String       @unique
  name      String
  status    SellerStatus @default(PENDING)

  user      User         @relation(fields: [userId], references: [id])
  createdAt DateTime     @default(now())
  updatedAt DateTime     @updatedAt
}
👮 Admin
An admin moderates the platform. Each admin is also a user.

prisma
Copy
Edit
model Admin {
  id        String    @id @default(uuid())
  userId    String    @unique
  name      String
  role      AdminRole @default(ADMIN)

  actions   ActionLog[]

  user      User      @relation(fields: [userId], references: [id])
  createdAt DateTime  @default(now())
  updatedAt DateTime  @updatedAt
}
📝 ActionLog
Whenever an admin does something (like suspending a seller), it's recorded here.

prisma
Copy
Edit
model ActionLog {
  id         String               @id @default(uuid())
  adminId    String
  actionType ModerationActionType
  targetType TargetType
  targetId   String               // UUID of the affected seller/product/user
  reason     String?              // Optional reason (e.g. "fraud")
  notes      String?              // Optional detailed comment
  status     ModerationStatus     @default(PENDING)
  createdAt  DateTime             @default(now())
  resolvedAt DateTime?            // When it was resolved

  admin      Admin @relation(fields: [adminId], references: [id])

  // For faster searches
  @@index([targetType])
  @@index([targetId])
  @@index([status])
}
🔗 Relations Overview
Model	Related To	Description
User	Admin	One-to-one. A user can be an admin
User	Seller	One-to-one. A user can be a seller
Admin	ActionLog	One-to-many. Admins log many actions
ActionLog	Admin	Each action belongs to one admin

🔍 Common Workflows (Examples)
When a new seller registers → status = PENDING.

Admin reviews and approves → creates ActionLog with APPROVE_SELLER.

If issues arise, admin can create SUSPEND_SELLER action.

System updates Seller.status = SUSPENDED and ActionLog.status = RESOLVED.

✅ How to Use in Code
After generating the Prisma client:

ts
Copy
Edit
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Get all pending seller actions
const pendingActions = await prisma.actionLog.findMany({
  where: { status: 'PENDING', targetType: 'SELLER' },
});

// Approve a seller
await prisma.actionLog.create({
  data: {
    adminId: 'some-admin-id',
    actionType: 'APPROVE_SELLER',
    targetType: 'SELLER',
    targetId: 'some-seller-id',
    reason: 'Meets quality standards',
    status: 'RESOLVED',
  },
});
🚀 Next Steps for Beginners
Learn Prisma basics.

Use npx prisma studio to browse your DB.

Try writing test seed data and actions in a script.

Extend the schema to moderate reviews, refunds, etc.

🧪 Testing Tips
Use prisma db seed to populate test users, sellers, admins.

Mock moderation flows with create, update, findMany.

📝 Summary
This Prisma schema enables structured, traceable admin actions in a scalable e-commerce system. It separates concerns clearly between:

Users (who they are)

Sellers (what they do)

Admins (what actions they take)

Logs (what happened and why)

```
