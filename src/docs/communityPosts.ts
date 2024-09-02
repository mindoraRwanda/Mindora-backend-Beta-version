/**
 * @swagger
 * /api/posts:
 *   post:
 *     summary: Create a new community post
 *     tags: [Community Posts]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - createdBy
 *               - communityId
 *             properties:
 *               communityId:
 *                 type: string
 *                 description: The ID of the community in which user posted
 *               title:
 *                 type: string
 *                 description: The title of the community post
 *               content:
 *                 type: string
 *                 description: The content of the community post
 *               createdBy:
 *                 type: string
 *                 description: The ID of user who created the community post
 *               isFlagged:
 *                 type: boolean
 *                 description: The marker of post as good or bad content
 *               attachments:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: binary
 *                 description: An array of attachment files to upload (e.g., image, document)
 *                 maxItems: 5  // You can specify the maximum number of files allowed
 *     responses:
 *       201:
 *         description: Community post created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CommunityPost'
 *       400:
 *         description: Missing parameter(s)!
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/posts/{id}:
 *   get:
 *     summary: Get a community post by ID
 *     tags: [Community Posts]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the community post to retrieve
 *     responses:
 *       200:
 *         description: Community post retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CommunityPost'
 *       400:
 *         description: Missing parameter(s)!
 *       404:
 *         description: Community post not found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/posts/{id}:
 *   put:
 *     summary: Update a community post
 *     tags: [Community Posts]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the community post to update
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               isFlagged:
 *                 type: boolean
 *                 description: The marker of post as good or bad content
 *               title:
 *                 type: string
 *                 description: The title of the community post
 *               content:
 *                 type: string
 *                 description: The content of the community post
 *               attachments:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: binary
 *                 description: An array of attachment files to upload (e.g., image, document)
 *                 maxItems: 5  // You can specify the maximum number of files allowed
 *     responses:
 *       200:
 *         description: Community post updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CommunityPost'
 *       400:
 *         description: Missing parameter(s)!
 *       404:
 *         description: Community post not found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/posts/{id}:
 *   delete:
 *     summary: Delete a community post
 *     tags: [Community Posts]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the community post to delete
 *     responses:
 *       204:
 *         description: Community post deleted successfully
 *       400:
 *         description: Missing parameter(s)!
 *       404:
 *         description: Community post not found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/posts:
 *   get:
 *     summary: Get all community posts
 *     tags: [Community Posts]
 *     responses:
 *       200:
 *         description: A list of community posts
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/CommunityPost'
 *       404:
 *         description: No community posts found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     CommunityPost:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           description: The UUID of the community post
 *         title:
 *           type: string
 *           description: The title of the community post
 *         content:
 *           type: string
 *           description: The content of the community post
 *         attachments:
 *           type: array
 *           items:
 *             type: string
 *             description: The URL of the attached files
 *           description: A list of URLs for the attachments
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: The time the community post was created
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: The time the community post was last updated
 */
