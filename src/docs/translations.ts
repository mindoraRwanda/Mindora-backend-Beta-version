/**
 * @swagger
 * /api/translations:
 *   post:
 *     summary: Create a new translation
 *     tags: [Translations]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - languageId
 *               - key
 *               - value
 *             properties:
 *               languageId:
 *                 type: string
 *                 description: The ID of the language this translation is associated with
 *               key:
 *                 type: string
 *                 description: The unique key for the translation text
 *               value:
 *                 type: string
 *                 description: The translation text value
 *     responses:
 *       201:
 *         description: Translation created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Translation'
 *       400:
 *         description: Missing required fields
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/translations:
 *   get:
 *     summary: Get all translations
 *     tags: [Translations]
 *     responses:
 *       200:
 *         description: A list of translations
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Translation'
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/translations/language/{languageId}:
 *   get:
 *     summary: Get all translations for a particular language
 *     tags: [Translations]
 *     parameters:
 *       - in: path
 *         name: languageId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the language to retrieve translations for
 *     responses:
 *       200:
 *         description: A list of translations for the specified language
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Translation'
 *       400:
 *         description: Missing language ID parameter
 *       404:
 *         description: Language translations not found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/translations/{id}:
 *   get:
 *     summary: Get a translation by ID
 *     tags: [Translations]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the translation to retrieve
 *     responses:
 *       200:
 *         description: Translation retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Translation'
 *       400:
 *         description: Missing translation ID
 *       404:
 *         description: Translation not found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/translations/{id}:
 *   put:
 *     summary: Update a translation by ID
 *     tags: [Translations]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the translation to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               languageId:
 *                 type: string
 *                 description: The ID of the language this translation is associated with
 *               key:
 *                 type: string
 *                 description: The unique key for the translation text
 *               value:
 *                 type: string
 *                 description: The translation text value
 *     responses:
 *       200:
 *         description: Translation updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Translation'
 *       400:
 *         description: Missing required fields
 *       404:
 *         description: Translation not found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/translations/{id}:
 *   delete:
 *     summary: Delete a translation by ID
 *     tags: [Translations]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the translation to delete
 *     responses:
 *       204:
 *         description: Translation deleted successfully
 *       400:
 *         description: Missing translation ID
 *       404:
 *         description: Translation not found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Translation:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           description: The UUID of the translation
 *         languageId:
 *           type: string
 *           description: The UUID of the language this translation is associated with
 *         key:
 *           type: string
 *           description: The unique key for the translation text
 *         value:
 *           type: string
 *           description: The translation text value
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: The time the translation was created
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: The time the translation was last updated
 */
