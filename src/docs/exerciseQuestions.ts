/**
 * @swagger
 * /api/exercise-questions:
 *   post:
 *     summary: Create a new exercise question
 *     tags: [ExerciseQuestions]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - exerciseId
 *               - question
 *               - correctAnswer
 *             properties:
 *               exerciseId:
 *                 type: string
 *                 description: The ID of the exercise this question belongs to
 *               question:
 *                 type: string
 *                 description: The question text
 *               correctAnswer:
 *                 type: string
 *                 description: The correct answer to the question
 *     responses:
 *       201:
 *         description: Exercise question created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ExerciseQuestion'
 *       400:
 *         description: Missing parameter(s)!
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/exercise-questions:
 *   get:
 *     summary: Get all exercise questions
 *     tags: [ExerciseQuestions]
 *     responses:
 *       200:
 *         description: A list of exercise questions
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/ExerciseQuestion'
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/exercise-questions/{id}:
 *   get:
 *     summary: Get an exercise question by ID
 *     tags: [ExerciseQuestions]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the exercise question to retrieve
 *     responses:
 *       200:
 *         description: Exercise question retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ExerciseQuestion'
 *       400:
 *         description: Missing parameter(s)!
 *       404:
 *         description: Exercise question not found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/exercise-questions/{id}:
 *   put:
 *     summary: Update an exercise question
 *     tags: [ExerciseQuestions]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the exercise question to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               exerciseId:
 *                 type: string
 *                 description: The ID of the exercise this question belongs to
 *               question:
 *                 type: string
 *                 description: The question text
 *               correctAnswer:
 *                 type: string
 *                 description: The correct answer to the question
 *     responses:
 *       200:
 *         description: Exercise question updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ExerciseQuestion'
 *       400:
 *         description: Missing parameter(s)!
 *       404:
 *         description: Exercise question not found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/exercise-questions/{id}:
 *   delete:
 *     summary: Delete an exercise question
 *     tags: [ExerciseQuestions]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the exercise question to delete
 *     responses:
 *       204:
 *         description: Exercise question deleted successfully
 *       400:
 *         description: Missing parameter(s)!
 *       404:
 *         description: Exercise question not found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     ExerciseQuestion:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           description: The UUID of the exercise question
 *         exerciseId:
 *           type: string
 *           description: The UUID of the exercise this question belongs to
 *         question:
 *           type: string
 *           description: The question text
 *         correctAnswer:
 *           type: string
 *           description: The correct answer to the question
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: The time the exercise question was created
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: The time the exercise question was last updated
 */
