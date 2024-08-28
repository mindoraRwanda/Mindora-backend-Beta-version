/**
 * @swagger
 * /api/prescription-compliance:
 *   post:
 *     summary: Create a new prescription compliance record
 *     tags: [Prescription compliance]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - prescriptionId
 *               - patientId
 *               - date
 *               - status
 *             properties:
 *               prescriptionId:
 *                 type: string
 *                 description: The ID of the prescription
 *               patientId:
 *                 type: string
 *                 description: The ID of the patient
 *               date:
 *                 type: string
 *                 format: date
 *                 description: The date of compliance
 *               status:
 *                 type: string
 *                 enum: ["compliant", "non-compliant"]
 *                 description: The compliance status
 *               notes:
 *                 type: string
 *                 description: Additional notes for compliance
 *     responses:
 *       201:
 *         description: Prescription compliance record created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/PrescriptionCompliance'
 *       400:
 *         description: Missing required parameters!
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/prescription-compliance:
 *   get:
 *     summary: Get all prescription compliance records
 *     tags: [Prescription compliance]
 *     responses:
 *       200:
 *         description: A list of prescription compliance records
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/PrescriptionCompliance'
 *       404:
 *         description: No compliance records found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/prescription-compliance/{id}:
 *   get:
 *     summary: Get a prescription compliance record by ID
 *     tags: [Prescription compliance]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the prescription compliance record to retrieve
 *     responses:
 *       200:
 *         description: Prescription compliance record retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/PrescriptionCompliance'
 *       400:
 *         description: Missing ID parameter!
 *       404:
 *         description: Compliance record not found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/prescription-compliance/{id}:
 *   put:
 *     summary: Update a prescription compliance record
 *     tags: [Prescription compliance]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the prescription compliance record to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               prescriptionId:
 *                 type: string
 *                 description: The ID of the prescription
 *               patientId:
 *                 type: string
 *                 description: The ID of the patient
 *               date:
 *                 type: string
 *                 format: date
 *                 description: The date of compliance
 *               status:
 *                 type: string
 *                 enum: ["compliant", "non-compliant"]
 *                 description: The compliance status
 *               notes:
 *                 type: string
 *                 description: Additional notes for compliance
 *     responses:
 *       200:
 *         description: Prescription compliance record updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/PrescriptionCompliance'
 *       400:
 *         description: Missing parameter(s)!
 *       404:
 *         description: Compliance record not found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/prescription-compliance/{id}:
 *   delete:
 *     summary: Delete a prescription compliance record
 *     tags: [Prescription compliance]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the prescription compliance record to delete
 *     responses:
 *       204:
 *         description: Prescription compliance record deleted successfully
 *       400:
 *         description: Missing ID parameter!
 *       404:
 *         description: Compliance record not found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     PrescriptionCompliance:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           description: The UUID of the compliance record
 *         prescriptionId:
 *           type: string
 *           description: The UUID of the prescription
 *         patientId:
 *           type: string
 *           description: The UUID of the patient
 *         date:
 *           type: string
 *           format: date
 *           description: The date of compliance
 *         status:
 *           type: string
 *           enum: ["compliant", "non-compliant"]
 *           description: The compliance status
 *         notes:
 *           type: string
 *           description: Additional notes for compliance
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: The time the record was created
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: The time the record was last updated
 */
