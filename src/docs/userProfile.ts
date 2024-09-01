/**
 * @swagger
 * /api/upload/{userId}:
 *   post:
 *     summary: Upload a profile picture for a user
 *     tags:
 *       - User
 *     consumes:
 *       - multipart/form-data
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the user
 *       - in: formData
 *         name: profile
 *         type: file
 *         format: binary
 *         required: true
 *         description: The profile picture to upload
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
 *                   description: The ID of the user
 *                 profileImage:
 *                   type: string
 *                   description: The path to the uploaded profile image
 *                 firstName:
 *                   type: string
 *                   description: First name of the user
 *                 lastName:
 *                   type: string
 *                   description: Last name of the user
 *                 username:
 *                   type: string
 *                   description: Username of the user
 *                 password:
 *                   type: string
 *                   description: Hashed password of the user
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
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Only images (jpeg, jpg, png) are allowed for profile pictures."
 *                 statusCode:
 *                   type: number
 *                   example: 500
 *                 status:
 *                   type: string
 *                   example: "error"
 */
