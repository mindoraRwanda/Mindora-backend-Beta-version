/**
 * @swagger
 * /api/user-exercise-responses:
 *   post:
 *     summary: Create a user exercise response
 *     tags: [UserExerciseResponses]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - userExerciseId
 *               - questionId
 *               - response
 *             properties:
 *               userExerciseId:
 *                 type: string
 *                 description: The ID of the user exercise
 *               questionId:
 *                 type: string
 *                 description: The ID of the exercise question
 *               response:
 *                 type: string
 *                 description: The user's response to the question
 *     responses:
 *       201:
 *         description: User exercise response created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserExerciseResponse'
 *       400:
 *         description: Missing parameter(s)!
 *       404:
 *         description: Exercise question or user exercise not found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/user-exercise-responses:
 *   get:
 *     summary: Get all user exercise responses
 *     tags: [UserExerciseResponses]
 *     responses:
 *       200:
 *         description: A list of user exercise responses
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/UserExerciseResponse'
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/user-exercise-responses/{id}:
 *   get:
 *     summary: Get a user exercise response by ID
 *     tags: [UserExerciseResponses]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the user exercise response to retrieve
 *     responses:
 *       200:
 *         description: User exercise response retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserExerciseResponse'
 *       400:
 *         description: Missing parameter(s)!
 *       404:
 *         description: User exercise response not found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/user-exercise-responses/{id}:
 *   put:
 *     summary: Update a user exercise response
 *     tags: [UserExerciseResponses]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the user exercise response to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - userExerciseId
 *               - questionId
 *               - response
 *             properties:
 *               userExerciseId:
 *                 type: string
 *                 description: The ID of the user exercise
 *               questionId:
 *                 type: string
 *                 description: The ID of the exercise question
 *               response:
 *                 type: string
 *                 description: The updated response to the question
 *     responses:
 *       200:
 *         description: User exercise response updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserExerciseResponse'
 *       400:
 *         description: Missing parameter(s)!
 *       404:
 *         description: User exercise response, question, or exercise not found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/user-exercise-responses/{id}:
 *   delete:
 *     summary: Delete a user exercise response
 *     tags: [UserExerciseResponses]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the user exercise response to delete
 *     responses:
 *       204:
 *         description: User exercise response deleted successfully
 *       400:
 *         description: Missing parameter(s)!
 *       404:
 *         description: User exercise response not found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     UserExerciseResponse:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           description: The UUID of the user exercise response
 *         userExerciseId:
 *           type: string
 *           description: The UUID of the user exercise
 *         questionId:
 *           type: string
 *           description: The UUID of the exercise question
 *         response:
 *           type: string
 *           description: The user's response to the question
 *         isCorrect:
 *           type: boolean
 *           description: Whether the response was correct
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: The time the response was created
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: The time the response was last updated
 */
