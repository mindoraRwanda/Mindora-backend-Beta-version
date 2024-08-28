/**
 * @swagger
 * /api/medications:
 *   post:
 *     summary: Create a new medication
 *     tags: [Medications]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - description
 *               - dosageForm
 *               - strength
 *             properties:
 *               name:
 *                 type: string
 *                 description: The name of the medication
 *               description:
 *                 type: string
 *                 description: A brief description of the medication
 *               dosageForm:
 *                 type: string
 *                 description: The dosage form of the medication (e.g., tablet, liquid)
 *               strength:
 *                 type: string
 *                 description: The strength of the medication (e.g., 500mg)
 *     responses:
 *       201:
 *         description: Medication created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Medication'
 *       400:
 *         description: Missing required parameters!
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/medications:
 *   get:
 *     summary: Get all medications
 *     tags: [Medications]
 *     responses:
 *       200:
 *         description: A list of all medications
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Medication'
 *       404:
 *         description: Medications not found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/medications/{id}:
 *   get:
 *     summary: Get a medication by ID
 *     tags: [Medications]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the medication
 *     responses:
 *       200:
 *         description: Medication retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Medication'
 *       400:
 *         description: Missing ID parameter!
 *       404:
 *         description: Medication not found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/medications/{id}:
 *   put:
 *     summary: Update a medication
 *     tags: [Medications]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the medication
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The new name of the medication (optional)
 *               description:
 *                 type: string
 *                 description: The new description of the medication (optional)
 *               dosageForm:
 *                 type: string
 *                 description: The new dosage form of the medication (optional)
 *               strength:
 *                 type: string
 *                 description: The new strength of the medication (optional)
 *     responses:
 *       200:
 *         description: Medication updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Medication'
 *       400:
 *         description: Missing parameter(s)!
 *       404:
 *         description: Medication not found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/medications/{id}:
 *   delete:
 *     summary: Delete a medication
 *     tags: [Medications]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the medication
 *     responses:
 *       204:
 *         description: Medication deleted successfully
 *       400:
 *         description: Missing ID parameter!
 *       404:
 *         description: Medication not found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Medication:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           description: The UUID of the medication
 *         name:
 *           type: string
 *           description: The name of the medication
 *         description:
 *           type: string
 *           description: A brief description of the medication
 *         dosageForm:
 *           type: string
 *           description: The dosage form of the medication
 *         strength:
 *           type: string
 *           description: The strength of the medication
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: The time the medication was created
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: The time the medication was last updated
 */
