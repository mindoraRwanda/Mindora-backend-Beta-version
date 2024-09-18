/**
 * @swagger
 * /api/resources:
 *   get:
 *     summary: Get all resources available
 *     tags: [Resources]
 *     responses:
 *       200:
 *         description: A list of resources
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 articles:
 *                   type: array
 *                   description: array of articles
 *                   items:
 *                     $ref: '#/components/schemas/Article'
 *                 videos:
 *                   type: array
 *                   description: array of videos
 *                   items:
 *                     $ref: '#/components/schemas/Video'
 *       404:
 *         description: No resources available
 *       500:
 *         description: An unexpected error occurred
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
 *           description: The URL where the article document is stored (e.g., Cloudinary)
 *         picture:
 *           type: string
 *           description: The URL where the article cover image is stored (e.g., Cloudinary)
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
 *
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
