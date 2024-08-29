/**
 * @swagger
 * /api/upload/{userId}:
 *   post:
 *     summary: Upload a profile picture for a user
 *     tags:
 *       - User
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the user
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               profile:
 *                 type: string
 *                 format: binary
 *                 description: The profile picture to upload
 *     responses:
 *       200:
 *         description: Profile picture uploaded successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                 profileImage:
 *                   type: string
 *                   description: The path to the uploaded profile image
 *                 firstName:
 *                   type: string
 *                   description: First name of user
 *                 lastName:
 *                   type: string
 *                   description: last name of user
 *                 username:
 *                   type: string
 *                   description: username of user
 *                 password:
 *                   type: string
 *                   description: hashed password of user
 *       400:
 *         description: Bad Request. Either no picture was uploaded, or userId was missing.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "No picture uploaded or User ID is missing."
 *       404:
 *         description: User not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "User not found"
 *       500:
 *         description: Internal server error
 */
