/**
 * @swagger
 * /api/membership-plans:
 *   post:
 *     summary: Create a new membership plan
 *     tags: [Membership plans]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - features
 *               - price
 *               - billingCycle
 *               - maxAccounts
 *             properties:
 *               name:
 *                 type: string
 *                 description: The name of the membership plan
 *               features:
 *                 type: object
 *                 description: The features included in the membership plan
 *               price:
 *                 type: number
 *                 format: float
 *                 description: The price of the membership plan
 *               billingCycle:
 *                 type: string
 *                 enum: ["monthly", "quarterly", "yearly"]
 *                 description: The billing cycle of the membership plan
 *               maxAccounts:
 *                 type: integer
 *                 description: The maximum number of accounts allowed with the plan
 *     responses:
 *       201:
 *         description: Membership plan created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/MembershipPlan'
 *       400:
 *         description: Missing parameter(s)!
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/membership-plans:
 *   get:
 *     summary: Get all membership plans
 *     tags: [Membership plans]
 *     responses:
 *       200:
 *         description: A list of membership plans
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/MembershipPlan'
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/membership-plans/{id}:
 *   get:
 *     summary: Get a membership plan by ID
 *     tags: [Membership plans]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the membership plan to retrieve
 *     responses:
 *       200:
 *         description: Membership plan retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/MembershipPlan'
 *       400:
 *         description: Missing ID parameter!
 *       404:
 *         description: Membership plan not found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/membership-plans/{id}:
 *   put:
 *     summary: Update a membership plan
 *     tags: [Membership plans]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the membership plan to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The name of the membership plan
 *               features:
 *                 type: object
 *                 description: The features included in the membership plan
 *               price:
 *                 type: number
 *                 format: float
 *                 description: The price of the membership plan
 *               billingCycle:
 *                 type: string
 *                 enum: ["monthly", "quarterly", "yearly"]
 *                 description: The billing cycle of the membership plan
 *               maxAccounts:
 *                 type: integer
 *                 description: The maximum number of accounts allowed with the plan
 *     responses:
 *       200:
 *         description: Membership plan updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/MembershipPlan'
 *       400:
 *         description: Missing parameter(s)!
 *       404:
 *         description: Membership plan not found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/membership-plans/{id}:
 *   delete:
 *     summary: Delete a membership plan
 *     tags: [Membership plans]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the membership plan to delete
 *     responses:
 *       204:
 *         description: Membership plan deleted successfully
 *       400:
 *         description: Missing ID parameter!
 *       404:
 *         description: Membership plan not found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     MembershipPlan:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           description: The UUID of the membership plan
 *         name:
 *           type: string
 *           description: The name of the membership plan
 *         features:
 *           type: object
 *           description: The features included in the membership plan
 *         price:
 *           type: number
 *           format: float
 *           description: The price of the membership plan
 *         billingCycle:
 *           type: string
 *           enum: ["monthly", "quarterly", "yearly"]
 *           description: The billing cycle of the membership plan
 *         maxAccounts:
 *           type: integer
 *           description: The maximum number of accounts allowed with the plan
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: The time the membership plan was created
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: The time the membership plan was last updated
 */
