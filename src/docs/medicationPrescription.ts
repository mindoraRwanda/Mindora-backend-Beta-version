/**
 * @swagger
 * /api/medication-prescriptions:
 *   post:
 *     summary: Create a new medication prescription
 *     tags: [Medication prescriptions]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - patientId
 *               - therapistId
 *               - medicationId
 *               - dosage
 *             properties:
 *               patientId:
 *                 type: string
 *                 description: The ID of the patient receiving the medication
 *               therapistId:
 *                 type: string
 *                 description: The ID of the therapist prescribing the medication
 *               medicationId:
 *                 type: string
 *                 description: The ID of the medication being prescribed
 *               dosage:
 *                 type: string
 *                 description: The dosage of the medication
 *               duration:
 *                 type: string
 *                 description: The duration of the medication prescription
 *               startDate:
 *                 type: string
 *                 format: date
 *                 description: The start date of the medication prescription
 *               endDate:
 *                 type: string
 *                 format: date
 *                 description: The end date of the medication prescription
 *               status:
 *                 type: string
 *                 description: The status of the prescription (e.g., active, completed)
 *               notes:
 *                 type: string
 *                 description: Additional notes regarding the prescription
 *     responses:
 *       201:
 *         description: Medication prescription created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/MedicationPrescription'
 *       400:
 *         description: Missing required parameters!
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/medication-prescriptions:
 *   get:
 *     summary: Get all medication prescriptions
 *     tags: [Medication prescriptions]
 *     responses:
 *       200:
 *         description: A list of all medication prescriptions
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/MedicationPrescription'
 *       404:
 *         description: Medication prescriptions not found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/medication-prescriptions/{id}:
 *   get:
 *     summary: Get a medication prescription by ID
 *     tags: [Medication prescriptions]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the medication prescription
 *     responses:
 *       200:
 *         description: Medication prescription retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/MedicationPrescription'
 *       400:
 *         description: Missing ID parameter!
 *       404:
 *         description: Medication prescription not found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/medication-prescriptions/{id}:
 *   put:
 *     summary: Update a medication prescription
 *     tags: [Medication prescriptions]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the medication prescription
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               patientId:
 *                 type: string
 *                 description: The new ID of the patient receiving the medication (optional)
 *               therapistId:
 *                 type: string
 *                 description: The new ID of the therapist prescribing the medication (optional)
 *               medicationId:
 *                 type: string
 *                 description: The new ID of the medication being prescribed (optional)
 *               dosage:
 *                 type: string
 *                 description: The new dosage of the medication (optional)
 *               duration:
 *                 type: string
 *                 description: The new duration of the medication prescription (optional)
 *               startDate:
 *                 type: string
 *                 format: date
 *                 description: The new start date of the medication prescription (optional)
 *               endDate:
 *                 type: string
 *                 format: date
 *                 description: The new end date of the medication prescription (optional)
 *               status:
 *                 type: string
 *                 description: The new status of the prescription (optional)
 *               notes:
 *                 type: string
 *                 description: The new additional notes regarding the prescription (optional)
 *     responses:
 *       200:
 *         description: Medication prescription updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/MedicationPrescription'
 *       400:
 *         description: Missing parameter(s)!
 *       404:
 *         description: Medication prescription not found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/medication-prescriptions/{id}:
 *   delete:
 *     summary: Delete a medication prescription
 *     tags: [Medication prescriptions]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the medication prescription
 *     responses:
 *       204:
 *         description: Medication prescription deleted successfully
 *       400:
 *         description: Missing ID parameter!
 *       404:
 *         description: Medication prescription not found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     MedicationPrescription:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           description: The UUID of the medication prescription
 *         patientId:
 *           type: string
 *           description: The ID of the patient receiving the medication
 *         therapistId:
 *           type: string
 *           description: The ID of the therapist prescribing the medication
 *         medicationId:
 *           type: string
 *           description: The ID of the medication being prescribed
 *         dosage:
 *           type: string
 *           description: The dosage of the medication
 *         duration:
 *           type: string
 *           description: The duration of the medication prescription
 *         startDate:
 *           type: string
 *           format: date
 *           description: The start date of the medication prescription
 *         endDate:
 *           type: string
 *           format: date
 *           description: The end date of the medication prescription
 *         status:
 *           type: string
 *           description: The status of the prescription (e.g., active, completed)
 *         notes:
 *           type: string
 *           description: Additional notes regarding the prescription
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: The time the medication prescription was created
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: The time the medication prescription was last updated
 */
