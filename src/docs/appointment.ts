/**
 * @swagger
 * /api/appointments:
 *   post:
 *     summary: Create a new appointment
 *     tags: [Appointments]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - patientId
 *               - therapistId
 *               - startTime
 *               - endTime
 *               - location
 *               - appointmentType
 *               - appointmentSlot
 *               - status
 *             properties:
 *               patientId:
 *                 type: string
 *                 description: The ID of the patient
 *               therapistId:
 *                 type: string
 *                 description: The ID of the therapist
 *               startTime:
 *                 type: string
 *                 format: date-time
 *                 description: The start time of the appointment
 *               endTime:
 *                 type: string
 *                 format: date-time
 *                 description: The end time of the appointment
 *               location:
 *                 type: string
 *                 description: The location of the appointment
 *               appointmentType:
 *                 type: string
 *                 description: The type of the appointment (e.g., "Consultation")
 *               appointmentSlot:
 *                 type: string
 *                 description: The ID of appointment slot
 *               status:
 *                 type: string
 *                 enum: ["Scheduled", "Canceled", "Rescheduled"]
 *                 description: The status of the appointment
 *               notes:
 *                 type: string
 *                 description: Additional notes for the appointment
 *     responses:
 *       201:
 *         description: Appointment created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Appointment'
 *       400:
 *         description: Missing parameter(s)!
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/appointments:
 *   get:
 *     summary: Get all appointments
 *     tags: [Appointments]
 *     responses:
 *       200:
 *         description: A list of appointments
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Appointment'
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/therapists/{therapistId}/appointments:
 *   get:
 *     summary: Get all appointments for a specific therapist
 *     tags: [Appointments]
 *     parameters:
 *       - in: path
 *         name: therapistId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the therapist
 *     responses:
 *       200:
 *         description: Appointments retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Appointment'
 *       400:
 *         description: Missing therapist ID parameter(s)
 *       404:
 *         description: Appointments not found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/patients/{patientId}/appointments:
 *   get:
 *     summary: Get all appointments for a specific patient
 *     tags: [Appointments]
 *     parameters:
 *       - in: path
 *         name: patientId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the patient
 *     responses:
 *       200:
 *         description: Appointments retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Appointment'
 *       400:
 *         description: Missing patient ID parameter(s)
 *       404:
 *         description: Appointments not found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/appointments/{id}:
 *   get:
 *     summary: Get an appointment by ID
 *     tags: [Appointments]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the appointment to retrieve
 *     responses:
 *       200:
 *         description: Appointment retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Appointment'
 *       400:
 *         description: Missing parameter(s)!
 *       404:
 *         description: Appointment not found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/appointments/{id}:
 *   put:
 *     summary: Update an appointment
 *     tags: [Appointments]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the appointment to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               patientId:
 *                 type: string
 *                 description: The ID of the patient
 *               therapistId:
 *                 type: string
 *                 description: The ID of the therapist
 *               startTime:
 *                 type: string
 *                 format: date-time
 *                 description: The start time of the appointment
 *               endTime:
 *                 type: string
 *                 format: date-time
 *                 description: The end time of the appointment
 *               location:
 *                 type: string
 *                 description: The location of the appointment
 *               appointmentType:
 *                 type: string
 *                 description: The type of the appointment
 *               status:
 *                 type: string
 *                 enum: ["Scheduled", "Canceled", "Rescheduled"]
 *                 description: The status of the appointment
 *               notes:
 *                 type: string
 *                 description: Additional notes for the appointment
 *     responses:
 *       200:
 *         description: Appointment updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Appointment'
 *       400:
 *         description: Missing parameter(s)!
 *       404:
 *         description: Appointment not found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/appointments/{id}:
 *   delete:
 *     summary: Delete an appointment
 *     tags: [Appointments]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the appointment to delete
 *     responses:
 *       204:
 *         description: Appointment deleted successfully
 *       400:
 *         description: Missing parameter(s)!
 *       404:
 *         description: Appointment not found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Appointment:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           description: The UUID of the appointment
 *         patientId:
 *           type: string
 *           description: The UUID of the patient
 *         therapistId:
 *           type: string
 *           description: The UUID of the therapist
 *         startTime:
 *           type: string
 *           format: date-time
 *           description: The start time of the appointment
 *         endTime:
 *           type: string
 *           format: date-time
 *           description: The end time of the appointment
 *         location:
 *           type: string
 *           description: The location of the appointment
 *         appointmentType:
 *           type: string
 *           description: The type of the appointment (e.g., "Consultation")
 *         status:
 *           type: string
 *           enum: ["Scheduled", "Canceled", "Rescheduled"]
 *           description: The status of the appointment
 *         notes:
 *           type: string
 *           description: Additional notes for the appointment
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: The time the appointment was created
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: The time the appointment was last updated
 */
