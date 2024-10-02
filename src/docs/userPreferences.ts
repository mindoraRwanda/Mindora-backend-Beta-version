/**
 * @swagger
 * /api/user-preferences:
 *   post:
 *     summary: Create new user preferences
 *     tags: [User Preferences]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - userId
 *               - preferredLanguage
 *               - communicationMethods
 *               - notificationSettings
 *             properties:
 *               userId:
 *                 type: string
 *                 description: The ID of the user
 *               preferredLanguage:
 *                 type: string
 *                 description: The preferred language of the user
 *               communicationMethods:
 *                 type: object
 *                 description: The preferred communication methods of the user
 *               notificationSettings:
 *                 type: object
 *                 description: The notification settings for the user
 *     responses:
 *       201:
 *         description: User Preferences created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserPreferences'
 *       400:
 *         description: Missing parameter(s)!
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/user-preferences:
 *   get:
 *     summary: Get all user preferences
 *     tags: [User Preferences]
 *     responses:
 *       200:
 *         description: A list of user preferences
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/UserPreferences'
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/user-preferences/{userId}:
 *   get:
 *     summary: Get user preferences by ID
 *     tags: [User Preferences]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the user whose preferences to retrieve
 *     responses:
 *       200:
 *         description: User Preferences retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserPreferences'
 *       400:
 *         description: Missing parameter(s)!
 *       404:
 *         description: User Preferences not found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/user-preferences/{userId}:
 *   put:
 *     summary: Update user preferences
 *     tags: [User Preferences]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the user whose preferences to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               preferredLanguage:
 *                 type: string
 *                 description: The preferred language of the user
 *               communicationMethods:
 *                 type: object
 *                 description: The preferred communication methods of the user
 *               notificationSettings:
 *                 type: object
 *                 description: The notification settings for the user
 *     responses:
 *       200:
 *         description: User Preferences updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserPreferences'
 *       400:
 *         description: Missing parameter(s)!
 *       404:
 *         description: User Preferences not found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/user-preferences/{id}:
 *   delete:
 *     summary: Delete user preferences
 *     tags: [User Preferences]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the user preferences to delete
 *     responses:
 *       204:
 *         description: User Preferences deleted successfully
 *       400:
 *         description: Missing parameter(s)!
 *       404:
 *         description: User Preferences not found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     UserPreferences:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           description: The UUID of the user preferences
 *         userId:
 *           type: string
 *           description: The UUID of the user
 *         preferredLanguage:
 *           type: string
 *           description: The preferred language of the user
 *         communicationMethods:
 *           type: object
 *           description: The communication methods of the user
 *         notificationSettings:
 *           type: object
 *           description: The notification settings of the user
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: The time the user preferences were created
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: The time the user preferences were last updated
 */
