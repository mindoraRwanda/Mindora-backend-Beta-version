import { Request, Response, NextFunction } from "express";
import UserExercise from "../database/models/userExercises";

// Create a user exercise
export const createUserExercise = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { userId, exerciseId, score, progress, status, completedAt } =
      req.body;

    if (
      !userId ||
      !exerciseId ||
      score === undefined ||
      progress === undefined ||
      !status
    ) {
      return res.status(400).json({ message: "Missing parameter(s)!" });
    }

    const userExercise = await UserExercise.create({
      userId,
      exerciseId,
      score,
      progress,
      status,
      completedAt,
    });

    res.status(201).json(userExercise);
  } catch (error) {
    next(error);
  }
};

// Get all user exercises
export const getUserExercises = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userExercises = await UserExercise.findAll();
    if (userExercises) {
      return res.status(200).json(userExercises);
    } else {
      return res.status(404).json({ message: "User exercises not found" });
    }
  } catch (error) {
    next(error);
  }
};

// Get a user exercise by its ID
export const getUserExerciseById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ message: "Missing ID parameter!" });
    }

    const userExercise = await UserExercise.findByPk(id);

    if (userExercise) {
      return res.status(200).json(userExercise);
    } else {
      return res.status(404).json({ message: "User exercise not found" });
    }
  } catch (error) {
    next(error);
  }
};

// Update a user exercise
export const updateUserExercise = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const data = req.body;

    if (!id || !data) {
      return res.status(400).json({ message: "Missing parameter(s)!" });
    }

    const userExercise = await UserExercise.findByPk(id);

    if (userExercise) {
      await userExercise.update(data);
      return res.status(200).json(userExercise);
    } else {
      return res.status(404).json({ message: "User exercise not found" });
    }
  } catch (error) {
    next(error);
  }
};

// Delete a user exercise
export const deleteUserExercise = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ message: "Missing ID parameter!" });
    }

    const userExercise = await UserExercise.findByPk(id);

    if (userExercise) {
      await userExercise.destroy();
      return res.status(204).json();
    } else {
      return res.status(404).json({ message: "User exercise not found" });
    }
  } catch (error) {
    next(error);
  }
};
