/**
 * @swagger
 * /api/symptom-logs:
 *   post:
 *     summary: Create a new symptom log
 *     tags: [Symptom Logs]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - userId
 *               - symptom
 *               - severity
 *               - frequency
 *               - onset
 *             properties:
 *               userId:
 *                 type: string
 *                 format: uuid
 *                 description: The UUID of the user
 *               symptom:
 *                 type: string
 *                 description: Description of the symptom
 *               severity:
 *                 type: string
 *                 enum: ["mild", "moderate", "severe"]
 *                 description: Severity level of the symptom
 *               frequency:
 *                 type: string
 *                 enum: ["rare", "occasional", "frequent", "constant"]
 *                 description: Frequency of the symptom occurrence
 *               onset:
 *                 type: string
 *                 format: date-time
 *                 description: The date and time when the symptom started
 *               description:
 *                 type: string
 *                 description: Additional details about the symptom
 *     responses:
 *       201:
 *         description: Symptom log created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SymptomLog'
 *       400:
 *         description: Missing parameter(s)!
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/symptom-logs/user/{userId}:
 *   get:
 *     summary: Get all symptom logs for a user
 *     tags: [Symptom Logs]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: The UUID of the user
 *     responses:
 *       200:
 *         description: A list of symptom logs for the specified user
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/SymptomLog'
 *       400:
 *         description: Missing user ID parameter!
 *       404:
 *         description: User symptom logs not found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/symptom-logs/{id}:
 *   get:
 *     summary: Get a symptom log by ID
 *     tags: [Symptom Logs]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: The UUID of the symptom log to retrieve
 *     responses:
 *       200:
 *         description: Symptom log retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SymptomLog'
 *       400:
 *         description: Missing ID parameter!
 *       404:
 *         description: Symptom log not found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/symptom-logs/{id}:
 *   put:
 *     summary: Update a symptom log
 *     tags: [Symptom Logs]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: The UUID of the symptom log to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               symptom:
 *                 type: string
 *                 description: Description of the symptom
 *               severity:
 *                 type: string
 *                 enum: ["mild", "moderate", "severe"]
 *                 description: Severity level of the symptom
 *               frequency:
 *                 type: string
 *                 enum: ["rare", "occasional", "frequent", "constant"]
 *                 description: Frequency of the symptom occurrence
 *               onset:
 *                 type: string
 *                 format: date-time
 *                 description: The date and time when the symptom started
 *               description:
 *                 type: string
 *                 description: Additional details about the symptom
 *     responses:
 *       200:
 *         description: Symptom log updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SymptomLog'
 *       400:
 *         description: Missing parameter(s)!
 *       404:
 *         description: Symptom log not found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/symptom-logs/{id}:
 *   delete:
 *     summary: Delete a symptom log
 *     tags: [Symptom Logs]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: The UUID of the symptom log to delete
 *     responses:
 *       204:
 *         description: Symptom log deleted successfully
 *       400:
 *         description: Missing ID parameter!
 *       404:
 *         description: Symptom log not found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     SymptomLog:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *           description: The UUID of the symptom log
 *         userId:
 *           type: string
 *           format: uuid
 *           description: The UUID of the user
 *         symptom:
 *           type: string
 *           description: Description of the symptom
 *         severity:
 *           type: string
 *           enum: ["mild", "moderate", "severe"]
 *           description: Severity level of the symptom
 *         frequency:
 *           type: string
 *           enum: ["rare", "occasional", "frequent", "constant"]
 *           description: Frequency of the symptom occurrence
 *         onset:
 *           type: string
 *           format: date-time
 *           description: The date and time when the symptom started
 *         description:
 *           type: string
 *           description: Additional details about the symptom
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: The time the symptom log was created
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: The time the symptom log was last updated
 */
