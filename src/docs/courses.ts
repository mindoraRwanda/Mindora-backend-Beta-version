/**
 * @swagger
 * /api/courses:
 *   post:
 *     summary: Create a new course
 *     tags: [Courses]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - description
 *               - instructor
 *               - category
 *               - duration
 *               - price
 *             properties:
 *               title:
 *                 type: string
 *                 description: The title of the course
 *               description:
 *                 type: string
 *                 description: The description of the course
 *               instructor:
 *                 type: string
 *                 description: The instructor's name
 *               category:
 *                 type: string
 *                 description: The category of the course
 *               duration:
 *                 type: number
 *                 description: Duration of the course in minutes or hours
 *               level:
 *                 type: string
 *                 description: The difficulty level of the course (Basic, Intermediate, Advanced)
 *               price:
 *                 type: number
 *                 description: The price of the course
 *     responses:
 *       201:
 *         description: Course created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Course'
 *       400:
 *         description: Missing parameter(s)!
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/courses:
 *   get:
 *     summary: Get all courses
 *     tags: [Courses]
 *     responses:
 *       200:
 *         description: A list of courses
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Course'
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/courses/{id}:
 *   get:
 *     summary: Get a course by ID
 *     tags: [Courses]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the course to retrieve
 *     responses:
 *       200:
 *         description: Course retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Course'
 *       400:
 *         description: Missing ID parameter!
 *       404:
 *         description: Course not found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/courses/{id}:
 *   put:
 *     summary: Update a course
 *     tags: [Courses]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the course to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 description: The title of the course
 *               description:
 *                 type: string
 *                 description: The description of the course
 *               instructor:
 *                 type: string
 *                 description: The instructor's name
 *               category:
 *                 type: string
 *                 description: The category of the course
 *               duration:
 *                 type: number
 *                 description: Duration of the course in minutes or hours
 *               level:
 *                 type: string
 *                 description: The difficulty level of the course (Basic, Intermediate, Advanced)
 *               price:
 *                 type: number
 *                 description: The price of the course
 *     responses:
 *       200:
 *         description: Course updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Course'
 *       400:
 *         description: Missing parameter(s)!
 *       404:
 *         description: Course not found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/courses/{id}:
 *   delete:
 *     summary: Delete a course
 *     tags: [Courses]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the course to delete
 *     responses:
 *       204:
 *         description: Course deleted successfully
 *       400:
 *         description: Missing ID parameter!
 *       404:
 *         description: Course not found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Course:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           description: The UUID of the course
 *         title:
 *           type: string
 *           description: The title of the course
 *         description:
 *           type: string
 *           description: The description of the course
 *         instructor:
 *           type: string
 *           description: The instructor's name
 *         category:
 *           type: string
 *           description: The category of the course
 *         duration:
 *           type: number
 *           description: Duration of the course in minutes or hours
 *         level:
 *           type: string
 *           description: The difficulty level of the course
 *         price:
 *           type: number
 *           description: The price of the course
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: The time the course was created
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: The time the course was last updated
 */
