/**
 * @swagger
 * /api/treatment_plans:
 *   post:
 *     summary: Create a new treatment plan
 *     tags: [Treatment Plans]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - patientId
 *               - therapistId
 *               - title
 *               - description
 *               - startDate
 *             properties:
 *               patientId:
 *                 type: string
 *                 description: The ID of the patient
 *               therapistId:
 *                 type: string
 *                 description: The ID of the therapist
 *               title:
 *                 type: string
 *                 description: The title of the treatment plan
 *               description:
 *                 type: string
 *                 description: A detailed description of the treatment plan
 *               startDate:
 *                 type: string
 *                 format: date
 *                 description: The start date of the treatment plan
 *               endDate:
 *                 type: string
 *                 format: date
 *                 description: The end date of the treatment plan (optional)
 *               status:
 *                 type: string
 *                 description: The status of the treatment plan (e.g., active, completed, etc.)
 *     responses:
 *       201:
 *         description: Treatment plan created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/TreatmentPlan'
 *       400:
 *         description: Missing parameter(s)!
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/treatment_plans:
 *   get:
 *     summary: Get all treatment plans
 *     tags: [Treatment Plans]
 *     responses:
 *       200:
 *         description: A list of all treatment plans
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/TreatmentPlan'
 *       404:
 *         description: No treatment plans found!
 *       500:
 *         description: Internal server error
 */
/**
 * @swagger
 * /api/treatment_plans/therapists/{therapistId}:
 *   get:
 *     summary: Get all treatment plans for a specific therapist
 *     tags: [Treatment Plans]
 *     parameters:
 *       - in: path
 *         name: therapistId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the therapist whose treatment plans are to be retrieved
 *     responses:
 *       200:
 *         description: A list of treatment plans for the specified therapist
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/TreatmentPlan'
 *       400:
 *         description: Missing therapist ID
 *       404:
 *         description: No treatment plans found for the specified therapist
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/treatment_plans/{id}:
 *   get:
 *     summary: Get a single treatment plan by ID
 *     tags: [Treatment Plans]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the treatment plan
 *     responses:
 *       200:
 *         description: Treatment plan retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/TreatmentPlan'
 *       400:
 *         description: Missing parameter(s)!
 *       404:
 *         description: Treatment Plan not found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/treatment_plans/{id}:
 *   put:
 *     summary: Update a treatment plan
 *     tags: [Treatment Plans]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the treatment plan
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 description: The new title of the treatment plan (optional)
 *               description:
 *                 type: string
 *                 description: The new description of the treatment plan (optional)
 *               startDate:
 *                 type: string
 *                 format: date
 *                 description: The new start date of the treatment plan (optional)
 *               endDate:
 *                 type: string
 *                 format: date
 *                 description: The new end date of the treatment plan (optional)
 *               status:
 *                 type: string
 *                 description: The new status of the treatment plan (optional)
 *     responses:
 *       200:
 *         description: Treatment plan updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/TreatmentPlan'
 *       400:
 *         description: Missing parameter(s)!
 *       404:
 *         description: Treatment Plan not found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/treatment_plans/{id}:
 *   delete:
 *     summary: Delete a treatment plan
 *     tags: [Treatment Plans]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the treatment plan
 *     responses:
 *       204:
 *         description: Treatment plan deleted successfully
 *       400:
 *         description: Missing parameter(s)!
 *       404:
 *         description: Treatment Plan not found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     TreatmentPlan:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           description: The UUID of the treatment plan
 *         patientId:
 *           type: string
 *           description: The ID of the patient
 *         therapistId:
 *           type: string
 *           description: The ID of the therapist
 *         title:
 *           type: string
 *           description: The title of the treatment plan
 *         description:
 *           type: string
 *           description: A detailed description of the treatment plan
 *         startDate:
 *           type: string
 *           format: date
 *           description: The start date of the treatment plan
 *         endDate:
 *           type: string
 *           format: date
 *           description: The end date of the treatment plan (optional)
 *         status:
 *           type: string
 *           description: The status of the treatment plan (e.g., active, completed, etc.)
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: The time the treatment plan was created
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: The time the treatment plan was last updated
 */
