/**
 * @swagger
 * /api/progress/logs/report:
 *   post:
 *     summary: Create a new progress report
 *     tags: [ProgressReports]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - userId
 *               - startDate
 *               - endDate
 *             properties:
 *               userId:
 *                 type: string
 *                 description: The ID of the user this progress report belongs to
 *               startDate:
 *                 type: string
 *                 format: date
 *                 description: The start date of the progress report period
 *               endDate:
 *                 type: string
 *                 format: date
 *                 description: The end date of the progress report period
 *     responses:
 *       201:
 *         description: Progress report created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ProgressReport'
 *       400:
 *         description: Missing parameter(s) or invalid input
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/progress/logs/report/user/{userId}:
 *   get:
 *     summary: Get all progress reports for a user
 *     tags: [ProgressReports]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the user whose progress reports are being retrieved
 *     responses:
 *       200:
 *         description: A list of progress reports
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/ProgressReport'
 *       400:
 *         description: Missing user ID parameter
 *       404:
 *         description: No progress reports found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/progress/logs/report/{id}:
 *   get:
 *     summary: Get a progress report by ID
 *     tags: [ProgressReports]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the progress report to retrieve
 *     responses:
 *       200:
 *         description: Progress report retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ProgressReport'
 *       400:
 *         description: Missing ID parameter
 *       404:
 *         description: Progress report not found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/progress/logs/report/{id}:
 *   put:
 *     summary: Update a progress report
 *     tags: [ProgressReports]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the progress report to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               moodSummary:
 *                 type: string
 *                 description: Updated mood summary
 *               symptomSummary:
 *                 type: string
 *                 description: Updated symptom summary
 *     responses:
 *       200:
 *         description: Progress report updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ProgressReport'
 *       400:
 *         description: Missing parameter(s) or invalid input
 *       404:
 *         description: Progress report not found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/progress/logs/report/{id}:
 *   delete:
 *     summary: Delete a progress report
 *     tags: [ProgressReports]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the progress report to delete
 *     responses:
 *       204:
 *         description: Progress report deleted successfully
 *       400:
 *         description: Missing ID parameter
 *       404:
 *         description: Progress report not found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     ProgressReport:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           description: The UUID of the progress report
 *         userId:
 *           type: string
 *           description: The UUID of the user this progress report belongs to
 *         startDate:
 *           type: string
 *           format: date
 *           description: The start date of the progress report period
 *         endDate:
 *           type: string
 *           format: date
 *           description: The end date of the progress report period
 *         moodSummary:
 *           type: string
 *           description: A summary of the user's mood over the period
 *         symptomSummary:
 *           type: string
 *           description: A summary of the user's symptoms over the period
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: The time the progress report was created
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: The time the progress report was last updated
 */
