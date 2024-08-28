/**
 * @swagger
 * /api/treatment-plan-adjustments:
 *   post:
 *     summary: Create a new treatment plan adjustment
 *     tags: [Treatment Plan Adjustments]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - treatmentPlanId
 *               - reason
 *               - changes
 *               - modifiedBy
 *             properties:
 *               treatmentPlanId:
 *                 type: string
 *                 description: The ID of the treatment plan being adjusted
 *               reason:
 *                 type: string
 *                 description: The reason for the adjustment
 *               changes:
 *                 type: string
 *                 description: A description of the changes made
 *               modifiedBy:
 *                 type: string
 *                 description: The ID of the therapist or user who made the adjustment
 *     responses:
 *       201:
 *         description: Treatment plan adjustment created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/TreatmentPlanAdjustment'
 *       400:
 *         description: Missing parameter(s)!
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/treatment-plan-adjustments:
 *   get:
 *     summary: Get all treatment plan adjustments
 *     tags: [Treatment Plan Adjustments]
 *     responses:
 *       200:
 *         description: A list of all treatment plan adjustments
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/TreatmentPlanAdjustment'
 *       404:
 *         description: No treatment plan adjustments found!
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/treatment-plan-adjustments/{id}:
 *   get:
 *     summary: Get a single treatment plan adjustment by ID
 *     tags: [Treatment Plan Adjustments]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the treatment plan adjustment
 *     responses:
 *       200:
 *         description: Treatment plan adjustment retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/TreatmentPlanAdjustment'
 *       400:
 *         description: Missing parameter(s)!
 *       404:
 *         description: Treatment Plan Adjustment not found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/treatment-plan-adjustments/{id}:
 *   put:
 *     summary: Update a treatment plan adjustment
 *     tags: [Treatment Plan Adjustments]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the treatment plan adjustment
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               reason:
 *                 type: string
 *                 description: The new reason for the adjustment (optional)
 *               changes:
 *                 type: string
 *                 description: The new description of changes made (optional)
 *               modifiedBy:
 *                 type: string
 *                 description: The ID of the new therapist or user who made the adjustment (optional)
 *     responses:
 *       200:
 *         description: Treatment plan adjustment updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/TreatmentPlanAdjustment'
 *       400:
 *         description: Missing parameter(s)!
 *       404:
 *         description: Treatment Plan Adjustment not found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/treatment-plan-adjustments/{id}:
 *   delete:
 *     summary: Delete a treatment plan adjustment
 *     tags: [Treatment Plan Adjustments]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the treatment plan adjustment
 *     responses:
 *       204:
 *         description: Treatment plan adjustment deleted successfully
 *       400:
 *         description: Missing parameter(s)!
 *       404:
 *         description: Treatment Plan Adjustment not found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     TreatmentPlanAdjustment:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           description: The UUID of the treatment plan adjustment
 *         treatmentPlanId:
 *           type: string
 *           description: The ID of the treatment plan being adjusted
 *         reason:
 *           type: string
 *           description: The reason for the adjustment
 *         changes:
 *           type: string
 *           description: A description of the changes made
 *         modifiedBy:
 *           type: string
 *           description: The ID of the therapist or user who made the adjustment
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: The time the treatment plan adjustment was created
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: The time the treatment plan adjustment was last updated
 */
