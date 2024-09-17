/**
 * @swagger
 * /api/languages:
 *   post:
 *     summary: Create a new language
 *     tags: [Language support]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - code
 *               - name
 *             properties:
 *               code:
 *                 type: string
 *                 description: The language code (e.g., "en" for English)
 *               name:
 *                 type: string
 *                 description: The name of the language (e.g., "English")
 *               isDefault:
 *                 type: boolean
 *                 description: Whether this language is the default language
 *     responses:
 *       201:
 *         description: Language created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Language support'
 *       400:
 *         description: Missing required parameter(s)
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/languages:
 *   get:
 *     summary: Get all languages
 *     tags: [Language support]
 *     responses:
 *       200:
 *         description: A list of languages
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Language support'
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/languages/{id}:
 *   get:
 *     summary: Get a language by ID
 *     tags: [Language support]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the language to retrieve
 *     responses:
 *       200:
 *         description: Language retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Language support'
 *       400:
 *         description: Missing language ID
 *       404:
 *         description: Language not found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/languages/{id}:
 *   put:
 *     summary: Update a language by ID
 *     tags: [Language support]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the language to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               code:
 *                 type: string
 *                 description: The language code
 *               name:
 *                 type: string
 *                 description: The language name
 *               isDefault:
 *                 type: boolean
 *                 description: Whether this language is the default language
 *     responses:
 *       200:
 *         description: Language updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Language support'
 *       400:
 *         description: Missing required parameter(s)
 *       404:
 *         description: Language not found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/languages/{id}:
 *   delete:
 *     summary: Delete a language by ID
 *     tags: [Language support]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the language to delete
 *     responses:
 *       204:
 *         description: Language deleted successfully
 *       400:
 *         description: Missing language ID
 *       404:
 *         description: Language not found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Language support:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           description: The UUID of the language
 *         code:
 *           type: string
 *           description: The language code (e.g., "en" for English)
 *         name:
 *           type: string
 *           description: The name of the language
 *         isDefault:
 *           type: boolean
 *           description: Whether the language is the default one
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: The time the language was created
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: The time the language was last updated
 */
