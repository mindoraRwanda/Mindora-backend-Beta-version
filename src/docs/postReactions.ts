/**
 * @swagger
 * /api/post/reactions:
 *   post:
 *     summary: Create or update a post reaction
 *     tags: [Post reactions]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - postId
 *               - userId
 *             properties:
 *               postId:
 *                 type: string
 *                 description: The ID of the post
 *               commentId:
 *                 type: string
 *                 description: The ID of the comment (optional)
 *               userId:
 *                 type: string
 *                 description: The ID of the user
 *               isLike:
 *                 type: boolean
 *                 description: Indicates if the reaction is a like
 *               isDislike:
 *                 type: boolean
 *                 description: Indicates if the reaction is a dislike
 *               emojiType:
 *                 type: string
 *                 description: The type of emoji reaction
 *     responses:
 *       201:
 *         description: Reaction created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/PostReaction'
 *       200:
 *         description: Reaction updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/PostReaction'
 *       204:
 *         description: reaction removed (undo reaction)
 *       400:
 *         description: Missing parameter(s)!
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/post/reactions/all/{postId}:
 *   get:
 *     summary: Get all reactions for a specific post
 *     tags: [Post reactions]
 *     parameters:
 *       - in: path
 *         name: postId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the post to retrieve reactions for
 *     responses:
 *       200:
 *         description: A list of reactions
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/PostReaction'
 *       400:
 *         description: Missing post ID parameter!
 *       404:
 *         description: Reactions not found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/post/comments/reactions/{commentId}:
 *   get:
 *     summary: Get all reactions for a specific comment
 *     tags: [Post reactions]
 *     parameters:
 *       - in: path
 *         name: commentId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the comment to retrieve reactions for
 *     responses:
 *       200:
 *         description: A list of reactions
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/PostReaction'
 *       400:
 *         description: Missing post ID parameter!
 *       404:
 *         description: Reactions not found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/post/reactions/{id}:
 *   get:
 *     summary: Get a post reaction by its ID
 *     tags: [Post reactions]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the reaction to retrieve
 *     responses:
 *       200:
 *         description: Reaction retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/PostReaction'
 *       400:
 *         description: Missing ID parameter!
 *       404:
 *         description: Reaction not found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/post/reactions/{id}:
 *   put:
 *     summary: Update a post reaction by its ID
 *     tags: [Post reactions]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the reaction to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               isLike:
 *                 type: boolean
 *                 description: Indicates if the reaction is a like
 *               isDislike:
 *                 type: boolean
 *                 description: Indicates if the reaction is a dislike
 *               emojiType:
 *                 type: string
 *                 description: The type of emoji reaction
 *     responses:
 *       200:
 *         description: Reaction updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/PostReaction'
 *       400:
 *         description: Missing parameter(s)!
 *       404:
 *         description: Reaction not found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/post/reactions/{id}:
 *   delete:
 *     summary: Delete a post reaction by its ID
 *     tags: [Post reactions]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the reaction to delete
 *     responses:
 *       204:
 *         description: Reaction deleted successfully
 *       400:
 *         description: Missing ID parameter!
 *       404:
 *         description: Reaction not found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     PostReaction:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           description: The UUID of the reaction
 *         postId:
 *           type: string
 *           description: The UUID of the post
 *         commentId:
 *           type: string
 *           description: The UUID of the comment (optional)
 *         userId:
 *           type: string
 *           description: The UUID of the user
 *         isLike:
 *           type: boolean
 *           description: Indicates if the reaction is a like
 *         isDislike:
 *           type: boolean
 *           description: Indicates if the reaction is a dislike
 *         emojiType:
 *           type: string
 *           description: The type of emoji reaction
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: The time the reaction was created
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: The time the reaction was last updated
 */
