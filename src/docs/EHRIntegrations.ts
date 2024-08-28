/**
 * @swagger
 * /api/future-integrations:
 *   post:
 *     summary: Create a new future integration
 *     tags: [EHR future integrations]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - ehrSystemName
 *               - apiEndPoint
 *             properties:
 *               ehrSystemName:
 *                 type: string
 *                 description: The name of the EHR system
 *               apiEndPoint:
 *                 type: string
 *                 description: The API endpoint for the EHR system
 *               authMethod:
 *                 type: string
 *                 description: The authentication method for the API (optional)
 *               lastSyncTime:
 *                 type: string
 *                 format: date-time
 *                 description: The last time the integration was synced (optional)
 *               status:
 *                 type: string
 *                 enum: [active, inactive]
 *                 description: The status of the integration (optional)
 *     responses:
 *       201:
 *         description: Future integration created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/FutureIntegration'
 *       400:
 *         description: Missing parameter(s)!
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/future-integrations:
 *   get:
 *     summary: Get all future integrations
 *     tags: [EHR future integrations]
 *     responses:
 *       200:
 *         description: A list of future integrations
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/FutureIntegration'
 *       404:
 *         description: No future integrations found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/future-integrations/{id}:
 *   get:
 *     summary: Get a single future integration by ID
 *     tags: [EHR future integrations]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the future integration to retrieve
 *     responses:
 *       200:
 *         description: Future integration retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/FutureIntegration'
 *       400:
 *         description: Missing parameter(s)!
 *       404:
 *         description: Future integration not found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/future-integrations/{id}:
 *   put:
 *     summary: Update a future integration
 *     tags: [EHR future integrations]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the future integration to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               ehrSystemName:
 *                 type: string
 *                 description: The name of the EHR system (optional)
 *               apiEndPoint:
 *                 type: string
 *                 description: The API endpoint for the EHR system (optional)
 *               authMethod:
 *                 type: string
 *                 description: The authentication method for the API (optional)
 *               lastSyncTime:
 *                 type: string
 *                 format: date-time
 *                 description: The last time the integration was synced (optional)
 *               status:
 *                 type: string
 *                 enum: [active, inactive]
 *                 description: The status of the integration (optional)
 *     responses:
 *       200:
 *         description: Future integration updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/FutureIntegration'
 *       400:
 *         description: Missing parameter(s)!
 *       404:
 *         description: Future integration not found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/future-integrations/{id}:
 *   delete:
 *     summary: Delete a future integration
 *     tags: [EHR future integrations]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the future integration to delete
 *     responses:
 *       204:
 *         description: Future integration deleted successfully
 *       400:
 *         description: Missing parameter(s)!
 *       404:
 *         description: Future integration not found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     FutureIntegration:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           description: The UUID of the future integration
 *         ehrSystemName:
 *           type: string
 *           description: The name of the EHR system
 *         apiEndPoint:
 *           type: string
 *           description: The API endpoint for the EHR system
 *         authMethod:
 *           type: string
 *           description: The authentication method for the API
 *         lastSyncTime:
 *           type: string
 *           format: date-time
 *           description: The last time the integration was synced
 *         status:
 *           type: string
 *           enum: [active, inactive]
 *           description: The status of the integration
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: The time the future integration was created
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: The time the future integration was last updated
 */
