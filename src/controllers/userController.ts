import { error } from "console";
import User, { UserAttributes } from "../database/models/user";
import { Request, Response, NextFunction } from "express";
import Patient from "../database/models/patient";
import Therapist from "../database/models/therapist";
import { validationResult } from "express-validator";

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
      include: [
        { model: Patient, as: "patient" },
        { model: Therapist, as: "therapist" },
      ],
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
    const user = await User.findByPk(id, {
      include: [
        { model: Patient, as: "patient" },
        { model: Therapist, as: "therapist" },
      ],
    });
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
    const data = req.body;
    if (!id || !data) {
      res.status(400).json({ message: "Missing parameter(s)!" });
    }
    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    await user.update(data);
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
    const user = await User.findByPk(id);
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

export const updateProfile = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const file = req.file;
    const { userId } = req.params;
    if (!file) {
      return res.status(400).json({ message: "No picture uploaded." });
    }
    if (!userId) {
      return res.status(400).json({ message: "User ID is missing" });
    }
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    await user.update({ profileImage: file.path });
    return res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

export const changePassword = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { userId } = req.params;
    const { oldPassword, newPassword } = req.body;
    if (!userId || !oldPassword || !newPassword) {
      return res
        .status(400)
        .json({ message: "Missing required parameter(s)!" });
    }

    const user = await User.findByPk(userId);
    if (!user) {
      return res
        .status(404)
        .json({ message: `User with ID: ${userId} not found` });
    }
    if (!(await user.validatePassword(oldPassword))) {
      return res.status(403).json({ message: "Invalid old password!" });
    }
    if (await user.validatePassword(newPassword)) {
      return res.status(403).json({
        message: "The new password must be different from old password!",
      });
    }
    await user.update({ password: newPassword });
    return res.status(200).json({ message: "Password changed successfully" });
  } catch (err) {
    next(err);
  }
};
