/**
 * @swagger
 * /api/payments:
 *   post:
 *     summary: Create a new payment
 *     tags: [Payments]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - userId
 *               - invoiceId
 *               - amount
 *               - paymentMethod
 *             properties:
 *               userId:
 *                 type: string
 *                 description: The ID of the user making the payment
 *               invoiceId:
 *                 type: string
 *                 description: The ID of the invoice being paid
 *               amount:
 *                 type: number
 *                 description: The amount of the payment
 *               paymentMethod:
 *                 type: string
 *                 enum: ["Credit Card", "Debit Card", "PayPal", "Bank Transfer", "Mobile Money"]
 *                 description: The method of payment
 *               confirmed:
 *                 type: boolean
 *                 description: The confirmation of the payment
 *               insuranceClaimStatus:
 *                 type: string
 *                 description: The status of insurance claim
 *                 enum: ["Not Applicanle", Approved, Rejected, Pending]
 *     responses:
 *       201:
 *         description: Payment created successfully
 *       400:
 *         description: Missing parameter(s)!
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/payments:
 *   get:
 *     summary: Get all payments
 *     tags: [Payments]
 *     responses:
 *       200:
 *         description: A list of payments
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Payment'
 *       404:
 *         description: Payments not found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/payments/user/{userId}:
 *   get:
 *     summary: Get all payments for a particular user
 *     tags: [Payments]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the user whose payments to retrieve
 *     responses:
 *       200:
 *         description: A list of payments for the user
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Payment'
 *       400:
 *         description: Missing parameter(s)!
 *       404:
 *         description: User payments not found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/payments/{id}:
 *   get:
 *     summary: Get a payment by ID
 *     tags: [Payments]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the payment to retrieve
 *     responses:
 *       200:
 *         description: Payment retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Payment'
 *       400:
 *         description: Missing ID parameter!
 *       404:
 *         description: Payment not found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/payments/{id}:
 *   put:
 *     summary: Update a payment
 *     tags: [Payments]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the payment to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: string
 *                 description: The ID of the user making the payment
 *               invoiceId:
 *                 type: string
 *                 description: The ID of the invoice being paid
 *               amount:
 *                 type: number
 *                 description: The amount of the payment
 *               paymentMethod:
 *                 type: string
 *                 enum: ["Credit Card", "Debit Card", "PayPal", "Bank Transfer", "Mobile Money"]
 *                 description: The method of payment
 *               paymentDate:
 *                 type: string
 *                 format: date-time
 *                 description: The date and time the payment was made
 *               insuranceClaimStatus:
 *                 type: string
 *                 description: The status of insurance claim
 *                 enum: ["Not Applicanle", Approved, Rejected, Pending]
 *     responses:
 *       200:
 *         description: Payment updated successfully
 *       400:
 *         description: Missing parameter(s)!
 *       404:
 *         description: Payment not found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/payments/{id}:
 *   delete:
 *     summary: Delete a payment
 *     tags: [Payments]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the payment to delete
 *     responses:
 *       204:
 *         description: Payment deleted successfully
 *       400:
 *         description: Missing ID parameter!
 *       404:
 *         description: Payment not found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Payment:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           description: The UUID of the payment
 *         userId:
 *           type: string
 *           description: The ID of the user associated with the payment
 *         invoiceId:
 *           type: string
 *           description: The ID of the invoice being paid
 *         amount:
 *           type: number
 *           description: The amount of the payment
 *         paymentMethod:
 *           type: string
 *           enum: ["Credit Card", "Debit Card", "PayPal", "Bank Transfer", "Mobile Money"]
 *           description: The method used to make the payment
 *         paymentDate:
 *           type: string
 *           format: date-time
 *           description: The date and time the payment was made
 *         insuranceClaimStatus:
 *           type: string
 *           description: The status of insurance claim
 *           enum: ["Not Applicanle", Approved, Rejected, Pending]
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: The time the payment was created
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: The time the payment was last updated
 */
