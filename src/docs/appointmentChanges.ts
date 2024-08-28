/**
 * @swagger
 * /api/appointment_changes:
 *   post:
 *     summary: Create a new appointment change
 *     tags: [Appointment changes]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - appointmentId
 *               - reason
 *               - action
 *               - actionBy
 *               - actionTime
 *             properties:
 *               appointmentId:
 *                 type: string
 *                 description: The ID of the appointment being changed
 *               newStartTime:
 *                 type: string
 *                 format: date-time
 *                 description: The new start time for the appointment
 *               newEndTime:
 *                 type: string
 *                 format: date-time
 *                 description: The new end time for the appointment
 *               reason:
 *                 type: string
 *                 description: The reason for the change
 *               action:
 *                 type: string
 *                 description: The action taken (e.g., "Rescheduled", "Canceled")
 *               actionBy:
 *                 type: string
 *                 description: The ID of the user who performed the action
 *               actionTime:
 *                 type: string
 *                 format: date-time
 *                 description: The time when the action was performed
 *     responses:
 *       201:
 *         description: Appointment change created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AppointmentChange'
 *       400:
 *         description: Missing parameter(s)!
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/appointment_changes/{id}:
 *   get:
 *     summary: Get an appointment change by ID
 *     tags: [Appointment changes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the appointment change to retrieve
 *     responses:
 *       200:
 *         description: Appointment change retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AppointmentChange'
 *       400:
 *         description: Missing parameter(s)!
 *       404:
 *         description: Appointment change not found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/appointment_changes/{id}:
 *   put:
 *     summary: Update an appointment change
 *     tags: [Appointment changes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the appointment change to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               newStartTime:
 *                 type: string
 *                 format: date-time
 *                 description: The new start time for the appointment
 *               newEndTime:
 *                 type: string
 *                 format: date-time
 *                 description: The new end time for the appointment
 *               reason:
 *                 type: string
 *                 description: The reason for the change
 *               action:
 *                 type: string
 *                 description: The action taken (e.g., "Rescheduled", "Canceled")
 *               actionBy:
 *                 type: string
 *                 description: The ID of the user who performed the action
 *               actionTime:
 *                 type: string
 *                 format: date-time
 *                 description: The time when the action was performed
 *     responses:
 *       200:
 *         description: Appointment change updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AppointmentChange'
 *       400:
 *         description: Missing parameter(s)!
 *       404:
 *         description: Appointment change not found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/appointment_changes/{id}:
 *   delete:
 *     summary: Delete an appointment change
 *     tags: [Appointment changes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the appointment change to delete
 *     responses:
 *       204:
 *         description: Appointment change deleted successfully
 *       400:
 *         description: Missing parameter(s)!
 *       404:
 *         description: Appointment change not found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/appointment_changes:
 *   get:
 *     summary: Get all appointment changes
 *     tags: [Appointment changes]
 *     responses:
 *       200:
 *         description: A list of appointment changes
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/AppointmentChange'
 *       404:
 *         description: No appointment changes found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     AppointmentChange:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           description: The UUID of the appointment change
 *         appointmentId:
 *           type: string
 *           description: The ID of the appointment being changed
 *         newStartTime:
 *           type: string
 *           format: date-time
 *           description: The new start time for the appointment
 *         newEndTime:
 *           type: string
 *           format: date-time
 *           description: The new end time for the appointment
 *         reason:
 *           type: string
 *           description: The reason for the change
 *         action:
 *           type: string
 *           description: The action taken (e.g., "Rescheduled", "Canceled")
 *         actionBy:
 *           type: string
 *           description: The ID of the user who performed the action
 *         actionTime:
 *           type: string
 *           format: date-time
 *           description: The time when the action was performed
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: The time the appointment change was created
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: The time the appointment change was last updated
 */
