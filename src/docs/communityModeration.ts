/**
 * @swagger
 * /api/community/moderation-actions:
 *   post:
 *     summary: Create a new moderation action
 *     tags: [Community Moderation Actions]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - postId
 *               - actionTaken
 *               - actionBy
 *               - reason
 *             properties:
 *               postId:
 *                 type: string
 *                 description: The ID of the post on which action is taken
 *               commentId:
 *                 type: string
 *                 description: The ID of the comment on which action is taken
 *               actionTaken:
 *                 type: string
 *                 example: "Remove Post"
 *                 description: The type of moderation action
 *               actionBy:
 *                 type: string
 *                 description: The ID of the user who performed the action
 *               reason:
 *                 type: string
 *                 description: The reason for the moderation action
 *     responses:
 *       201:
 *         description: Moderation action created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ModerationAction'
 *       400:
 *         description: Missing or invalid parameter(s)
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/community/moderation-actions:
 *   get:
 *     summary: Get all moderation actions
 *     tags: [Community Moderation Actions]
 *     responses:
 *       200:
 *         description: A list of moderation actions
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/ModerationAction'
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/community/moderation-actions/{id}:
 *   get:
 *     summary: Get a moderation action by ID
 *     tags: [Community Moderation Actions]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the moderation action to retrieve
 *     responses:
 *       200:
 *         description: Moderation action retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ModerationAction'
 *       400:
 *         description: Missing or invalid parameter(s)
 *       404:
 *         description: Moderation action not found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/community/moderation-actions/{id}:
 *   put:
 *     summary: Update a moderation action
 *     tags: [Community Moderation Actions]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the moderation action to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               postId:
 *                 type: string
 *                 description: The ID of the post on which action is taken
 *               commentId:
 *                 type: string
 *                 description: The ID of the comment on which action is taken
 *               actionTaken:
 *                 type: string
 *                 example: "Remove Post"
 *                 description: The type of moderation action
 *               actionBy:
 *                 type: string
 *                 description: The ID of the user who performed the action
 *               reason:
 *                 type: string
 *                 description: The reason for the moderation action
 *     responses:
 *       200:
 *         description: Moderation action updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ModerationAction'
 *       400:
 *         description: Missing or invalid parameter(s)
 *       404:
 *         description: Moderation action not found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/community/moderation-actions/{id}:
 *   delete:
 *     summary: Delete a moderation action
 *     tags: [Community Moderation Actions]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the moderation action to delete
 *     responses:
 *       204:
 *         description: Moderation action deleted successfully
 *       400:
 *         description: Missing or invalid parameter(s)
 *       404:
 *         description: Moderation action not found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     ModerationAction:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           description: The UUID of the moderation action
 *         postId:
 *           type: string
 *           description: The UUID of the moderator
 *         commentId:
 *           type: string
 *           description: The ID of the comment on which action is taken
 *         actionTaken:
 *           type: string
 *           example: "Remove Post"
 *           description: The type of moderation action
 *         actionBy:
 *           type: string
 *           description: The UUID of the user who taken the action
 *         reason:
 *           type: string
 *           description: The reason for the moderation action
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: The time the moderation action was created
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: The time the moderation action was last updated
 */
