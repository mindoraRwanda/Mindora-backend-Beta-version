import { Request, Response, NextFunction } from "express";
import Permission from "../database/models/permission";

// Create a new permission
export const createPermission = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name, description } = req.body;

    if (!name) {
      return res.status(400).json({ message: "Permission name is required!" });
    }

    const permission = await Permission.create({ name, description });
    res.status(201).json(permission);
  } catch (error) {
    next(error);
  }
};

// Get all permissions
export const getPermissions = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const permissions = await Permission.findAll();
    res.status(200).json(permissions);
  } catch (error) {
    next(error);
  }
};

// Get a single permission by ID
export const getPermissionById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;

    const permission = await Permission.findByPk(id);
    if (!permission) {
      return res.status(404).json({ message: "Permission not found!" });
    }

    res.status(200).json(permission);
  } catch (error) {
    next(error);
  }
};

// Update a permission
export const updatePermission = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const data = req.body;

    const permission = await Permission.findByPk(id);
    if (!permission) {
      return res.status(404).json({ message: "Permission not found!" });
    }

    await permission.update(data);
    res.status(200).json(permission);
  } catch (error) {
    next(error);
  }
};

// Delete a permission
export const deletePermission = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;

    const permission = await Permission.findByPk(id);
    if (!permission) {
      return res.status(404).json({ message: "Permission not found!" });
    }

    await permission.destroy();
    res.status(204).json();
  } catch (error) {
    next(error);
  }
};
