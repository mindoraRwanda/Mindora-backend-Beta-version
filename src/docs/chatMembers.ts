/**
 * @swagger
 * /api/chat_members:
 *   post:
 *     summary: Create a new chat member
 *     tags: [Chat members]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - chatId
 *               - userId
 *             properties:
 *               chatId:
 *                 type: string
 *                 description: The ID of the chat
 *               userId:
 *                 type: string
 *                 description: The ID of the user
 *               role:
 *                 type: string
 *                 description: The role of the user in the chat (optional)
 *     responses:
 *       201:
 *         description: Chat member created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ChatMember'
 *       400:
 *         description: Missing parameter(s)!
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/chat_members:
 *   get:
 *     summary: Get all chat members
 *     tags: [Chat members]
 *     responses:
 *       200:
 *         description: A list of chat members
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/ChatMember'
 *       404:
 *         description: No chat members found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/chat_members/{chatId}:
 *   get:
 *     summary: Get a single chat member by chatId
 *     tags: [Chat members]
 *     parameters:
 *       - in: path
 *         name: chatId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the chat
 *     responses:
 *       200:
 *         description: Chat member retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ChatMember'
 *       400:
 *         description: Missing parameter(s)!
 *       404:
 *         description: Chat Member not found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/chat_members/{chatId}:
 *   put:
 *     summary: Update a chat member
 *     tags: [Chat members]
 *     parameters:
 *       - in: path
 *         name: chatId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the chat
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: string
 *                 description: The new ID of the user (optional)
 *               role:
 *                 type: string
 *                 description: The new role of the user in the chat (optional)
 *     responses:
 *       200:
 *         description: Chat member updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ChatMember'
 *       400:
 *         description: Missing parameter(s)!
 *       404:
 *         description: Chat Member not found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/chat_members/{chatId}:
 *   delete:
 *     summary: Delete a chat member
 *     tags: [Chat members]
 *     parameters:
 *       - in: path
 *         name: chatId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the chat
 *     responses:
 *       204:
 *         description: Chat member deleted successfully
 *       400:
 *         description: Missing parameter(s)!
 *       404:
 *         description: Chat Member not found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     ChatMember:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           description: The UUID of the chat member
 *         chatId:
 *           type: string
 *           description: The ID of the chat
 *         userId:
 *           type: string
 *           description: The ID of the user
 *         role:
 *           type: string
 *           description: The role of the user in the chat (optional)
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: The time the chat member was created
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: The time the chat member was last updated
 */
