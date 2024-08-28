/**
 * @swagger
 * /api/messages:
 *   post:
 *     summary: Create a new message
 *     tags: [Messages]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - chatId
 *               - senderId
 *               - receiverId
 *               - messageType
 *             properties:
 *               chatId:
 *                 type: string
 *                 description: The ID of the chat
 *               senderId:
 *                 type: string
 *                 description: The ID of the sender
 *               receiverId:
 *                 type: string
 *                 description: The ID of the receiver
 *               messageType:
 *                 type: string
 *                 description: The type of the message (e.g., text, image, video)
 *               messageText:
 *                 type: string
 *                 description: The content of the message (optional)
 *               mediaUrl:
 *                 type: string
 *                 description: The URL of the media file (optional)
 *               mediaSize:
 *                 type: integer
 *                 description: The size of the media file in bytes (optional)
 *               mediaDuration:
 *                 type: integer
 *                 description: The duration of the media file in seconds (optional)
 *     responses:
 *       201:
 *         description: Message created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Message'
 *       400:
 *         description: Missing required parameters!
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/messages:
 *   get:
 *     summary: Get all messages
 *     tags: [Messages]
 *     responses:
 *       200:
 *         description: A list of all messages
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Message'
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/chats/{chatId}/messages:
 *   get:
 *     summary: Get messages by chat ID
 *     tags: [Messages]
 *     parameters:
 *       - in: path
 *         name: chatId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the chat
 *     responses:
 *       200:
 *         description: A list of messages for the specified chat
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Message'
 *       400:
 *         description: Missing chatId parameter!
 *       404:
 *         description: No messages found for this chat
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/messages/{id}:
 *   get:
 *     summary: Get a single message by ID
 *     tags: [Messages]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the message
 *     responses:
 *       200:
 *         description: Message retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Message'
 *       400:
 *         description: Missing ID parameter!
 *       404:
 *         description: Message not found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/messages/{id}:
 *   put:
 *     summary: Update a message
 *     tags: [Messages]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the message
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               messageText:
 *                 type: string
 *                 description: The new content of the message (optional)
 *               mediaUrl:
 *                 type: string
 *                 description: The new URL of the media file (optional)
 *               mediaSize:
 *                 type: integer
 *                 description: The new size of the media file in bytes (optional)
 *               mediaDuration:
 *                 type: integer
 *                 description: The new duration of the media file in seconds (optional)
 *     responses:
 *       200:
 *         description: Message updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Message'
 *       400:
 *         description: Missing parameter(s)!
 *       404:
 *         description: Message not found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/messages/{id}:
 *   delete:
 *     summary: Delete a message
 *     tags: [Messages]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the message
 *     responses:
 *       204:
 *         description: Message deleted successfully
 *       400:
 *         description: Missing ID parameter!
 *       404:
 *         description: Message not found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Message:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           description: The UUID of the message
 *         chatId:
 *           type: string
 *           description: The ID of the chat
 *         senderId:
 *           type: string
 *           description: The ID of the sender
 *         receiverId:
 *           type: string
 *           description: The ID of the receiver
 *         messageType:
 *           type: string
 *           description: The type of the message (e.g., text, image, video)
 *         messageText:
 *           type: string
 *           description: The content of the message
 *         mediaUrl:
 *           type: string
 *           description: The URL of the media file (optional)
 *         mediaSize:
 *           type: integer
 *           description: The size of the media file in bytes (optional)
 *         mediaDuration:
 *           type: integer
 *           description: The duration of the media file in seconds (optional)
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: The time the message was created
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: The time the message was last updated
 */
