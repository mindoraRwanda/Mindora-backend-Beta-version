import { error } from "console";
import User, { UserAttributes } from "../database/models/user";
import { Request, Response, NextFunction } from "express";
import Patient from "../database/models/patient";

// Create a new user
export const createUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const data: UserAttributes = req.body;
    if (!data) {
      res.status(400).json({ message: "Missing parameter(s)!" });
    }
    const user = await User.create(data);
    res.status(201).json(user);
  } catch (error) {
    next(error);
  }
};

// Get all users
export const getAllUsers = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const users = await User.findAll({
      include: { model: Patient, as: "patient" },
    });
    if (!users) {
      res.status(404).json({ message: "users not found!" });
    }
    res.status(200).json(users);
  } catch (error) {
    // pass error to errorHandler middleware
    next(error);
  }
};

// Get user by ID
export const getUserById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    if (!id) {
      res.status(400).json({ message: "Missing parameter(s)!" });
    }
    const user = await User.findByPk(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    // pass error to errorHandler middleware
    next(error);
  }
};

// Update a user
export const updateUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    if (!id) {
      res.status(400).json({ message: "Missing parameter(s)!" });
    }
    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    await user.update(req.body);
    res.status(200).json(user);
  } catch (error) {
    // pass error to errorHandler middleware
    next(error);
  }
};

// Delete a user
export const deleteUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    if (!id) {
      res.status(400).json({ message: "Missing parameter(s)!" });
    }
    const user = await User.findByPk(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    await user.destroy();
    res.status(204).json();
  } catch (error) {
    // pass error to errorHandler middleware
    next(error);
  }
};
