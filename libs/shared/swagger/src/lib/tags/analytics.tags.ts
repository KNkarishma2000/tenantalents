/**
 * @swagger
 * tags:
 *   - name: Analytics
 *     description: Analytics and metrics related endpoints
 *
 * /api/analytics/overview:
 *   get:
 *     summary: Get platform analytics overview
 *     tags: [Analytics]
 *     responses:
 *       200:
 *         description: Analytics data
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               example:
 *                 user_signup: 120
 *                 product_views: 3400
 *                 orders: 230
 *
 * /api/analytics/sales:
 *   get:
 *     summary: Get sales report
 *     tags: [Analytics]
 *     parameters:
 *       - in: query
 *         name: range
 *         schema:
 *           type: string
 *           enum: [daily, weekly, monthly]
 *         required: false
 *         description: Time range for sales report
 *     responses:
 *       200:
 *         description: Sales report data
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               example:
 *                 totalSales: 10200
 *                 currency: "USD"
 *                 range: "monthly"
 */

export const tags = [
  {
    name: 'analytics',
    description: 'Endpoints related to analytics',
  },
];
