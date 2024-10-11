/**
 * @swagger
 * /api/patients:
 *   post:
 *     summary: Create a new Patient
 *     tags: [Patients]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: string
 *                 example: "c1e7b770-8b9b-4fbd-b499-3d39f0d09599"
 *               medicalProfile:
 *                 type: object
 *                 example: {lastVist: 20/7/2025, condition: Asthma}
 *               personalInformation:
 *                 type: object
 *                 example: {age: 21, gender: male}
 *               emergencyContact:
 *                 type: object
 *                 example: {name: Jane Doe, email: jane@gmail.com, contact: +1234567890}
 *     responses:
 *       201:
 *         description: Patient created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Patient'
 *       400:
 *         description: Missing parameter(s)!
 */

/**
 * @swagger
 * /api/patients/{id}:
 *   get:
 *     summary: Get a specific Patient by ID
 *     tags: [Patients]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the patient to retrieve
 *     responses:
 *       200:
 *         description: Patient retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Patient'
 *       400:
 *         description: Missing parameter(s)!
 *       404:
 *         description: Patient not found
 */

/**
 * @swagger
 * /api/patients/{id}:
 *   put:
 *     summary: Update a Patient
 *     tags: [Patients]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the patient to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: string
 *                 example: "c1e7b770-8b9b-4fbd-b499-3d39f0d09599"
 *               medicalProfile:
 *                 type: object
 *                 example: {lastVist: 20/7/2025, condition: Asthma}
 *               personalInformation:
 *                 type: object
 *                 example: {age: 21, gender: male}
 *               emergencyContact:
 *                 type: string
 *                 example: {name: Jane Doe, email: jane@gmail.com, contact: +1234567890}
 *     responses:
 *       200:
 *         description: Patient updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Patient'
 *       400:
 *         description: Missing parameter(s)!
 *       404:
 *         description: Patient not found
 */

/**
 * @swagger
 * /api/patients/{id}:
 *   delete:
 *     summary: Delete a Patient
 *     tags: [Patients]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the patient to delete
 *     responses:
 *       204:
 *         description: Patient deleted successfully
 *       400:
 *         description: Missing parameter(s)!
 *       404:
 *         description: Patient not found
 */

/**
 * @swagger
 * /api/patients:
 *   get:
 *     summary: Get all Patients
 *     tags: [Patients]
 *     responses:
 *       200:
 *         description: List of all patients
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Patient'
 *       404:
 *         description: Patients not found
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Patient:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           example: "c1e7b770-8b9b-4fbd-b499-3d39f0d09599"
 *         userId:
 *           type: string
 *           example: "a1e7b770-9c9b-4fbd-a499-3d39f0d09588"
 *         medicalProfile:
 *           type: object
 *           example: {lastVist: 20/7/2025, condition: Asthma}
 *         personalInformation:
 *           type: object
 *           example: {age: 21, gender: male}
 *         emergencyContact:
 *           type: object
 *           example: {Jane Doe: +1234567890}
 *         createdAt:
 *           type: string
 *           format: date-time
 *           example: "2024-08-28T12:34:56Z"
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           example: "2024-08-28T12:34:56Z"
 */
