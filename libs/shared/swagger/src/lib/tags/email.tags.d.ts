/**
 * @swagger
 * tags:
 *   - name: Email
 *     description: Endpoints related to sending emails

 * /api/email/send:
 *   post:
 *     summary: Send a real email
 *     tags: [Email]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - to
 *               - subject
 *               - html
 *             properties:
 *               to:
 *                 type: string
 *                 format: email
 *                 example: user@example.com
 *               subject:
 *                 type: string
 *                 example: Welcome to Our Platform
 *               html:
 *                 type: string
 *                 example: "<h1>Hello, welcome!</h1>"
 *     responses:
 *       200:
 *         description: Email sent successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: ✅ Email sent
 *                 messageId:
 *                   type: string
 *                   example: "<abc123@mailer.com>"
 *       400:
 *         description: Missing or invalid input
 *       500:
 *         description: Server error while sending email
 */
export declare const tags: {
    name: string;
    description: string;
}[];
//# sourceMappingURL=email.tags.d.ts.map