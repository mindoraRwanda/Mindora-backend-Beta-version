/**
 * @swagger
 * /api/insurance-service-coverages:
 *   post:
 *     summary: Create a new InsuranceServiceCoverage
 *     tags: [InsuranceServiceCoverage]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - insuranceId
 *               - serviceId
 *               - coveragePercentage
 *             properties:
 *               insuranceId:
 *                 type: string
 *                 description: The ID of the insurance
 *               serviceId:
 *                 type: string
 *                 description: The ID of the service
 *               coveragePercentage:
 *                 type: number
 *                 description: The percentage of coverage
 *     responses:
 *       201:
 *         description: InsuranceServiceCoverage created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/InsuranceServiceCoverage'
 *       400:
 *         description: Missing parameter(s)!
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/insurance-service-coverages:
 *   get:
 *     summary: Get all InsuranceServiceCoverages
 *     tags: [InsuranceServiceCoverage]
 *     responses:
 *       200:
 *         description: A list of InsuranceServiceCoverages
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/InsuranceServiceCoverage'
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/insurance-service-coverages/{id}:
 *   get:
 *     summary: Get an InsuranceServiceCoverage by ID
 *     tags: [InsuranceServiceCoverage]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the InsuranceServiceCoverage to retrieve
 *     responses:
 *       200:
 *         description: InsuranceServiceCoverage retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/InsuranceServiceCoverage'
 *       400:
 *         description: Missing parameter(s)!
 *       404:
 *         description: InsuranceServiceCoverage not found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/insurance-service-coverages/{id}:
 *   put:
 *     summary: Update an InsuranceServiceCoverage
 *     tags: [InsuranceServiceCoverage]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the InsuranceServiceCoverage to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               insuranceId:
 *                 type: string
 *                 description: The ID of the insurance
 *               serviceId:
 *                 type: string
 *                 description: The ID of the service
 *               coveragePercentage:
 *                 type: number
 *                 description: The percentage of coverage
 *     responses:
 *       200:
 *         description: InsuranceServiceCoverage updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/InsuranceServiceCoverage'
 *       400:
 *         description: Missing parameter(s)!
 *       404:
 *         description: InsuranceServiceCoverage not found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/insurance-service-coverages/{id}:
 *   delete:
 *     summary: Delete an InsuranceServiceCoverage
 *     tags: [InsuranceServiceCoverage]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the InsuranceServiceCoverage to delete
 *     responses:
 *       204:
 *         description: InsuranceServiceCoverage deleted successfully
 *       400:
 *         description: Missing parameter(s)!
 *       404:
 *         description: InsuranceServiceCoverage not found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     InsuranceServiceCoverage:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           description: The UUID of the InsuranceServiceCoverage
 *         insuranceId:
 *           type: string
 *           description: The ID of the insurance
 *         serviceId:
 *           type: string
 *           description: The ID of the service
 *         coveragePercentage:
 *           type: number
 *           description: The percentage of coverage
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: The time the InsuranceServiceCoverage was created
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: The time the InsuranceServiceCoverage was last updated
 */
