import { Request, Response, NextFunction } from "express";
import RolePermission from "../database/models/rolePermission";
import Role from "../database/models/role";
import Permission from "../database/models/permission";

// Assign permission to a role
export const assignPermissionToRole = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { roleId, permissionId } = req.params;

    const role = await Role.findByPk(roleId);
    const permission = await Permission.findByPk(permissionId);

    if (!role || !permission) {
      return res.status(404).json({ message: "Role or Permission not found!" });
    }

    const rolePermission = await RolePermission.create({
      roleId,
      permissionId,
    });
    res.status(201).json(rolePermission);
  } catch (error) {
    next(error);
  }
};

// Get all permissions for a role
export const getRolePermissions = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { roleId } = req.params;

    const role = await Role.findByPk(roleId, {
      include: [{ model: Permission, as: "permissions" }],
    });

    if (!role) {
      return res.status(404).json({ message: "Role not found!" });
    }

    res.status(200).json(role);
  } catch (error) {
    next(error);
  }
};

// Remove permission from a role
export const removePermissionFromRole = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { roleId, permissionId } = req.params;

    const rolePermission = await RolePermission.findOne({
      where: { roleId, permissionId },
    });

    if (!rolePermission) {
      return res
        .status(404)
        .json({ message: "Permission not assigned to this role!" });
    }

    await rolePermission.destroy();
    res.status(204).json();
  } catch (error) {
    next(error);
  }
};
