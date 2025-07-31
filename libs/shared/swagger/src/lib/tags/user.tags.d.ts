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
export declare const tags: {
    name: string;
    description: string;
}[];
//# sourceMappingURL=user.tags.d.ts.map