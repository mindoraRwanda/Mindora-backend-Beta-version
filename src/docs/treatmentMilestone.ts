/**
 * @swagger
 * /api/treatment-milestones:
 *   post:
 *     summary: Create a new treatment milestone
 *     tags: [Treatment milestones]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - goalId
 *               - description
 *               - targetDate
 *               - status
 *             properties:
 *               goalId:
 *                 type: string
 *                 description: The ID of the treatment goal associated with this milestone
 *               description:
 *                 type: string
 *                 description: A detailed description of the treatment milestone
 *               targetDate:
 *                 type: string
 *                 format: date
 *                 description: The target date for achieving the milestone
 *               status:
 *                 type: string
 *                 description: The status of the treatment milestone (e.g., not started, in progress, completed)
 *     responses:
 *       201:
 *         description: Treatment milestone created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/TreatmentMilestone'
 *       400:
 *         description: Missing parameter(s)!
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/treatment-milestones:
 *   get:
 *     summary: Get all treatment milestones
 *     tags: [Treatment milestones]
 *     responses:
 *       200:
 *         description: A list of all treatment milestones
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/TreatmentMilestone'
 *       404:
 *         description: No treatment milestones found!
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/treatment-milestones/{id}:
 *   get:
 *     summary: Get a single treatment milestone by ID
 *     tags: [Treatment milestones]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the treatment milestone
 *     responses:
 *       200:
 *         description: Treatment milestone retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/TreatmentMilestone'
 *       400:
 *         description: Missing parameter(s)!
 *       404:
 *         description: Treatment Milestone not found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/treatment-milestones/{id}:
 *   put:
 *     summary: Update a treatment milestone
 *     tags: [Treatment milestones]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the treatment milestone
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               description:
 *                 type: string
 *                 description: The new description of the treatment milestone (optional)
 *               targetDate:
 *                 type: string
 *                 format: date
 *                 description: The new target date for the treatment milestone (optional)
 *               status:
 *                 type: string
 *                 description: The new status of the treatment milestone (optional)
 *     responses:
 *       200:
 *         description: Treatment milestone updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/TreatmentMilestone'
 *       400:
 *         description: Missing parameter(s)!
 *       404:
 *         description: Treatment Milestone not found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/treatment-milestones/{id}:
 *   post:
 *     summary: Delete a treatment milestone
 *     tags: [Treatment milestones]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the treatment milestone
 *     responses:
 *       204:
 *         description: Treatment milestone deleted successfully
 *       400:
 *         description: Missing parameter(s)!
 *       404:
 *         description: Treatment Milestone not found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     TreatmentMilestone:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           description: The UUID of the treatment milestone
 *         goalId:
 *           type: string
 *           description: The ID of the treatment goal associated with this milestone
 *         description:
 *           type: string
 *           description: A detailed description of the treatment milestone
 *         targetDate:
 *           type: string
 *           format: date
 *           description: The target date for achieving the milestone
 *         status:
 *           type: string
 *           description: The status of the treatment milestone (e.g., not started, in progress, completed)
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: The time the treatment milestone was created
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: The time the treatment milestone was last updated
 */
