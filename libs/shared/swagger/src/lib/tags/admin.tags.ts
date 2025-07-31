/**
 * @swagger
 * tags:
 *   name: Admin
 *   description: Admin operations for users and sellers
 */

/**
 * @swagger
 * /api/admin/users:
 *   get:
 *     summary: Get all users
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of users
 */

/**
 * @swagger
 * /api/admin/users/role:
 *   put:
 *     summary: Update user role
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [userId, role]
 *             properties:
 *               userId:
 *                 type: string
 *               role:
 *                 type: string
 *                 enum: [buyer, seller, buyer_seller, admin, super_admin]
 *     responses:
 *       200:
 *         description: User role updated
 */

/**
 * @swagger
 * /api/admin/sellers/pending:
 *   get:
 *     summary: Get all pending seller applications
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of pending sellers
 */

/**
 * @swagger
 * /api/admin/sellers/approve:
 *   post:
 *     summary: Approve or reject a seller
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [sellerId, approve]
 *             properties:
 *               sellerId:
 *                 type: string
 *               approve:
 *                 type: boolean
 *     responses:
 *       200:
 *         description: Seller approval status updated
 */

/**
 * @swagger
 * /api/admin/dashboard:
 *   get:
 *     summary: Get admin dashboard statistics
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Summary stats (user count, seller count, etc.)
 */

export const tags = [
  {
    name: 'admin',
    description: 'Endpoints related to admin',
  },
];
