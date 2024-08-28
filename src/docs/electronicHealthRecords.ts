/**
 * @swagger
 * /api/electronic-health-records:
 *   post:
 *     summary: Create a new electronic health record
 *     tags: [Electronic Health Records]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - patientId
 *               - therapistId
 *               - recordType
 *               - recordData
 *             properties:
 *               patientId:
 *                 type: string
 *                 description: The ID of the patient
 *               therapistId:
 *                 type: string
 *                 description: The ID of the therapist
 *               recordType:
 *                 type: string
 *                 description: The type of the record (e.g., consultation, diagnosis)
 *               recordData:
 *                 type: object
 *                 description: The data related to the health record
 *     responses:
 *       201:
 *         description: Electronic health record created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ElectronicHealthRecord'
 *       400:
 *         description: Missing parameter(s)!
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/electronic-health-records:
 *   get:
 *     summary: Get all electronic health records
 *     tags: [Electronic Health Records]
 *     responses:
 *       200:
 *         description: A list of electronic health records
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/ElectronicHealthRecord'
 *       404:
 *         description: No electronic health records found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/electronic-health-records/{id}:
 *   get:
 *     summary: Get a single electronic health record by ID
 *     tags: [Electronic Health Records]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the electronic health record to retrieve
 *     responses:
 *       200:
 *         description: Electronic health record retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ElectronicHealthRecord'
 *       400:
 *         description: Missing parameter(s)!
 *       404:
 *         description: Electronic health record not found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/electronic-health-records/{id}:
 *   put:
 *     summary: Update an electronic health record
 *     tags: [Electronic Health Records]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the electronic health record to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               patientId:
 *                 type: string
 *                 description: The ID of the patient (optional)
 *               therapistId:
 *                 type: string
 *                 description: The ID of the therapist (optional)
 *               recordType:
 *                 type: string
 *                 description: The type of the record (optional)
 *               recordData:
 *                 type: object
 *                 description: The data related to the health record (optional)
 *     responses:
 *       200:
 *         description: Electronic health record updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ElectronicHealthRecord'
 *       400:
 *         description: Missing parameter(s)!
 *       404:
 *         description: Electronic health record not found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/electronic-health-records/{id}:
 *   delete:
 *     summary: Delete an electronic health record
 *     tags: [Electronic Health Records]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the electronic health record to delete
 *     responses:
 *       204:
 *         description: Electronic health record deleted successfully
 *       400:
 *         description: Missing parameter(s)!
 *       404:
 *         description: Electronic health record not found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     ElectronicHealthRecord:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           description: The UUID of the electronic health record
 *         patientId:
 *           type: string
 *           description: The ID of the patient
 *         therapistId:
 *           type: string
 *           description: The ID of the therapist
 *         recordType:
 *           type: string
 *           description: The type of the record
 *         recordData:
 *           type: object
 *           description: The data related to the health record
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: The time the electronic health record was created
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: The time the electronic health record was last updated
 */
