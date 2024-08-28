/**
 * @swagger
 * /api/milestone-tasks:
 *   post:
 *     summary: Create a new milestone task
 *     tags: [Milestone tasks]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - milestoneId
 *               - description
 *               - targetDate
 *               - status
 *             properties:
 *               milestoneId:
 *                 type: string
 *                 description: The ID of the associated milestone
 *               description:
 *                 type: string
 *                 description: The description of the task
 *               targetDate:
 *                 type: string
 *                 format: date
 *                 description: The target completion date for the task
 *               status:
 *                 type: string
 *                 enum: [pending, completed, overdue]
 *                 description: The status of the task
 *     responses:
 *       201:
 *         description: Milestone task created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/MilestoneTask'
 *       400:
 *         description: Missing parameter(s)!
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/milestone-tasks:
 *   get:
 *     summary: Get all milestone tasks
 *     tags: [Milestone tasks]
 *     responses:
 *       200:
 *         description: A list of milestone tasks
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/MilestoneTask'
 *       404:
 *         description: No milestone tasks found!
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/milestone-tasks/{id}:
 *   get:
 *     summary: Get a single milestone task by ID
 *     tags: [Milestone tasks]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the milestone task to retrieve
 *     responses:
 *       200:
 *         description: Milestone task retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/MilestoneTask'
 *       400:
 *         description: Missing parameter(s)!
 *       404:
 *         description: Milestone Task not found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/milestone-tasks/{id}:
 *   put:
 *     summary: Update a milestone task
 *     tags: [Milestone tasks]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the milestone task to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             description: The data to update the milestone task with
 *     responses:
 *       200:
 *         description: Milestone task updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/MilestoneTask'
 *       400:
 *         description: Missing parameter(s)!
 *       404:
 *         description: Milestone Task not found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/milestone-tasks/{id}:
 *   delete:
 *     summary: Delete a milestone task
 *     tags: [Milestone tasks]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the milestone task to delete
 *     responses:
 *       204:
 *         description: Milestone task deleted successfully
 *       400:
 *         description: Missing parameter(s)!
 *       404:
 *         description: Milestone Task not found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     MilestoneTask:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           description: The UUID of the milestone task
 *         milestoneId:
 *           type: string
 *           description: The ID of the associated milestone
 *         description:
 *           type: string
 *           description: The description of the task
 *         targetDate:
 *           type: string
 *           format: date
 *           description: The target completion date for the task
 *         status:
 *           type: string
 *           enum: [pending, completed, overdue]
 *           description: The status of the task
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: The time the task was created
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: The time the task was last updated
 */
