/**
 * @swagger
 * /api/videos:
 *   post:
 *     summary: Create a new video
 *     tags: [Videos]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - courseId
 *               - title
 *               - description
 *               - publishedDate
 *               - category
 *               - file
 *             properties:
 *               courseId:
 *                 type: string
 *                 description: The ID of the course the video belongs to
 *               title:
 *                 type: string
 *                 description: The title of the video
 *               description:
 *                 type: string
 *                 description: The description of the video
 *               publishedDate:
 *                 type: string
 *                 format: date
 *                 description: The date when the video was published
 *               category:
 *                 type: string
 *                 description: The category of the video
 *               thumbnail:
 *                 type: string
 *                 format: binary
 *                 description: The path or url to picture describing the video
 *               file:
 *                 type: string
 *                 format: binary
 *                 description: The video file to be uploaded
 *     responses:
 *       201:
 *         description: Video created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Video'
 *       400:
 *         description: Missing parameter(s)!
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/videos/course/{courseId}:
 *   get:
 *     summary: Get all videos by course ID
 *     tags: [Videos]
 *     parameters:
 *       - in: path
 *         name: courseId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the course
 *     responses:
 *       200:
 *         description: A list of videos
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Video'
 *       400:
 *         description: Missing course ID parameter!
 *       404:
 *         description: No course videos found.
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/videos/{id}:
 *   get:
 *     summary: Get a video by ID
 *     tags: [Videos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the video to retrieve
 *     responses:
 *       200:
 *         description: Video retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Video'
 *       400:
 *         description: Missing ID parameter!
 *       404:
 *         description: Video not found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/videos/{id}:
 *   put:
 *     summary: Update a video
 *     tags: [Videos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the video to update
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 description: The title of the video
 *               description:
 *                 type: string
 *                 description: The description of the video
 *               publishedDate:
 *                 type: string
 *                 format: date
 *                 description: The date when the video was published
 *               category:
 *                 type: string
 *                 description: The category of the video
 *               thumbnail:
 *                 type: string
 *                 format: binary
 *                 description: The path or url to picture describing the video
 *               file:
 *                 type: string
 *                 format: binary
 *                 description: (Optional) The new video file for the video
 *     responses:
 *       200:
 *         description: Video updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Video'
 *       400:
 *         description: Missing parameter(s)!
 *       404:
 *         description: Video not found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/videos/{id}:
 *   delete:
 *     summary: Delete a video
 *     tags: [Videos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the video to delete
 *     responses:
 *       204:
 *         description: Video deleted successfully
 *       400:
 *         description: Missing ID parameter!
 *       404:
 *         description: Video not found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Video:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           description: The UUID of the video
 *         courseId:
 *           type: string
 *           description: The ID of the course the video belongs to
 *         title:
 *           type: string
 *           description: The title of the video
 *         description:
 *           type: string
 *           description: The description of the video
 *         url:
 *           type: string
 *           description: The URL where the video is stored
 *         category:
 *           type: string
 *           description: The category of the video
 *         duration:
 *           type: number
 *           description: The duration of the video in seconds
 *         publishedDate:
 *           type: string
 *           format: date
 *           description: The date when the video was published
 *         thumbnail:
 *           type: string
 *           description: The path to video thumbnail
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: The time the video was created
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: The time the video was last updated
 */
