/**
 * @swagger
 * /api/course-enrollments:
 *   post:
 *     summary: Create a new course enrollment
 *     tags: [Course enrollments]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - courseId
 *               - userId
 *               - enrolledDate
 *             properties:
 *               courseId:
 *                 type: string
 *                 description: The ID of the course
 *               userId:
 *                 type: string
 *                 description: The ID of the user
 *               enrolledDate:
 *                 type: string
 *                 format: date
 *                 description: The date of enrollment
 *               status:
 *                 type: string
 *                 description: The status of the enrollment (e.g., "In_progress")
 *               progress:
 *                 type: number
 *                 description: The progress of the user in the course (percentage)
 *     responses:
 *       201:
 *         description: Course enrollment created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CourseEnrollment'
 *       400:
 *         description: Missing required parameter(s)!
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/course-enrollments/user/{userId}:
 *   get:
 *     summary: Get all course enrollments for a user
 *     tags: [Course enrollments]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the user whose enrollments to retrieve
 *     responses:
 *       200:
 *         description: A list of course enrollments
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/CourseEnrollment'
 *       400:
 *         description: Missing user ID parameter!
 *       404:
 *         description: Course enrollments not found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/course-enrollments/{id}:
 *   get:
 *     summary: Get a course enrollment by its ID
 *     tags: [Course enrollments]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the course enrollment to retrieve
 *     responses:
 *       200:
 *         description: Course enrollment retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CourseEnrollment'
 *       400:
 *         description: Missing ID parameter!
 *       404:
 *         description: Course enrollment not found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/course-enrollments/{id}:
 *   put:
 *     summary: Update a course enrollment
 *     tags: [Course enrollments]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the course enrollment to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               courseId:
 *                 type: string
 *                 description: The ID of the course
 *               userId:
 *                 type: string
 *                 description: The ID of the user
 *               enrolledDate:
 *                 type: string
 *                 format: date
 *                 description: The date of enrollment
 *               status:
 *                 type: string
 *                 description: The status of the enrollment
 *               progress:
 *                 type: number
 *                 description: The progress of the user in the course
 *     responses:
 *       200:
 *         description: Course enrollment updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CourseEnrollment'
 *       400:
 *         description: Missing required parameter(s)!
 *       404:
 *         description: Course enrollment not found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/course-enrollments/{id}:
 *   delete:
 *     summary: Delete a course enrollment
 *     tags: [Course enrollments]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the course enrollment to delete
 *     responses:
 *       204:
 *         description: Course enrollment deleted successfully
 *       400:
 *         description: Missing ID parameter!
 *       404:
 *         description: Course enrollment not found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     CourseEnrollment:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           description: The UUID of the course enrollment
 *         courseId:
 *           type: string
 *           description: The ID of the course
 *         userId:
 *           type: string
 *           description: The ID of the user
 *         enrolledDate:
 *           type: string
 *           format: date
 *           description: The date of enrollment
 *         status:
 *           type: string
 *           description: The status of the enrollment
 *         progress:
 *           type: number
 *           description: The user's progress in the course (percentage)
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: The time the enrollment was created
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: The time the enrollment was last updated
 */
