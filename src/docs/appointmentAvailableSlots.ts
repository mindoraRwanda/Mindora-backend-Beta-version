/**
 * @swagger
 * /api/appointment_available_slots:
 *   post:
 *     summary: Create a new appointment available slot
 *     tags: [Appointment available slots]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - therapistId
 *               - availableDay
 *               - startTime
 *               - endTime
 *               - recurring
 *               - timeZone
 *             properties:
 *               therapistId:
 *                 type: string
 *                 description: The ID of the therapist
 *               availableDay:
 *                 type: string
 *                 description: The day of the week when the slot is available
 *               startTime:
 *                 type: string
 *                 format: date-time
 *                 description: The start time of the available slot
 *               endTime:
 *                 type: string
 *                 format: date-time
 *                 description: The end time of the available slot
 *               recurring:
 *                 type: boolean
 *                 description: Whether the slot is recurring or not
 *               date:
 *                 type: string
 *                 format: date
 *                 description: The specific date for the slot if it is not recurring
 *               timeZone:
 *                 type: string
 *                 description: The time zone of the available slot
 *     responses:
 *       201:
 *         description: Appointment available slot created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AppointmentAvailableSlot'
 *       400:
 *         description: Missing parameter(s)!
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/appointment_available_slots:
 *   get:
 *     summary: Get all appointment available slots
 *     tags: [Appointment available slots]
 *     responses:
 *       200:
 *         description: A list of appointment available slots
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/AppointmentAvailableSlot'
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/appointment_available_slots/therapists/{therapistId}:
 *   get:
 *     summary: Retrieve available slots for a specific therapist
 *     tags: [Appointment available slots]
 *     parameters:
 *       - in: path
 *         name: therapistId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the therapist whose available slots are to be retrieved
 *     responses:
 *       200:
 *         description: A list of available appointment slots for the therapist
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/AppointmentAvailableSlot'
 *       400:
 *         description: Missing therapist ID parameter
 *       404:
 *         description: Slots not found for the therapist
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/appointment_available_slots/{id}:
 *   get:
 *     summary: Get an appointment available slot by ID
 *     tags: [Appointment available slots]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the appointment available slot to retrieve
 *     responses:
 *       200:
 *         description: Appointment available slot retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AppointmentAvailableSlot'
 *       400:
 *         description: Missing parameter(s)!
 *       404:
 *         description: Slot not found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/appointment_available_slots/{id}:
 *   put:
 *     summary: Update an appointment available slot
 *     tags: [Appointment available slots]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the appointment available slot to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               therapistId:
 *                 type: string
 *                 description: The ID of the therapist
 *               availableDay:
 *                 type: string
 *                 description: The day of the week when the slot is available
 *               startTime:
 *                 type: string
 *                 format: date-time
 *                 description: The start time of the available slot
 *               endTime:
 *                 type: string
 *                 format: date-time
 *                 description: The end time of the available slot
 *               recurring:
 *                 type: boolean
 *                 description: Whether the slot is recurring or not
 *               date:
 *                 type: string
 *                 format: date
 *                 description: The specific date for the slot if it is not recurring
 *               timeZone:
 *                 type: string
 *                 description: The time zone of the available slot
 *     responses:
 *       200:
 *         description: Appointment available slot updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AppointmentAvailableSlot'
 *       400:
 *         description: Missing parameter(s)!
 *       404:
 *         description: Slot not found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/appointment_available_slots/{id}:
 *   delete:
 *     summary: Delete an appointment available slot
 *     tags: [Appointment available slots]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the appointment available slot to delete
 *     responses:
 *       204:
 *         description: Appointment available slot deleted successfully
 *       400:
 *         description: Missing parameter(s)!
 *       404:
 *         description: Slot not found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     AppointmentAvailableSlot:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           description: The UUID of the appointment available slot
 *         therapistId:
 *           type: string
 *           description: The UUID of the therapist
 *         availableDay:
 *           type: string
 *           description: The day of the week when the slot is available
 *         startTime:
 *           type: string
 *           format: date-time
 *           description: The start time of the available slot
 *         endTime:
 *           type: string
 *           format: date-time
 *           description: The end time of the available slot
 *         recurring:
 *           type: boolean
 *           description: Whether the slot is recurring or not
 *         date:
 *           type: string
 *           format: date
 *           description: The specific date for the slot if it is not recurring
 *         timeZone:
 *           type: string
 *           description: The time zone of the available slot
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: The time the slot was created
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: The time the slot was last updated
 */
