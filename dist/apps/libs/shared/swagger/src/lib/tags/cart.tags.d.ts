/**
 * @swagger
 * tags:
 *   - name: Cart
 *     description: Cart operations for users and guests

 * /api/cart:
 *   get:
 *     summary: Get current cart
 *     tags: [Cart]
 *     parameters:
 *       - in: query
 *         name: sessionId
 *         schema:
 *           type: string
 *         required: false
 *         description: Guest session ID (if not authenticated)
 *     responses:
 *       200:
 *         description: Cart retrieved successfully

 * /api/cart/add:
 *   post:
 *     summary: Add item to cart
 *     tags: [Cart]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [productId, quantity]
 *             properties:
 *               productId:
 *                 type: string
 *               quantity:
 *                 type: integer
 *               sessionId:
 *                 type: string
 *                 description: Optional guest session ID (if unauthenticated)
 *     responses:
 *       200:
 *         description: Item added to cart

 * /api/cart/checkout:
 *   post:
 *     summary: Checkout current cart
 *     tags: [Cart]
 *     requestBody:
 *       required: false
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               sessionId:
 *                 type: string
 *                 description: Optional guest session ID (if unauthenticated)
 *     responses:
 *       200:
 *         description: Cart checked out successfully
 */
export declare const tags: {
    name: string;
    description: string;
}[];
