"use strict";
/**
 * @swagger
 * tags:
 *   - name: Payment
 *     description: Payment processing and verification

 * /api/payment:
 *   post:
 *     summary: Initiate a payment
 *     tags: [Payment]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [orderId, amount, method]
 *             properties:
 *               orderId:
 *                 type: string
 *               amount:
 *                 type: number
 *                 example: 299.99
 *               method:
 *                 type: string
 *                 enum: [UPI, COD]
 *                 example: UPI
 *     responses:
 *       200:
 *         description: Payment initiated
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: ✅ Payment initiated
 *                 data:
 *                   type: object
 *                   properties:
 *                     paymentId:
 *                       type: string
 *                     amount:
 *                       type: number
 *                     method:
 *                       type: string
 *                     qrCode:
 *                       type: string
 *                       example: upi://pay?pa=merchant@upi&pn=Store&am=299.99

 * /api/payment/{id}/verify:
 *   patch:
 *     summary: Verify payment status
 *     tags: [Payment]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Payment ID to verify
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [status]
 *             properties:
 *               status:
 *                 type: string
 *                 enum: [SUCCESS, FAILED, PENDING]
 *     responses:
 *       200:
 *         description: Payment verification result
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: ✅ Payment success
 *                 data:
 *                   $ref: '#/components/schemas/Payment'
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.tags = void 0;
exports.tags = [
    {
        name: 'payment',
        description: 'Endpoints related to payment',
    },
];
//# sourceMappingURL=payment.tags.js.map