/**
 * @swagger
 * /api/insurances:
 *   post:
 *     summary: Create a new insurance
 *     tags: [Insurance]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - contract
 *             properties:
 *               name:
 *                 type: string
 *                 description: The name of the insurance
 *               contract:
 *                 type: string
 *                 format: binary
 *                 description: The contract file to upload
 *     responses:
 *       201:
 *         description: Insurance created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Insurance'
 *       400:
 *         description: Missing parameter(s)!
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/insurances:
 *   get:
 *     summary: Get all insurances
 *     tags: [Insurance]
 *     responses:
 *       200:
 *         description: A list of insurances
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Insurance'
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/insurances/{id}:
 *   get:
 *     summary: Get an insurance by ID
 *     tags: [Insurance]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the insurance to retrieve
 *     responses:
 *       200:
 *         description: Insurance retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Insurance'
 *       400:
 *         description: Missing parameter(s)!
 *       404:
 *         description: Insurance not found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/insurances/user/{userId}:
 *   get:
 *     summary: Get an insurance by ID
 *     tags: [Insurance]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the user whose insurance to retrieve
 *     responses:
 *       200:
 *         description: A list of user insurances
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Insurance'
 *       400:
 *         description: Missing parameter(s)!
 *       404:
 *         description: Insurance not found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/insurances/{id}:
 *   put:
 *     summary: Update an insurance
 *     tags: [Insurance]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the insurance to update
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The updated name of the insurance
 *               contract:
 *                 type: string
 *                 format: binary
 *                 description: (Optional) The new contract file to upload
 *     responses:
 *       200:
 *         description: Insurance updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Insurance'
 *       400:
 *         description: Missing parameter(s)!
 *       404:
 *         description: Insurance not found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/insurances/{id}:
 *   delete:
 *     summary: Delete an insurance
 *     tags: [Insurance]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the insurance to delete
 *     responses:
 *       204:
 *         description: Insurance deleted successfully
 *       400:
 *         description: Missing ID parameter!
 *       404:
 *         description: Insurance not found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Insurance:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           description: The UUID of the insurance
 *         name:
 *           type: string
 *           description: The name of the insurance
 *         contractUrl:
 *           type: string
 *           description: The URL where the contract file is stored
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: The time the insurance was created
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: The time the insurance was last updated
 */
