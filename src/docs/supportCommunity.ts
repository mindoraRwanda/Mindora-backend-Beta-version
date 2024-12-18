/**
 * @swagger
 * /api/support-communities:
 *   post:
 *     summary: Create a new support community
 *     tags: [Support Communities]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - moderatorId
 *               - name
 *               - description
 *               - isPrivate
 *             properties:
 *               moderatorId:
 *                 type: string
 *                 description: The ID of the moderator for the community
 *               name:
 *                 type: string
 *                 description: The name of the support community
 *               profile:
 *                 type: string
 *                 format: binary
 *                 description: The path to the community's profile picture
 *               description:
 *                 type: string
 *                 description: A brief description of the support community
 *               isPrivate:
 *                 type: boolean
 *                 description: Whether the community is private
 *     responses:
 *       201:
 *         description: Support community created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SupportCommunity'
 *       400:
 *         description: Missing parameter(s)!
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/support-communities:
 *   get:
 *     summary: Get all support communities
 *     tags: [Support Communities]
 *     responses:
 *       200:
 *         description: A list of support communities
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/SupportCommunity'
 *       404:
 *         description: No support communities found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/support-communities/user/{userId}:
 *   get:
 *     summary: Get all support communities for a specific user
 *     tags: [Support Communities]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the user to retrieve their support communities
 *     responses:
 *       200:
 *         description: Support communities retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 *       400:
 *         description: Missing user ID parameter!
 *       404:
 *         description: Support communities not found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/support-communities/{id}:
 *   get:
 *     summary: Get a single support community by ID
 *     tags: [Support Communities]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the support community to retrieve
 *     responses:
 *       200:
 *         description: Support community retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SupportCommunity'
 *       400:
 *         description: Missing ID parameter!
 *       404:
 *         description: Support community not found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/support-communities/{id}:
 *   put:
 *     summary: Update a support community
 *     tags: [Support Communities]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the support community to update
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The new name of the support community (optional)
 *               profile:
 *                 type: string
 *                 format: binary
 *                 description: The path to the community's profile picture
 *               description:
 *                 type: string
 *                 description: The new description of the support community (optional)
 *               isPrivate:
 *                 type: boolean
 *                 description: Whether the community is private (optional)
 *     responses:
 *       200:
 *         description: Support community updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SupportCommunity'
 *       400:
 *         description: Missing parameter(s)!
 *       404:
 *         description: Support community not found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/support-communities/{id}:
 *   delete:
 *     summary: Delete a support community
 *     tags: [Support Communities]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the support community to delete
 *     responses:
 *       204:
 *         description: Support community deleted successfully
 *       400:
 *         description: Missing ID parameter!
 *       404:
 *         description: Support community not found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           description: The UUID of the user
 *         firstName:
 *           type: string
 *           description: The first name of the user
 *         lastName:
 *           type: string
 *           description: The last name of the user
 *         username:
 *           type: string
 *           description: The username of the user (optional)
 *         email:
 *           type: string
 *           description: The email of the user
 *         phoneNumber:
 *           type: string
 *           description: The phone number of the user (optional)
 *         profileImage:
 *           type: string
 *           description: The profile image URL of the user (optional)
 *         role:
 *           type: string
 *           description: The role of the user in the system (e.g., patient, admin, therapist)
 *         resetPasswordToken:
 *           type: string
 *           description: Token used for resetting the user's password (optional)
 *         resetPasswordExpiry:
 *           type: string
 *           description: Expiry date of the reset password token (optional)
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: The time the user was created
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: The time the user was last updated
 *         communities:
 *           type: array
 *           description: The list of communities the user is part of
 *           items:
 *             $ref: '#/components/schemas/SupportCommunity'
 *
 *     SupportCommunity:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           description: The UUID of the support community
 *         moderatorId:
 *           type: string
 *           description: The ID of the moderator for the community
 *         name:
 *           type: string
 *           description: The name of the support community
 *         description:
 *           type: string
 *           description: A brief description of the support community
 *         isPrivate:
 *           type: boolean
 *           description: Whether the community is private
 *         posts:
 *           type: array
 *           description: The posts related to this support community
 *           items:
 *             $ref: '#/components/schemas/CommunityPost'
 *         members:
 *           type: array
 *           description: The members of the support community
 *           items:
 *             $ref: '#/components/schemas/User'
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: The time the support community was created
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: The time the support community was last updated
 *         UserCommunity:
 *           type: object
 *           description: Information about the user's membership in the community
 *           properties:
 *             communityId:
 *               type: string
 *               description: The UUID of the community
 *             userId:
 *               type: string
 *               description: The UUID of the user
 *             joinedAt:
 *               type: string
 *               format: date-time
 *               description: The time the user joined the community
 *             role:
 *               type: string
 *               description: The user's role in the community
 *             status:
 *               type: string
 *               description: The user's status in the community
 *             createdAt:
 *               type: string
 *               format: date-time
 *               description: The time the user-community relation was created
 *             updatedAt:
 *               type: string
 *               format: date-time
 *               description: The last time the user-community relation was updated
 *
 *     CommunityPost:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           description: The UUID of the community post
 *         communityId:
 *           type: string
 *           description: The ID of the support community
 *         title:
 *           type: string
 *           description: The title of the post
 *         content:
 *           type: string
 *           description: The content of the post (optional)
 *         isFlagged:
 *           type: boolean
 *           description: Whether the post is flagged for review
 *         createdBy:
 *           type: string
 *           description: The ID of the user who created the post
 *         attachments:
 *           type: array
 *           description: Attachments (image, video, or article) for the post (optional)
 *           items:
 *             type: string
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: The time the post was created
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: The time the post was last updated
 */
