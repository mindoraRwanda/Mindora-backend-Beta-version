/**
 * @swagger
 * /api/subscriptions:
 *   post:
 *     summary: Create a new subscription
 *     tags: [Subscriptions]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - userId
 *               - membershipPlanId
 *               - startDate
 *               - endDate
 *               - status
 *             properties:
 *               userId:
 *                 type: string
 *                 description: The ID of the user for the subscription
 *               membershipPlanId:
 *                 type: string
 *                 description: The ID of the membership plan
 *               startDate:
 *                 type: string
 *                 format: date
 *                 description: The start date of the subscription
 *               endDate:
 *                 type: string
 *                 format: date
 *                 description: The end date of the subscription
 *               paymentMethod:
 *                 type: string
 *                 description: The payment method for the subscription (optional)
 *               status:
 *                 type: string
 *                 enum: ["Active", "Expired", "Cancelled", "Paused"]
 *                 description: The status of the subscription
 *     responses:
 *       201:
 *         description: Subscription created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Subscription'
 *       400:
 *         description: Missing parameter(s)!
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/subscriptions:
 *   get:
 *     summary: Get all subscriptions
 *     tags: [Subscriptions]
 *     responses:
 *       200:
 *         description: A list of subscriptions
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Subscription'
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/subscriptions/users/{userId}:
 *   get:
 *     summary: Get a subscription by user ID
 *     tags: [Subscriptions]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: The user ID whose subscription to retrieve
 *     responses:
 *       200:
 *         description: User subscription retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Subscription'
 *       400:
 *         description: Missing user ID parameter!
 *       404:
 *         description: User subscription not found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/subscriptions/{id}:
 *   get:
 *     summary: Get a subscription by ID
 *     tags: [Subscriptions]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the subscription to retrieve
 *     responses:
 *       200:
 *         description: Subscription retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Subscription'
 *       400:
 *         description: Missing ID parameter!
 *       404:
 *         description: Subscription not found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/subscriptions/{id}:
 *   put:
 *     summary: Update a subscription
 *     tags: [Subscriptions]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the subscription to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: string
 *                 description: The ID of the user for the subscription
 *               membershipPlanId:
 *                 type: string
 *                 description: The ID of the membership plan
 *               startDate:
 *                 type: string
 *                 format: date
 *                 description: The start date of the subscription
 *               endDate:
 *                 type: string
 *                 format: date
 *                 description: The end date of the subscription
 *               paymentMethod:
 *                 type: string
 *                 description: The payment method for the subscription
 *               status:
 *                 type: string
 *                 enum: ["Active", "Expired", "Cancelled", "Paused"]
 *                 description: The status of the subscription
 *     responses:
 *       200:
 *         description: Subscription updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Subscription'
 *       400:
 *         description: Missing parameter(s)!
 *       404:
 *         description: Subscription not found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/subscriptions/{id}:
 *   delete:
 *     summary: Delete a subscription
 *     tags: [Subscriptions]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the subscription to delete
 *     responses:
 *       204:
 *         description: Subscription deleted successfully
 *       400:
 *         description: Missing ID parameter!
 *       404:
 *         description: Subscription not found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Subscription:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           description: The UUID of the subscription
 *         userId:
 *           type: string
 *           description: The ID of the user for the subscription
 *         membershipPlanId:
 *           type: string
 *           description: The ID of the membership plan
 *         startDate:
 *           type: string
 *           format: date
 *           description: The start date of the subscription
 *         endDate:
 *           type: string
 *           format: date
 *           description: The end date of the subscription
 *         paymentMethod:
 *           type: string
 *           description: The payment method for the subscription
 *         status:
 *           type: string
 *           enum: ["Active", "Expired", "Cancelled", "Paused"]
 *           description: The status of the subscription
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: The time the subscription was created
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: The time the subscription was last updated
 */
