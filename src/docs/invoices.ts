/**
 * @swagger
 * /api/invoices:
 *   post:
 *     summary: Create a new invoice
 *     tags: [Invoices]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - userId
 *               - services
 *               - dueDate
 *             properties:
 *               userId:
 *                 type: string
 *                 description: The ID of the user associated with the invoice
 *               services:
 *                 type: array
 *                 items:
 *                   type: string
 *                   description: The ID of a service included in the invoice
 *                 description: The IDs of the services included in the invoice
 *               dueDate:
 *                 type: string
 *                 format: date-time
 *                 description: The due date for the invoice
 *     responses:
 *       201:
 *         description: Invoice created successfully
 *       400:
 *         description: Missing parameter(s)!
 *       404:
 *         description: Patient not found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/invoices:
 *   get:
 *     summary: Get all invoices
 *     tags: [Invoices]
 *     responses:
 *       200:
 *         description: A list of invoices
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Invoice'
 *       404:
 *         description: Invoices not found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/invoices/user/{userId}:
 *   get:
 *     summary: Get all invoices for a particular user
 *     tags: [Invoices]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the user whose invoices to retrieve
 *     responses:
 *       200:
 *         description: A list of invoices for the user
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Invoice'
 *       400:
 *         description: Missing parameter(s)!
 *       404:
 *         description: User invoices not found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/invoices/{id}:
 *   get:
 *     summary: Get an invoice by ID
 *     tags: [Invoices]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the invoice to retrieve
 *     responses:
 *       200:
 *         description: Invoice retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Invoice'
 *       400:
 *         description: Missing ID parameter!
 *       404:
 *         description: Invoice not found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/invoices/{id}:
 *   put:
 *     summary: Update an invoice
 *     tags: [Invoices]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the invoice to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: string
 *                 description: The ID of the user associated with the invoice
 *               services:
 *                 type: array
 *                 items:
 *                   type: string
 *                   description: The ID of a service included in the invoice
 *               dueDate:
 *                 type: string
 *                 format: date-time
 *                 description: The due date for the invoice
 *     responses:
 *       200:
 *         description: Invoice updated successfully
 *       400:
 *         description: Missing parameter(s)!
 *       404:
 *         description: Invoice not found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/invoices/{id}:
 *   delete:
 *     summary: Delete an invoice
 *     tags: [Invoices]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the invoice to delete
 *     responses:
 *       204:
 *         description: Invoice deleted successfully
 *       400:
 *         description: Missing ID parameter!
 *       404:
 *         description: Invoice not found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Invoice:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           description: The UUID of the invoice
 *         userId:
 *           type: string
 *           description: The ID of the user associated with the invoice
 *         services:
 *           type: array
 *           items:
 *             type: string
 *             description: The ID of a service included in the invoice
 *         clientCoverage:
 *           type: number
 *           description: The portion of the total cost covered by the client
 *         insuranceCoverage:
 *           type: number
 *           description: The portion of the total cost covered by insurance
 *         status:
 *           type: string
 *           enum: ["Pending", "Paid", "Overdue"]
 *           description: The status of the invoice
 *         dueDate:
 *           type: string
 *           format: date-time
 *           description: The due date of the invoice
 *         paidAt:
 *           type: string
 *           format: date-time
 *           description: The payment date of the invoice (if applicable)
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: The time the invoice was created
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: The time the invoice was last updated
 */
