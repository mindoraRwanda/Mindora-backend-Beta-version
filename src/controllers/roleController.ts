import { Request, Response, NextFunction } from "express";
import Role from "../database/models/role";

// Create a new role
export const createRole = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({ message: "Role name is required!" });
    }

    const role = await Role.create({ name });
    res.status(201).json(role);
  } catch (error) {
    next(error);
  }
};

// Get all roles
export const getRoles = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const roles = await Role.findAll();
    res.status(200).json(roles);
  } catch (error) {
    next(error);
  }
};

// Get a single role by ID
export const getRoleById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;

    const role = await Role.findByPk(id);
    if (!role) {
      return res.status(404).json({ message: "Role not found!" });
    }

    res.status(200).json(role);
  } catch (error) {
    next(error);
  }
};

// Update a role
export const updateRole = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const data = req.body;

    const role = await Role.findByPk(id);
    if (!role) {
      return res.status(404).json({ message: "Role not found!" });
    }

    await role.update(data);
    res.status(200).json(role);
  } catch (error) {
    next(error);
  }
};

// Delete a role
export const deleteRole = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;

    const role = await Role.findByPk(id);
    if (!role) {
      return res.status(404).json({ message: "Role not found!" });
    }

    await role.destroy();
    res.status(204).json();
  } catch (error) {
    next(error);
  }
};
