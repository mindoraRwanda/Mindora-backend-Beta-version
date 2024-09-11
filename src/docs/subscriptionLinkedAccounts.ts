/**
 * @swagger
 * /api/subscription-linked-accounts:
 *   post:
 *     summary: Create a new subscription linked account
 *     tags: [Subscription Linked Accounts]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - subscriptionId
 *               - userId
 *             properties:
 *               subscriptionId:
 *                 type: string
 *                 description: The ID of the subscription
 *               userId:
 *                 type: string
 *                 description: The ID of the user
 *     responses:
 *       201:
 *         description: Subscription linked account created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SubscriptionLinkedAccount'
 *       400:
 *         description: Missing parameter(s)!
 *       403:
 *         description: You have reached the subscription limit!
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/subscription-linked-accounts/subscriptions/{subscriptionId}:
 *   get:
 *     summary: Get all linked accounts for a subscription
 *     tags: [Subscription Linked Accounts]
 *     parameters:
 *       - in: path
 *         name: subscriptionId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the subscription
 *     responses:
 *       200:
 *         description: A list of linked accounts
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/SubscriptionLinkedAccount'
 *       404:
 *         description: No linked accounts found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/subscription-linked-accounts/{id}:
 *   get:
 *     summary: Get a subscription linked account by ID
 *     tags: [Subscription Linked Accounts]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the linked account
 *     responses:
 *       200:
 *         description: Linked account retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SubscriptionLinkedAccount'
 *       404:
 *         description: Linked account not found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/subscription-linked-accounts/{id}:
 *   put:
 *     summary: Update a subscription linked account
 *     tags: [Subscription Linked Accounts]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the linked account to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               subscriptionId:
 *                 type: string
 *                 description: The ID of the subscription
 *               userId:
 *                 type: string
 *                 description: The ID of the user
 *     responses:
 *       200:
 *         description: Linked account updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SubscriptionLinkedAccount'
 *       404:
 *         description: Linked account not found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/subscription-linked-accounts/{id}:
 *   delete:
 *     summary: Delete a subscription linked account
 *     tags: [Subscription Linked Accounts]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the linked account to delete
 *     responses:
 *       204:
 *         description: Linked account deleted successfully
 *       404:
 *         description: Linked account not found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     SubscriptionLinkedAccount:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           description: The UUID of the linked account
 *         subscriptionId:
 *           type: string
 *           description: The UUID of the subscription
 *         userId:
 *           type: string
 *           description: The UUID of the user linked to the subscription
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: The time the linked account was created
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: The time the linked account was last updated
 */
