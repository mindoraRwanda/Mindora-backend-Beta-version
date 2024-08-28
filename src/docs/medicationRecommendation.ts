/**
 * @swagger
 * /api/medication-recommendations:
 *   post:
 *     summary: Create a new medication recommendation
 *     tags: [Medication recommendations]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - patientId
 *               - recommendation
 *               - reason
 *             properties:
 *               patientId:
 *                 type: string
 *                 description: The ID of the patient
 *               recommendation:
 *                 type: object
 *                 description: The medication recommendation details (JSON format)
 *               reason:
 *                 type: string
 *                 description: The reason for the medication recommendation
 *     responses:
 *       201:
 *         description: Medication recommendation created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/MedicationRecommendation'
 *       400:
 *         description: Missing required parameters!
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/medication-recommendations:
 *   get:
 *     summary: Get all medication recommendations
 *     tags: [Medication recommendations]
 *     responses:
 *       200:
 *         description: A list of medication recommendations
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/MedicationRecommendation'
 *       404:
 *         description: Medication recommendations not found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/medication-recommendations/{id}:
 *   get:
 *     summary: Get a medication recommendation by ID
 *     tags: [Medication recommendations]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the medication recommendation to retrieve
 *     responses:
 *       200:
 *         description: Medication recommendation retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/MedicationRecommendation'
 *       400:
 *         description: Missing ID parameter!
 *       404:
 *         description: Medication recommendation not found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/medication-recommendations/{id}:
 *   put:
 *     summary: Update a medication recommendation
 *     tags: [Medication recommendations]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the medication recommendation to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             description: The data to update the medication recommendation with
 *     responses:
 *       200:
 *         description: Medication recommendation updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/MedicationRecommendation'
 *       400:
 *         description: Missing parameter(s)!
 *       404:
 *         description: Medication recommendation not found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/medication-recommendations/{id}:
 *   delete:
 *     summary: Delete a medication recommendation
 *     tags: [Medication recommendations]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the medication recommendation to delete
 *     responses:
 *       204:
 *         description: Medication recommendation deleted successfully
 *       400:
 *         description: Missing ID parameter!
 *       404:
 *         description: Medication recommendation not found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     MedicationRecommendation:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           description: The UUID of the medication recommendation
 *         patientId:
 *           type: string
 *           description: The ID of the patient associated with the recommendation
 *         recommendation:
 *           type: object
 *           description: The medication recommendation details (JSON format)
 *         reason:
 *           type: string
 *           description: The reason for the medication recommendation
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: The time the recommendation was created
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: The time the recommendation was last updated
 */
