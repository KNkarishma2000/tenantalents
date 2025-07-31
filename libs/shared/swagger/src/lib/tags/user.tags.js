"use strict";
/**
 * @swagger
 * /api/user/register:
 *   post:
 *     summary: Register a new user
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: user@example.com
 *               password:
 *                 type: string
 *                 format: password
 *                 example: StrongPassword123
 *               phone:
 *                 type: string
 *                 example: '+919876543210'
 *                 description: Optional phone number for OTP verification
 *               role:
 *                 type: string
 *                 enum: [buyer, seller, vendor]
 *                 example: buyer
 *                 description: Optional user role, defaults to 'buyer'
 *     responses:
 *       201:
 *         description: User registered successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   description: User unique ID
 *                 email:
 *                   type: string
 *                 role:
 *                   type: string
 *                   description: User role
 *       400:
 *         description: Bad request (e.g., user already exists)
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.tags = void 0;
exports.tags = [
    {
        name: 'user',
        description: 'Endpoints related to user',
    },
];
//# sourceMappingURL=user.tags.js.map