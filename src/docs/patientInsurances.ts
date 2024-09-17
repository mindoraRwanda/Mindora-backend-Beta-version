/**
 * @swagger
 * /api/patient-insurances:
 *   post:
 *     summary: Create a new patient insurance
 *     tags: [PatientInsurance]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - patientId
 *               - insuranceId
 *               - status
 *             properties:
 *               patientId:
 *                 type: string
 *                 description: The UUID of the patient
 *               insuranceId:
 *                 type: string
 *                 description: The UUID of the insurance
 *               verified:
 *                 type: boolean
 *                 description: Indicates if the insurance has been verified
 *                 default: false
 *               expiryDate:
 *                 type: string
 *                 format: date
 *                 description: The expiry date of the insurance
 *               status:
 *                 type: string
 *                 enum: ["active", "expired"]
 *                 description: The status of the insurance
 *     responses:
 *       201:
 *         description: Patient insurance created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/PatientInsurance'
 *       400:
 *         description: Missing parameter(s)!
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/patient-insurances:
 *   get:
 *     summary: Get all patient insurances
 *     tags: [PatientInsurance]
 *     responses:
 *       200:
 *         description: A list of patient insurances
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/PatientInsurance'
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/patient-insurances/{id}:
 *   get:
 *     summary: Get a patient insurance by ID
 *     tags: [PatientInsurance]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the patient insurance to retrieve
 *     responses:
 *       200:
 *         description: Patient insurance retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/PatientInsurance'
 *       400:
 *         description: Missing parameter(s)!
 *       404:
 *         description: Patient insurance not found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/patient-insurances/{id}:
 *   put:
 *     summary: Update a patient insurance
 *     tags: [PatientInsurance]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the patient insurance to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               patientId:
 *                 type: string
 *                 description: The UUID of the patient
 *               insuranceId:
 *                 type: string
 *                 description: The UUID of the insurance
 *               verified:
 *                 type: boolean
 *                 description: Indicates if the insurance has been verified
 *               expiryDate:
 *                 type: string
 *                 format: date
 *                 description: The expiry date of the insurance
 *               status:
 *                 type: string
 *                 enum: ["active", "expired"]
 *                 description: The status of the insurance
 *     responses:
 *       200:
 *         description: Patient insurance updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/PatientInsurance'
 *       400:
 *         description: Missing parameter(s)!
 *       404:
 *         description: Patient insurance not found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/patient-insurances/{id}:
 *   delete:
 *     summary: Delete a patient insurance
 *     tags: [PatientInsurance]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the patient insurance to delete
 *     responses:
 *       204:
 *         description: Patient insurance deleted successfully
 *       400:
 *         description: Missing parameter(s)!
 *       404:
 *         description: Patient insurance not found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     PatientInsurance:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           description: The UUID of the patient insurance
 *         patientId:
 *           type: string
 *           description: The UUID of the patient
 *         insuranceId:
 *           type: string
 *           description: The UUID of the insurance
 *         verified:
 *           type: boolean
 *           description: Indicates if the insurance has been verified
 *         expiryDate:
 *           type: string
 *           format: date
 *           description: The expiry date of the insurance
 *         status:
 *           type: string
 *           enum: ["active", "expired"]
 *           description: The status of the insurance
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: The time the insurance record was created
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: The time the insurance record was last updated
 */
