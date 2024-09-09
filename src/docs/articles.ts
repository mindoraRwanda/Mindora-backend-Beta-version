/**
 * @swagger
 * /api/articles:
 *   post:
 *     summary: Create a new article
 *     tags: [Articles]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - courseId
 *               - title
 *               - author
 *               - category
 *               - publishedDate
 *               - file
 *             properties:
 *               courseId:
 *                 type: string
 *                 description: The ID of the course the article belongs to
 *               title:
 *                 type: string
 *                 description: The title of the article
 *               author:
 *                 type: string
 *                 description: The author of the article
 *               category:
 *                 type: string
 *                 description: The category of the article
 *               publishedDate:
 *                 type: string
 *                 format: date
 *                 description: The date when the article was published
 *               file:
 *                 type: string
 *                 format: binary
 *                 description: The image file for the article
 *     responses:
 *       201:
 *         description: Article created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Article'
 *       400:
 *         description: Missing parameter(s)!
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/articles/courses/{courseId}:
 *   get:
 *     summary: Get all articles by course ID
 *     tags: [Articles]
 *     parameters:
 *       - in: path
 *         name: courseId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the course to which article belongs
 *     responses:
 *       200:
 *         description: A list of articles
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Article'
 *       400:
 *         description: Missing course ID parameter!
 *       404:
 *         description: No articles found for this course.
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/articles/{id}:
 *   get:
 *     summary: Get an article by ID
 *     tags: [Articles]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the article to retrieve
 *     responses:
 *       200:
 *         description: Article retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Article'
 *       400:
 *         description: Missing parameter(s)!
 *       404:
 *         description: Article not found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/articles/{id}:
 *   put:
 *     summary: Update an article
 *     tags: [Articles]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the article to update
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 description: The title of the article
 *               author:
 *                 type: string
 *                 description: The author of the article
 *               publishedDate:
 *                 type: string
 *                 format: date
 *                 description: The date when the article was published
 *               file:
 *                 type: string
 *                 format: binary
 *                 description: (Optional) The new image file for the article
 *     responses:
 *       200:
 *         description: Article updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Article'
 *       400:
 *         description: Missing parameter(s)!
 *       404:
 *         description: Article not found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/articles/{id}:
 *   delete:
 *     summary: Delete an article
 *     tags: [Articles]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the article to delete
 *     responses:
 *       204:
 *         description: Article deleted successfully
 *       400:
 *         description: Missing ID parameter!
 *       404:
 *         description: Article not found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Article:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           description: The UUID of the article
 *         courseId:
 *           type: string
 *           description: The ID of the course the article belongs to
 *         title:
 *           type: string
 *           description: The title of the article
 *         author:
 *           type: string
 *           description: The author of the article
 *         url:
 *           type: string
 *           description: The URL where the article image is stored (e.g., Cloudinary)
 *         publishedDate:
 *           type: string
 *           format: date
 *           description: The date when the article was published
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: The time the article was created
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: The time the article was last updated
 */
