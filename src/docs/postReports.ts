/**
 * @swagger
 * tags:
 *   name: Post reports
 *   description: API for reporting posts
 */

/**
 * @swagger
 * /api/post-report/:
 *   post:
 *     summary: Create a new post report
 *     tags: [Post reports]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - postId
 *               - reportedByUserId
 *               - reason
 *             properties:
 *               postId:
 *                 type: string
 *                 description: The ID of the post being reported
 *               reportedByUserId:
 *                 type: string
 *                 description: The ID of the user who reported the post
 *               reason:
 *                 type: string
 *                 description: The reason for reporting the post
 *     responses:
 *       201:
 *         description: Report created successfully
 *       400:
 *         description: Missing parameter(s)
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/post-report/:
 *   get:
 *     summary: Get all post reports
 *     tags: [Post reports]
 *     responses:
 *       200:
 *         description: List of all post reports
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/PostReport'
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/post-report/post/{postId}:
 *   get:
 *     summary: Get all reports for a specific post
 *     tags: [Post reports]
 *     parameters:
 *       - in: path
 *         name: postId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the post
 *     responses:
 *       200:
 *         description: Reports retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/PostReport'
 *       404:
 *         description: Reports not found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/post-report/{reportId}:
 *   get:
 *     summary: Get a specific report by ID
 *     tags: [Post reports]
 *     parameters:
 *       - in: path
 *         name: reportId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the report
 *     responses:
 *       200:
 *         description: Report retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/PostReport'
 *       404:
 *         description: Report not found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/post-report/{reportId}:
 *   put:
 *     summary: Update a specific report (e.g., mark as reviewed or resolved)
 *     tags: [Post reports]
 *     parameters:
 *       - in: path
 *         name: reportId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the report to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               status:
 *                 type: string
 *                 enum: [Pending, Reviewed, Resolved]
 *                 description: The new status of the report
 *               actionTaken:
 *                 type: string
 *                 description: The action taken to resolve the issue.
 *     responses:
 *       200:
 *         description: Report updated successfully
 *       400:
 *         description: Invalid input
 *       404:
 *         description: Report not found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/post-report/{reportId}:
 *   delete:
 *     summary: Delete a specific report
 *     tags: [Post reports]
 *     parameters:
 *       - in: path
 *         name: reportId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the report to delete
 *     responses:
 *       204:
 *         description: Report deleted successfully
 *       404:
 *         description: Report not found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     PostReport:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           description: Unique identifier for the report
 *         postId:
 *           type: string
 *           description: ID of the reported post
 *         reportedByUserId:
 *           type: string
 *           description: ID of the user who submitted the report
 *         reason:
 *           type: string
 *           description: Reason for reporting the post
 *         status:
 *           type: string
 *           enum: [Pending, Reviewed, Resolved]
 *           description: Current status of the report
 *         actionTaken:
 *           type: string
 *           description: Action taken to resolve the issue.
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 */
