/**
 * @swagger
 * /api/treatment-goals:
 *   post:
 *     summary: Create a new treatment goal
 *     tags: [Treatment goals]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - treatmentPlanId
 *               - description
 *               - targetDate
 *               - status
 *             properties:
 *               treatmentPlanId:
 *                 type: string
 *                 description: The ID of the treatment plan associated with this goal
 *               description:
 *                 type: string
 *                 description: A detailed description of the treatment goal
 *               targetDate:
 *                 type: string
 *                 format: date
 *                 description: The target date for achieving the goal
 *               status:
 *                 type: string
 *                 description: The status of the treatment goal (e.g., not started, in progress, completed)
 *     responses:
 *       201:
 *         description: Treatment goal created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/TreatmentGoal'
 *       400:
 *         description: Missing parameter(s)!
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/treatment-goals:
 *   get:
 *     summary: Get all treatment goals
 *     tags: [Treatment goals]
 *     responses:
 *       200:
 *         description: A list of all treatment goals
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/TreatmentGoal'
 *       404:
 *         description: No treatment goals found!
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/treatment-goals/{id}:
 *   get:
 *     summary: Get a single treatment goal by ID
 *     tags: [Treatment goals]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the treatment goal
 *     responses:
 *       200:
 *         description: Treatment goal retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/TreatmentGoal'
 *       400:
 *         description: Missing parameter(s)!
 *       404:
 *         description: Treatment Goal not found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/treatment-goals/{id}:
 *   put:
 *     summary: Update a treatment goal
 *     tags: [Treatment goals]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the treatment goal
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               description:
 *                 type: string
 *                 description: The new description of the treatment goal (optional)
 *               targetDate:
 *                 type: string
 *                 format: date
 *                 description: The new target date for the treatment goal (optional)
 *               status:
 *                 type: string
 *                 description: The new status of the treatment goal (optional)
 *     responses:
 *       200:
 *         description: Treatment goal updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/TreatmentGoal'
 *       400:
 *         description: Missing parameter(s)!
 *       404:
 *         description: Treatment Goal not found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/treatment-goals/{id}:
 *   delete:
 *     summary: Delete a treatment goal
 *     tags: [Treatment goals]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the treatment goal
 *     responses:
 *       204:
 *         description: Treatment goal deleted successfully
 *       400:
 *         description: Missing parameter(s)!
 *       404:
 *         description: Treatment Goal not found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     TreatmentGoal:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           description: The UUID of the treatment goal
 *         treatmentPlanId:
 *           type: string
 *           description: The ID of the treatment plan associated with this goal
 *         description:
 *           type: string
 *           description: A detailed description of the treatment goal
 *         targetDate:
 *           type: string
 *           format: date
 *           description: The target date for achieving the goal
 *         status:
 *           type: string
 *           description: The status of the treatment goal (e.g., not started, in progress, completed)
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: The time the treatment goal was created
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: The time the treatment goal was last updated
 */
