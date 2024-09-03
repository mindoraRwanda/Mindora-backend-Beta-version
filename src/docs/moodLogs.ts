/**
 * @swagger
 * /api/mood-logs:
 *   post:
 *     summary: Create a new mood log
 *     tags: [Mood Logs]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - userId
 *               - mood
 *               - rating
 *             properties:
 *               userId:
 *                 type: string
 *                 format: uuid
 *                 description: The UUID of the user
 *               mood:
 *                 type: string
 *                 description: Description of the mood
 *               rating:
 *                 type: integer
 *                 format: int32
 *                 description: Rating of the mood on a scale from 1 to 10
 *                 example: 7
 *               condition:
 *                 type: string
 *                 description: Additional condition related to the mood (optional)
 *               description:
 *                 type: string
 *                 description: Detailed description of the mood log (optional)
 *     responses:
 *       201:
 *         description: Mood log created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/MoodLog'
 *       400:
 *         description: Missing parameter(s) or invalid data
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/mood-logs/user/{userId}:
 *   get:
 *     summary: Get a mood log by ID
 *     tags: [Mood Logs]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: The UUID of the symptom log to retrieve
 *     responses:
 *       200:
 *         description: Mood log retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/MoodLog'
 *       400:
 *         description: Missing ID parameter!
 *       404:
 *         description: Mood logs not found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/mood-logs/{id}:
 *   get:
 *     summary: Get a mood log by ID
 *     tags: [Mood Logs]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: The UUID of the mood log to retrieve
 *     responses:
 *       200:
 *         description: Mood log retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/MoodLog'
 *       400:
 *         description: Missing ID parameter!
 *       404:
 *         description: Mood log not found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/mood-logs/{id}:
 *   put:
 *     summary: Update a mood log
 *     tags: [Mood Logs]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: The UUID of the mood log to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               mood:
 *                 type: string
 *                 description: Description of the mood
 *               rating:
 *                 type: integer
 *                 format: int32
 *                 description: Rating of the mood on a scale from 1 to 10
 *                 example: 8
 *               condition:
 *                 type: string
 *                 description: Additional condition related to the mood (optional)
 *               description:
 *                 type: string
 *                 description: Detailed description of the mood log (optional)
 *     responses:
 *       200:
 *         description: Mood log updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/MoodLog'
 *       400:
 *         description: Missing parameter(s) or invalid data
 *       404:
 *         description: Mood log not found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/mood-logs/{id}:
 *   delete:
 *     summary: Delete a mood log
 *     tags: [Mood Logs]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: The UUID of the mood log to delete
 *     responses:
 *       204:
 *         description: Mood log deleted successfully
 *       400:
 *         description: Missing ID parameter!
 *       404:
 *         description: Mood log not found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     MoodLog:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *           description: The UUID of the mood log
 *         userId:
 *           type: string
 *           format: uuid
 *           description: The UUID of the user
 *         mood:
 *           type: string
 *           description: Description of the mood
 *         rating:
 *           type: integer
 *           format: int32
 *           description: Rating of the mood on a scale from 1 to 10
 *         condition:
 *           type: string
 *           description: Additional condition related to the mood (optional)
 *         description:
 *           type: string
 *           description: Detailed description of the mood log (optional)
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: The time the mood log was created
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: The time the mood log was last updated
 */
