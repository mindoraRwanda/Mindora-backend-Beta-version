/**
 * @swagger
 * /api/user-communities:
 *   post:
 *     summary: Create a new user community
 *     tags: [User Communities]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - communityId
 *               - userId
 *               - role
 *               - status
 *             properties:
 *               communityId:
 *                 type: string
 *                 description: The ID of the community
 *               userId:
 *                 type: string
 *                 description: The ID of the user
 *               role:
 *                 type: string
 *                 description: The role of the user in the community
 *               status:
 *                 type: string
 *                 description: The status of the user in the community (e.g., "Active", "Banned")
 *     responses:
 *       201:
 *         description: User community created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserCommunity'
 *       400:
 *         description: Missing parameter(s)!
 *       409:
 *         description: User is already part of this community
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/user-communities/{userId}:
 *   get:
 *     summary: Get all user communities for a specific user
 *     tags: [User Communities]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the user whose communities to retrieve
 *     responses:
 *       200:
 *         description: A list of user communities
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/UserCommunity'
 *       400:
 *         description: Missing user ID parameter!
 *       404:
 *         description: User communities not found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/user-communities/{communityId}/{userId}:
 *   get:
 *     summary: Get a user community by community ID and user ID
 *     tags: [User Communities]
 *     parameters:
 *       - in: path
 *         name: communityId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the community
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the user
 *     responses:
 *       200:
 *         description: User community retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserCommunity'
 *       400:
 *         description: Missing ID parameter(s)!
 *       404:
 *         description: User community not found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/user-communities/{communityId}/{userId}:
 *   put:
 *     summary: Update a user community
 *     tags: [User Communities]
 *     parameters:
 *       - in: path
 *         name: communityId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the community to which user belongs
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               communityId:
 *                 type: string
 *                 description: The ID of the community
 *               userId:
 *                 type: string
 *                 description: The ID of the user
 *               role:
 *                 type: string
 *                 description: The role of the user in the community
 *               status:
 *                 type: string
 *                 description: The status of the user in the community
 *     responses:
 *       200:
 *         description: User community updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserCommunity'
 *       400:
 *         description: Missing parameter(s)!
 *       404:
 *         description: User community not found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/user-communities/{communityId}/{userId}:
 *   delete:
 *     summary: Delete a user community
 *     tags: [User Communities]
 *     parameters:
 *       - in: path
 *         name: communityId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the community to which user belongs
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the user to delete from the community
 *     responses:
 *       204:
 *         description: User community deleted successfully
 *       400:
 *         description: Missing ID parameter(s)!
 *       404:
 *         description: User community not found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     UserCommunity:
 *       type: object
 *       properties:
 *         communityId:
 *           type: string
 *           description: The UUID of the community
 *         userId:
 *           type: string
 *           description: The UUID of the user
 *         role:
 *           type: string
 *           description: The role of the user in the community (e.g., "Admin", "Member")
 *         status:
 *           type: string
 *           description: The status of the user in the community (e.g., "Active", "Banned")
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: The time the user community was created
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: The time the user community was last updated
 */
