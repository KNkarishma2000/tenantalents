/**
 * @swagger
 * tags:
 *   - name: Vendor
 *     description: Vendor registration and profile management
 */
/**
 * @swagger
 * /api/vendors/register:
 *   post:
 *     summary: Register a new vendor
 *     tags: [Vendor]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               phone:
 *                 type: string
 *               storeName:
 *                 type: string
 *             required:
 *               - name
 *               - email
 *               - phone
 *               - storeName
 *     responses:
 *       201:
 *         description: Vendor registered successfully
 */
/**
 * @swagger
 * /api/vendors/{id}:
 *   get:
 *     summary: Get vendor profile
 *     tags: [Vendor]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Vendor data
 *
 *   put:
 *     summary: Update vendor profile
 *     tags: [Vendor]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             additionalProperties: true
 *     responses:
 *       200:
 *         description: Vendor updated
 */
/**
 * @swagger
 * /api/vendors/{id}/analytics:
 *   get:
 *     summary: Get vendor analytics
 *     tags: [Vendor]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Vendor analytics
 */
/**
 * @swagger
 * /api/vendors/{id}/upload:
 *   post:
 *     summary: Upload vendor documents
 *     tags: [Vendor]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               file:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: File uploaded
 */
/**
 * @swagger
 * /api/vendors/{id}/approve:
 *   post:
 *     summary: Approve vendor (admin only)
 *     tags: [Vendor]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Vendor approved
 */
/**
 * @swagger
 * /api/vendors/{id}/reject:
 *   post:
 *     summary: Reject vendor (admin only)
 *     tags: [Vendor]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Vendor rejected
 */
export declare const tags: {
    name: string;
    description: string;
}[];
//# sourceMappingURL=vendor.tags.d.ts.map