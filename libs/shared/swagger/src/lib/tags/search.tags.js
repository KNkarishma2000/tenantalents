"use strict";
/**
 * @swagger
 * /api/search:
 *   get:
 *     summary: Search for products
 *     tags: [Search]
 *     parameters:
 *       - in: query
 *         name: query
 *         schema:
 *           type: string
 *         required: false
 *         description: The search term to match product names
 *       - in: query
 *         name: category
 *         schema:
 *           type: string
 *         required: false
 *         description: Filter results by product category
 *       - in: query
 *         name: brand
 *         schema:
 *           type: string
 *         required: false
 *         description: Filter results by product brand
 *     responses:
 *       200:
 *         description: Search results
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     description: Product matching the search criteria
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.tags = void 0;
exports.tags = [
    {
        name: 'search',
        description: 'Endpoints related to search',
    },
];
//# sourceMappingURL=search.tags.js.map