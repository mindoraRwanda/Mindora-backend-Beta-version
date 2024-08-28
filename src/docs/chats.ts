/**
 * @swagger
 * /api/chats:
 *   post:
 *     summary: Create a new chat
 *     tags: [Chats]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - chatName
 *             properties:
 *               chatName:
 *                 type: string
 *                 description: The name of the chat
 *               lastMessageId:
 *                 type: string
 *                 description: The ID of the last message in the chat (optional)
 *     responses:
 *       201:
 *         description: Chat created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Chat'
 *       400:
 *         description: Missing parameter(s)!
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/chats:
 *   get:
 *     summary: Get all chats
 *     tags: [Chats]
 *     responses:
 *       200:
 *         description: A list of chats
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Chat'
 *       404:
 *         description: No chats found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/chats/user/{userId}:
 *   get:
 *     summary: Get all chats a user is part of by userId
 *     tags: [Chats]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the user to retrieve chats for
 *     responses:
 *       200:
 *         description: A list of chats for the user
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Chat'
 *       400:
 *         description: Missing userId parameter
 *       404:
 *         description: No chats found for this user
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/chats/{id}:
 *   get:
 *     summary: Get a single chat by ID
 *     tags: [Chats]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the chat to retrieve
 *     responses:
 *       200:
 *         description: Chat retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Chat'
 *       400:
 *         description: Missing parameter(s)!
 *       404:
 *         description: Chat not found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/chats/{id}:
 *   put:
 *     summary: Update a chat
 *     tags: [Chats]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the chat to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               chatName:
 *                 type: string
 *                 description: The new name of the chat (optional)
 *               lastMessageId:
 *                 type: string
 *                 description: The new ID of the last message in the chat (optional)
 *     responses:
 *       200:
 *         description: Chat updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Chat'
 *       400:
 *         description: Missing parameter(s)!
 *       404:
 *         description: Chat not found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/chats/{id}:
 *   delete:
 *     summary: Delete a chat
 *     tags: [Chats]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the chat to delete
 *     responses:
 *       204:
 *         description: Chat deleted successfully
 *       400:
 *         description: Missing parameter(s)!
 *       404:
 *         description: Chat not found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Chat:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           description: The UUID of the chat
 *         chatName:
 *           type: string
 *           description: The name of the chat
 *         lastMessageId:
 *           type: string
 *           description: The ID of the last message in the chat (optional)
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: The time the chat was created
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: The time the chat was last updated
 */
