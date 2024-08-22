import { error } from "console";
import User, { UserAttributes } from "../database/models/user";
import e, { Request, Response } from "express";

// Create a new user
export const createUser = async (req: Request, res: Response) => {
  try {
    const data: UserAttributes = req.body;
    if (!data) {
      res.status(400).json({ error: "Missing parameter(s)!" });
    }
    const user = await User.create(data);
    res.status(201).json(user);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to create user!" });
  }
};

// Get all users
export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await User.findAll();
    if (!users) {
      res.status(404).json({ error: "users not found!" });
    }
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: "Error while getting the users!" });
  }
};

// Get user by ID
export const getUserById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    if (!id) {
      res.status(400).json({ error: "Missing parameter(s)!" });
    }
    const user = await User.findByPk(req.params.id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: "Error while getting a user!" });
  }
};

// Update a user
export const updateUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    if (!id) {
      res.status(400).json({ error: "Missing parameter(s)!" });
    }
    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    await user.update(req.body);
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ error: "Error while updating a user!" });
  }
};

// Delete a user
export const deleteUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    if (!id) {
      res.status(400).json({ error: "Missing parameter(s)!" });
    }
    const user = await User.findByPk(req.params.id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    await user.destroy();
    res.status(204).json();
  } catch (error) {
    res.status(500).json({ error: "Error while deleting user!" });
  }
};
