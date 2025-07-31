/**
 * @swagger
 * tags:
 *   - name: Invoice
 *     description: Endpoints related to invoice management
 *
 * /api/invoice:
 *   post:
 *     summary: Generate and upload a new invoice
 *     tags: [Invoice]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - orderId
 *               - userId
 *               - amount
 *             properties:
 *               orderId:
 *                 type: string
 *                 example: ORD123
 *               userId:
 *                 type: string
 *                 example: USR456
 *               amount:
 *                 type: number
 *                 example: 199.99
 *     responses:
 *       201:
 *         description: Invoice created successfully
 *       400:
 *         description: Bad request (missing fields or invalid input)
 *       500:
 *         description: Internal server error
 *
 * /api/invoice/{id}:
 *   get:
 *     summary: Get invoice metadata or PDF by ID
 *     tags: [Invoice]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Invoice ID or Order ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Invoice details or file returned
 *       404:
 *         description: Invoice not found
 *       500:
 *         description: Internal server error
 */
export declare const tags: {
    name: string;
    description: string;
}[];
//# sourceMappingURL=invoice.tags.d.ts.map