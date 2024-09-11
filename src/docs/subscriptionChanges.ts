/**
 * @swagger
 * /api/subscription-changes:
 *   post:
 *     summary: Create a new subscription change record
 *     tags: [Subscription Changes]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - subscriptionId
 *               - changeType
 *               - previousPlanId
 *               - changeDate
 *               - changedBy
 *             properties:
 *               subscriptionId:
 *                 type: string
 *                 description: The ID of the subscription being changed
 *               changeType:
 *                 type: string
 *                 enum: ["upgrade", "downgrade", "cancellation", "reactivation", "pause"]
 *                 description: The type of change being made to the subscription
 *               previousPlanId:
 *                 type: string
 *                 description: The ID of the previous plan before the change
 *               newPlanId:
 *                 type: string
 *                 description: The ID of the new plan after the change (if applicable)
 *               changeDate:
 *                 type: string
 *                 format: date
 *                 description: The date of the subscription change
 *               changedBy:
 *                 type: string
 *                 description: The ID of the user who made the change
 *               notes:
 *                 type: string
 *                 description: Optional notes about the subscription change
 *     responses:
 *       201:
 *         description: Subscription change created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SubscriptionChange'
 *       400:
 *         description: Missing or invalid parameter(s)!
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/subscription-changes:
 *   get:
 *     summary: Get all subscription changes
 *     tags: [Subscription Changes]
 *     responses:
 *       200:
 *         description: A list of subscription changes
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/SubscriptionChange'
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/subscription-changes/{id}:
 *   get:
 *     summary: Get a subscription change by ID
 *     tags: [Subscription Changes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the subscription change to retrieve
 *     responses:
 *       200:
 *         description: Subscription change retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SubscriptionChange'
 *       400:
 *         description: Missing ID parameter!
 *       404:
 *         description: Subscription change not found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/subscription-changes/{id}:
 *   put:
 *     summary: Update a subscription change
 *     tags: [Subscription Changes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the subscription change to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               changeType:
 *                 type: string
 *                 enum: ["upgrade", "downgrade", "cancellation", "reactivation", "pause"]
 *                 description: The type of change being made to the subscription
 *               previousPlanId:
 *                 type: string
 *                 description: The ID of the previous plan before the change
 *               newPlanId:
 *                 type: string
 *                 description: The ID of the new plan after the change (if applicable)
 *               changeDate:
 *                 type: string
 *                 format: date
 *                 description: The date of the subscription change
 *               changedBy:
 *                 type: string
 *                 description: The ID of the user who made the change
 *               notes:
 *                 type: string
 *                 description: Optional notes about the subscription change
 *     responses:
 *       200:
 *         description: Subscription change updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SubscriptionChange'
 *       400:
 *         description: Missing or invalid parameter(s)!
 *       404:
 *         description: Subscription change not found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/subscription-changes/{id}:
 *   delete:
 *     summary: Delete a subscription change
 *     tags: [Subscription Changes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the subscription change to delete
 *     responses:
 *       204:
 *         description: Subscription change deleted successfully
 *       400:
 *         description: Missing ID parameter!
 *       404:
 *         description: Subscription change not found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     SubscriptionChange:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           description: The UUID of the subscription change record
 *         subscriptionId:
 *           type: string
 *           description: The ID of the subscription being changed
 *         changeType:
 *           type: string
 *           enum: ["upgrade", "downgrade", "cancellation", "reactivation", "pause"]
 *           description: The type of change made to the subscription
 *         previousPlanId:
 *           type: string
 *           description: The ID of the previous plan
 *         newPlanId:
 *           type: string
 *           description: The ID of the new plan (if applicable)
 *         changeDate:
 *           type: string
 *           format: date
 *           description: The date of the subscription change
 *         changedBy:
 *           type: string
 *           description: The ID of the user who made the change
 *         notes:
 *           type: string
 *           description: Optional notes about the subscription change
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: The time the subscription change was created
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: The time the subscription change was last updated
 */
