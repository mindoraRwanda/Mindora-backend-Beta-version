/**
 * @swagger
 * /api/therapists:
 *   post:
 *     summary: Create a new therapist
 *     tags: [Therapists]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - personalInformation
 *               - diploma
 *               - license
 *               - userId
 *             properties:
 *               personalInformation:
 *                 type: object
 *                 description: Personal details of the therapist
 *                 properties:
 *                   name:
 *                     type: string
 *                     description: The name of the therapist
 *                   gender:
 *                     type: string
 *                     description: The gender of the therapist
 *                   dateOfBirth:
 *                     type: string
 *                     format: date
 *                     description: The date of birth of the therapist
 *                   address:
 *                     type: string
 *                     description: The address of the therapist
 *                   phoneNumber:
 *                     type: string
 *                     description: The phone number of the therapist
 *               diploma:
 *                 type: string
 *                 format: binary
 *                 description: Diploma file (document) of the therapist
 *               license:
 *                 type: string
 *                 format: binary
 *                 description: License file (document) of the therapist
 *               userId:
 *                 type: string
 *                 format: uuid
 *                 description: ID of the user associated with the therapist
 *     responses:
 *       201:
 *         description: Therapist created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Therapist'
 *       400:
 *         description: Missing parameter(s)!
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/therapists:
 *   get:
 *     summary: Get all therapists
 *     tags: [Therapists]
 *     responses:
 *       200:
 *         description: A list of therapists
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Therapist'
 *       404:
 *         description: No therapists found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/therapists/{id}:
 *   get:
 *     summary: Get a single therapist by ID
 *     tags: [Therapists]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the therapist to retrieve
 *     responses:
 *       200:
 *         description: Therapist retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Therapist'
 *       400:
 *         description: Missing parameter(s)!
 *       404:
 *         description: Therapist not found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/therapists/{therapistId}/patients:
 *   get:
 *     summary: Get all patients being treated by a specific therapist
 *     tags: [Therapists]
 *     parameters:
 *       - in: path
 *         name: therapistId
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: The ID of the therapist
 *     responses:
 *       200:
 *         description: A list of patients being treated by the therapist
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 patients:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Patient'
 *                 count:
 *                   type: integer
 *                   description: The total number of patients being treated by the therapist
 *       400:
 *         description: Missing or invalid therapist ID
 *       404:
 *         description: No patients found for the specified therapist
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/therapists/{id}:
 *   put:
 *     summary: Update a therapist
 *     tags: [Therapists]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the therapist to update
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               personalInformation:
 *                 type: object
 *                 description: Personal details of the therapist (optional)
 *                 properties:
 *                   gender:
 *                     type: string
 *                     description: The gender of the therapist
 *                   dateOfBirth:
 *                     type: string
 *                     format: date
 *                     description: The date of birth of the therapist
 *                   address:
 *                     type: string
 *                     description: The address of the therapist
 *               diploma:
 *                 type: string
 *                 format: binary
 *                 description: Updated diploma file (optional)
 *               license:
 *                 type: string
 *                 format: binary
 *                 description: Updated license file (optional)
 *     responses:
 *       200:
 *         description: Therapist updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Therapist'
 *       400:
 *         description: Missing parameter(s)!
 *       404:
 *         description: Therapist not found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/therapists/{id}:
 *   delete:
 *     summary: Delete a therapist
 *     tags: [Therapists]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the therapist to delete
 *     responses:
 *       204:
 *         description: Therapist deleted successfully
 *       400:
 *         description: Missing parameter(s)!
 *       404:
 *         description: Therapist not found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Therapist:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           description: The UUID of the therapist
 *         personalInformation:
 *           type: object
 *           description: Personal details of the therapist
 *           properties:
 *             gender:
 *               type: string
 *               description: The gender of the therapist
 *             dateOfBirth:
 *               type: string
 *               format: date
 *               description: The date of birth of the therapist
 *             address:
 *               type: string
 *               description: The address of the therapist
 *         diploma:
 *           type: string
 *           description: Diploma or degree obtained by the therapist
 *         license:
 *           type: string
 *           description: License number of the therapist
 *         userId:
 *           type: string
 *           format: uuid
 *           description: ID of the user associated with the therapist
 *         patients:
 *           type: array
 *           description: List of patients being treated by the therapist
 *           items:
 *             $ref: '#/components/schemas/Patient'
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: The time the therapist was created
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: The time the therapist was last updated
 *
 *     Patient:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           description: The UUID of the patient
 *           example: "c1e7b770-8b9b-4fbd-b499-3d39f0d09599"
 *         userId:
 *           type: string
 *           description: The ID of the associated user
 *           example: "a1e7b770-9c9b-4fbd-a499-3d39f0d09588"
 *         medicalProfile:
 *           type: object
 *           description: Medical details related to the patient
 *           properties:
 *             lastVisit:
 *               type: string
 *               format: date
 *               description: Date of the last visit
 *               example: "2025-07-20"
 *             condition:
 *               type: string
 *               description: Medical condition of the patient
 *               example: "Asthma"
 *         personalInformation:
 *           type: object
 *           description: Personal information about the patient
 *           properties:
 *             age:
 *               type: integer
 *               description: Age of the patient
 *               example: 21
 *             gender:
 *               type: string
 *               description: Gender of the patient
 *               example: "male"
 *         emergencyContact:
 *           type: object
 *           description: Emergency contact details
 *           properties:
 *             name:
 *               type: string
 *               description: Name of the emergency contact
 *               example: "Jane Doe"
 *             phone:
 *               type: string
 *               description: Phone number of the emergency contact
 *               example: "+1234567890"
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: The time the patient record was created
 *           example: "2024-08-28T12:34:56Z"
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: The time the patient record was last updated
 *           example: "2024-08-28T12:34:56Z"
 */
