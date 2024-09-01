/**
 * @swagger
 * /api/support-communities:
 *   post:
 *     summary: Create a new support community
 *     tags: [SupportCommunities]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - moderatorId
 *               - name
 *               - description
 *               - isPrivate
 *             properties:
 *               moderatorId:
 *                 type: string
 *                 description: The ID of the moderator for the community
 *               name:
 *                 type: string
 *                 description: The name of the support community
 *               description:
 *                 type: string
 *                 description: A brief description of the support community
 *               isPrivate:
 *                 type: boolean
 *                 description: Whether the community is private
 *     responses:
 *       201:
 *         description: Support community created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SupportCommunity'
 *       400:
 *         description: Missing parameter(s)!
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/support-communities:
 *   get:
 *     summary: Get all support communities
 *     tags: [SupportCommunities]
 *     responses:
 *       200:
 *         description: A list of support communities
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/SupportCommunity'
 *       404:
 *         description: No support communities found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/support-communities/{id}:
 *   get:
 *     summary: Get a single support community by ID
 *     tags: [SupportCommunities]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the support community to retrieve
 *     responses:
 *       200:
 *         description: Support community retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SupportCommunity'
 *       400:
 *         description: Missing ID parameter!
 *       404:
 *         description: Support community not found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/support-communities/{id}:
 *   put:
 *     summary: Update a support community
 *     tags: [SupportCommunities]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the support community to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The new name of the support community (optional)
 *               description:
 *                 type: string
 *                 description: The new description of the support community (optional)
 *               isPrivate:
 *                 type: boolean
 *                 description: Whether the community is private (optional)
 *     responses:
 *       200:
 *         description: Support community updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SupportCommunity'
 *       400:
 *         description: Missing parameter(s)!
 *       404:
 *         description: Support community not found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/support-communities/{id}:
 *   delete:
 *     summary: Delete a support community
 *     tags: [SupportCommunities]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the support community to delete
 *     responses:
 *       204:
 *         description: Support community deleted successfully
 *       400:
 *         description: Missing ID parameter!
 *       404:
 *         description: Support community not found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     SupportCommunity:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           description: The UUID of the support community
 *         moderatorId:
 *           type: string
 *           description: The ID of the moderator for the community
 *         name:
 *           type: string
 *           description: The name of the support community
 *         description:
 *           type: string
 *           description: A brief description of the support community
 *         isPrivate:
 *           type: boolean
 *           description: Whether the community is private
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: The time the support community was created
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: The time the support community was last updated
 */
