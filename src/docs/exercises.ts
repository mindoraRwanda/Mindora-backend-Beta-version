/**
 * @swagger
 * /api/exercises:
 *   post:
 *     summary: Create a new exercise
 *     tags: [Exercises]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - description
 *               - difficultyLevel
 *               - category
 *             properties:
 *               title:
 *                 type: string
 *                 description: The title of the exercise
 *               description:
 *                 type: string
 *                 description: A detailed description of the exercise
 *               difficultyLevel:
 *                 type: string
 *                 description: The difficulty level of the exercise (e.g., "Easy", "Medium", "Hard")
 *               category:
 *                 type: string
 *                 description: The category of the exercise (e.g., "Cardio", "Strength")
 *     responses:
 *       201:
 *         description: Exercise created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Exercise'
 *       400:
 *         description: Missing parameter(s)!
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/exercises:
 *   get:
 *     summary: Get all exercises
 *     tags: [Exercises]
 *     responses:
 *       200:
 *         description: A list of exercises
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Exercise'
 *       404:
 *         description: Exercises not found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/exercises/{id}:
 *   get:
 *     summary: Get an exercise by ID
 *     tags: [Exercises]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the exercise to retrieve
 *     responses:
 *       200:
 *         description: Exercise retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Exercise'
 *       400:
 *         description: Missing ID parameter!
 *       404:
 *         description: Exercise not found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/exercises/{id}:
 *   put:
 *     summary: Update an exercise
 *     tags: [Exercises]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the exercise to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 description: The title of the exercise
 *               description:
 *                 type: string
 *                 description: A detailed description of the exercise
 *               difficultyLevel:
 *                 type: string
 *                 description: The difficulty level of the exercise (e.g., "Easy", "Medium", "Hard")
 *               category:
 *                 type: string
 *                 description: The category of the exercise (e.g., "Cardio", "Strength")
 *     responses:
 *       200:
 *         description: Exercise updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Exercise'
 *       400:
 *         description: Missing parameter(s)!
 *       404:
 *         description: Exercise not found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/exercises/{id}:
 *   delete:
 *     summary: Delete an exercise
 *     tags: [Exercises]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the exercise to delete
 *     responses:
 *       204:
 *         description: Exercise deleted successfully
 *       400:
 *         description: Missing ID parameter!
 *       404:
 *         description: Exercise not found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Exercise:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           description: The UUID of the exercise
 *         title:
 *           type: string
 *           description: The title of the exercise
 *         description:
 *           type: string
 *           description: A detailed description of the exercise
 *         difficultyLevel:
 *           type: string
 *           description: The difficulty level of the exercise (e.g., "Easy", "Medium", "Hard")
 *         category:
 *           type: string
 *           description: The category of the exercise (e.g., "Cardio", "Strength")
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: The time the exercise was created
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: The time the exercise was last updated
 */
