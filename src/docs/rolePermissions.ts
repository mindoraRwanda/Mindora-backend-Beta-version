/**
 * @swagger
 * tags:
 *   name: RolePermissions
 *   description: API endpoints for managing role permissions
 */

/**
 * @swagger
 * /api/roles/{roleId}/permissions/{permissionId}:
 *   post:
 *     summary: Assign a permission to a role
 *     tags: [RolePermissions]
 *     parameters:
 *       - in: path
 *         name: roleId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the role
 *       - in: path
 *         name: permissionId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the permission
 *     responses:
 *       201:
 *         description: Permission assigned to role successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/RolePermission'
 *       404:
 *         description: Role or Permission not found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/roles/{roleId}/permissions:
 *   get:
 *     summary: Retrieve all permissions for a role
 *     tags: [RolePermissions]
 *     parameters:
 *       - in: path
 *         name: roleId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the role
 *     responses:
 *       200:
 *         description: A list of permissions assigned to the role
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Permission'
 *       404:
 *         description: Role not found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/roles/{roleId}/permissions/{permissionId}:
 *   delete:
 *     summary: Remove a permission from a role
 *     tags: [RolePermissions]
 *     parameters:
 *       - in: path
 *         name: roleId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the role
 *       - in: path
 *         name: permissionId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the permission
 *     responses:
 *       204:
 *         description: Permission removed from role successfully
 *       404:
 *         description: Permission not assigned to this role
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     RolePermission:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           description: The unique identifier of the role permission assignment
 *         roleId:
 *           type: string
 *           description: The ID of the assigned role
 *         permissionId:
 *           type: string
 *           description: The ID of the assigned permission
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: Timestamp when the assignment was created
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: Timestamp when the assignment was last updated
 */
