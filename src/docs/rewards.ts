/**
 * @swagger
 * /api/rewards:
 *   post:
 *     summary: Create a new reward
 *     tags: [Rewards]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - pointsRequired
 *               - description
 *             properties:
 *               name:
 *                 type: string
 *                 description: The name of the reward
 *               pointsRequired:
 *                 type: integer
 *                 description: The number of points required to redeem the reward
 *               description:
 *                 type: string
 *                 description: The description of the reward
 *     responses:
 *       201:
 *         description: Reward created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Reward'
 *       400:
 *         description: Missing parameter(s)!
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/rewards:
 *   get:
 *     summary: Get all rewards
 *     tags: [Rewards]
 *     responses:
 *       200:
 *         description: A list of rewards
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Reward'
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/rewards/{id}:
 *   get:
 *     summary: Get a reward by ID
 *     tags: [Rewards]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the reward to retrieve
 *     responses:
 *       200:
 *         description: Reward retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Reward'
 *       400:
 *         description: Missing parameter(s)!
 *       404:
 *         description: Reward not found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/rewards/{id}:
 *   put:
 *     summary: Update a reward
 *     tags: [Rewards]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the reward to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The name of the reward
 *               pointsRequired:
 *                 type: integer
 *                 description: The number of points required to redeem the reward
 *               description:
 *                 type: string
 *                 description: The description of the reward
 *     responses:
 *       200:
 *         description: Reward updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Reward'
 *       400:
 *         description: Missing parameter(s)!
 *       404:
 *         description: Reward not found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/rewards/{id}:
 *   delete:
 *     summary: Delete a reward
 *     tags: [Rewards]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the reward to delete
 *     responses:
 *       204:
 *         description: Reward deleted successfully
 *       400:
 *         description: Missing parameter(s)!
 *       404:
 *         description: Reward not found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Reward:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           description: The UUID of the reward
 *         name:
 *           type: string
 *           description: The name of the reward
 *         pointsRequired:
 *           type: integer
 *           description: The number of points required to redeem the reward
 *         description:
 *           type: string
 *           description: The description of the reward
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: The time the reward was created
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: The time the reward was last updated
 */
