/**
 * @swagger
 * /api/billing-reports:
 *   post:
 *     summary: Create a new billing report
 *     tags: [BillingReports]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - startDate
 *               - endDate
 *             properties:
 *               startDate:
 *                 type: string
 *                 format: date
 *                 description: The start date of the billing period
 *               endDate:
 *                 type: string
 *                 format: date
 *                 description: The end date of the billing period
 *     responses:
 *       201:
 *         description: Billing report created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/BillingReport'
 *       400:
 *         description: Missing parameter(s)!
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/billing-reports:
 *   get:
 *     summary: Get all billing reports
 *     tags: [BillingReports]
 *     responses:
 *       200:
 *         description: A list of billing reports
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/BillingReport'
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/billing-reports/{id}:
 *   get:
 *     summary: Get a billing report by ID
 *     tags: [BillingReports]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the billing report to retrieve
 *     responses:
 *       200:
 *         description: Billing report retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/BillingReport'
 *       400:
 *         description: Missing parameter(s)!
 *       404:
 *         description: Billing report not found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/billing-reports/{id}:
 *   put:
 *     summary: Update a billing report
 *     tags: [BillingReports]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the billing report to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               startDate:
 *                 type: string
 *                 format: date
 *                 description: The start date of the billing period
 *               endDate:
 *                 type: string
 *                 format: date
 *                 description: The end date of the billing period
 *               totalRevenue:
 *                 type: number
 *                 description: The total revenue during the billing period
 *               totalOutstandingBalance:
 *                 type: number
 *                 description: The total outstanding balance
 *               approvedInsuranceClaims:
 *                 type: number
 *                 description: Total approved insurance claims
 *               pendingInsuranceClaims:
 *                 type: number
 *                 description: Total pending insurance claims
 *               rejectedInsuranceClaims:
 *                 type: number
 *                 description: Total rejected insurance claims
 *     responses:
 *       200:
 *         description: Billing report updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/BillingReport'
 *       400:
 *         description: Missing parameter(s)!
 *       404:
 *         description: Billing report not found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/billing-reports/{id}:
 *   delete:
 *     summary: Delete a billing report
 *     tags: [BillingReports]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the billing report to delete
 *     responses:
 *       204:
 *         description: Billing report deleted successfully
 *       400:
 *         description: Missing parameter(s)!
 *       404:
 *         description: Billing report not found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     BillingReport:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           description: The UUID of the billing report
 *         startDate:
 *           type: string
 *           format: date
 *           description: The start date of the billing period
 *         endDate:
 *           type: string
 *           format: date
 *           description: The end date of the billing period
 *         totalRevenue:
 *           type: number
 *           description: The total revenue during the billing period
 *         totalOutstandingBalance:
 *           type: number
 *           description: The total outstanding balance
 *         approvedInsuranceClaims:
 *           type: number
 *           description: Total approved insurance claims
 *         pendingInsuranceClaims:
 *           type: number
 *           description: Total pending insurance claims
 *         rejectedInsuranceClaims:
 *           type: number
 *           description: Total rejected insurance claims
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: The time the billing report was created
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: The time the billing report was last updated
 */
