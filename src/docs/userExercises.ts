/**
 * @swagger
 * /api/user-exercises:
 *   post:
 *     summary: Create a new user exercise
 *     tags: [UserExercises]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - userId
 *               - exerciseId
 *               - score
 *               - progress
 *               - status
 *             properties:
 *               userId:
 *                 type: string
 *                 description: The UUID of the user
 *               exerciseId:
 *                 type: string
 *                 description: The UUID of the exercise
 *               score:
 *                 type: number
 *                 description: The score achieved by the user in the exercise
 *               progress:
 *                 type: number
 *                 description: The progress of the user in the exercise (0 to 100)
 *               status:
 *                 type: string
 *                 enum: [Pending, InProgress, Completed]
 *                 description: The status of the exercise
 *               completedAt:
 *                 type: string
 *                 format: date-time
 *                 description: The time when the exercise was completed
 *     responses:
 *       201:
 *         description: User exercise created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserExercise'
 *       400:
 *         description: Missing parameter(s)!
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/user-exercises:
 *   get:
 *     summary: Get all user exercises
 *     tags: [UserExercises]
 *     responses:
 *       200:
 *         description: A list of user exercises
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/UserExercise'
 *       404:
 *         description: User exercises not found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/user-exercises/{id}:
 *   get:
 *     summary: Get a user exercise by ID
 *     tags: [UserExercises]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the user exercise to retrieve
 *     responses:
 *       200:
 *         description: User exercise retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserExercise'
 *       400:
 *         description: Missing ID parameter!
 *       404:
 *         description: User exercise not found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/user-exercises/{id}:
 *   put:
 *     summary: Update a user exercise
 *     tags: [UserExercises]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the user exercise to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               score:
 *                 type: number
 *                 description: The score achieved by the user in the exercise
 *               progress:
 *                 type: number
 *                 description: The progress of the user in the exercise (0 to 100)
 *               status:
 *                 type: string
 *                 enum: [Pending, InProgress, Completed]
 *                 description: The status of the exercise
 *               completedAt:
 *                 type: string
 *                 format: date-time
 *                 description: The time when the exercise was completed
 *     responses:
 *       200:
 *         description: User exercise updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserExercise'
 *       400:
 *         description: Missing parameter(s)!
 *       404:
 *         description: User exercise not found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/user-exercises/{id}:
 *   delete:
 *     summary: Delete a user exercise
 *     tags: [UserExercises]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the user exercise to delete
 *     responses:
 *       204:
 *         description: User exercise deleted successfully
 *       400:
 *         description: Missing ID parameter!
 *       404:
 *         description: User exercise not found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     UserExercise:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           description: The UUID of the user exercise
 *         userId:
 *           type: string
 *           description: The UUID of the user
 *         exerciseId:
 *           type: string
 *           description: The UUID of the exercise
 *         score:
 *           type: number
 *           description: The score achieved by the user in the exercise
 *         progress:
 *           type: number
 *           description: The progress of the user in the exercise (0 to 100)
 *         status:
 *           type: string
 *           enum: [Pending, InProgress, Completed]
 *           description: The status of the exercise
 *         completedAt:
 *           type: string
 *           format: date-time
 *           description: The time when the exercise was completed
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: The time the user exercise was created
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: The time the user exercise was last updated
 */
