/**
 * @swagger
 * /api/user-rewards:
 *   post:
 *     summary: Create a new user reward
 *     tags: [UserRewards]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - userId
 *               - rewardId
 *             properties:
 *               userId:
 *                 type: string
 *                 description: The ID of the user
 *               rewardId:
 *                 type: string
 *                 description: The ID of the reward
 *     responses:
 *       201:
 *         description: User reward created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserReward'
 *       400:
 *         description: Missing parameter(s)!
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/user-rewards:
 *   get:
 *     summary: Get all user rewards
 *     tags: [UserRewards]
 *     responses:
 *       200:
 *         description: A list of user rewards
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/UserReward'
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/user-rewards/{id}:
 *   get:
 *     summary: Get a user reward by ID
 *     tags: [UserRewards]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the user reward to retrieve
 *     responses:
 *       200:
 *         description: User reward retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserReward'
 *       400:
 *         description: Missing parameter(s)!
 *       404:
 *         description: User reward not found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/user-rewards/{id}:
 *   put:
 *     summary: Update a user reward
 *     tags: [UserRewards]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the user reward to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: string
 *                 description: The ID of the user
 *               rewardId:
 *                 type: string
 *                 description: The ID of the reward
 *     responses:
 *       200:
 *         description: User reward updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserReward'
 *       400:
 *         description: Missing parameter(s)!
 *       404:
 *         description: User reward not found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/user-rewards/{id}:
 *   delete:
 *     summary: Delete a user reward
 *     tags: [UserRewards]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the user reward to delete
 *     responses:
 *       204:
 *         description: User reward deleted successfully
 *       400:
 *         description: Missing parameter(s)!
 *       404:
 *         description: User reward not found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     UserReward:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           description: The UUID of the user reward
 *         userId:
 *           type: string
 *           description: The UUID of the user
 *         rewardId:
 *           type: string
 *           description: The UUID of the reward
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: The time the user reward was created
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: The time the user reward was last updated
 */
