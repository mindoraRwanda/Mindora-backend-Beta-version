/**
 * @swagger
 * /api/post/comments:
 *   post:
 *     summary: Create a new comment
 *     tags: [Comments]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - content
 *               - createdBy
 *               - postId
 *             properties:
 *               postId:
 *                 type: string
 *                 description: The ID of the post to which the comment belongs
 *               content:
 *                 type: string
 *                 description: The content of the comment
 *               createdBy:
 *                 type: string
 *                 description: The ID of the user who created the comment
 *               parentCommentId:
 *                 type: string
 *                 description: The ID of the parent comment, if this is a reply
 *               isFlagged:
 *                 type: boolean
 *                 description: The marker of the comment as good or bad content
 *               attachments:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: binary
 *                 description: An array of attachment files to upload (e.g., image, document)
 *                 maxItems: 5
 *     responses:
 *       201:
 *         description: Comment created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Comment'
 *       400:
 *         description: Missing parameter(s)!
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/post/comments/{id}:
 *   get:
 *     summary: Get a comment by ID
 *     tags: [Comments]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the comment to retrieve
 *     responses:
 *       200:
 *         description: Comment retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Comment'
 *       400:
 *         description: Missing parameter(s)!
 *       404:
 *         description: Comment not found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/post/comments/{id}:
 *   put:
 *     summary: Update a comment
 *     tags: [Comments]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the comment to update
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               content:
 *                 type: string
 *                 description: The content of the comment
 *               isFlagged:
 *                 type: boolean
 *                 description: The marker of the comment as good or bad content
 *               attachments:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: binary
 *                 description: An array of attachment files to upload (e.g., image, document)
 *                 maxItems: 5
 *     responses:
 *       200:
 *         description: Comment updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Comment'
 *       400:
 *         description: Missing parameter(s)!
 *       404:
 *         description: Comment not found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/post/comments/{id}:
 *   delete:
 *     summary: Delete a comment
 *     tags: [Comments]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the comment to delete
 *     responses:
 *       204:
 *         description: Comment deleted successfully
 *       400:
 *         description: Missing parameter(s)!
 *       404:
 *         description: Comment not found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/post/comments:
 *   get:
 *     summary: Get all comments
 *     tags: [Comments]
 *     responses:
 *       200:
 *         description: A list of comments
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Comment'
 *       404:
 *         description: No comments found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/post/{postId}/comments:
 *   get:
 *     summary: Get all comments for a specific post
 *     tags: [Comments]
 *     parameters:
 *       - in: path
 *         name: postId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the post to retrieve comments for
 *     responses:
 *       200:
 *         description: A list of comments for the post
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Comment'
 *       400:
 *         description: Missing post ID
 *       404:
 *         description: Post comments not found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Comment:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           description: The UUID of the comment
 *         content:
 *           type: string
 *           description: The content of the comment
 *         isFlagged:
 *           type: boolean
 *           description: Whether the comment is flagged
 *         createdBy:
 *           type: string
 *           description: The ID of the user who created the comment
 *         postId:
 *           type: string
 *           description: The ID of the post to which the comment belongs
 *         parentCommentId:
 *           type: string
 *           description: The ID of the parent comment, if this is a reply
 *         attachments:
 *           type: array
 *           items:
 *             type: string
 *             description: The URL of the attached files
 *           description: A list of URLs for the attachments
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: The time the comment was created
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: The time the comment was last updated
 */
