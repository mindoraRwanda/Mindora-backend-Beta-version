import { Request, Response, NextFunction } from "express";
import Exercise from "../database/models/exercise";
import ExerciseQuestion from "../database/models/exerciseQuestion";

// Create an exercise
export const createExercise = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { title, description, difficultyLevel, category } = req.body;
    const picture = req.file;

    if (!title || !description || !difficultyLevel || !category) {
      return res.status(400).json({ message: "Missing parameter(s)!" });
    }

    const exercise = await Exercise.create({
      title,
      description,
      difficultyLevel,
      category,
      picture: picture?.path,
    });

    res.status(201).json(exercise);
  } catch (error) {
    next(error);
  }
};

// Get all exercises
export const getExercises = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const exercises = await Exercise.findAll({
      include: { model: ExerciseQuestion, as: "questions" },
    });
    if (exercises) {
      return res.status(200).json(exercises);
    } else {
      return res.status(404).json({ message: "Exercises not found" });
    }
  } catch (error) {
    next(error);
  }
};

// Get an exercise by its ID
export const getExerciseById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ message: "Missing ID parameter!" });
    }

    const exercise = await Exercise.findByPk(id, {
      include: { model: ExerciseQuestion, as: "questions" },
    });

    if (exercise) {
      return res.status(200).json(exercise);
    } else {
      return res.status(404).json({ message: "Exercise not found" });
    }
  } catch (error) {
    next(error);
  }
};

// Update an exercise
export const updateExercise = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const picture = req.file;
    const data = req.body;

    if (!id || !data) {
      return res.status(400).json({ message: "Missing parameter(s)!" });
    }

    const exercise = await Exercise.findByPk(id);

    if (exercise) {
      await exercise.update({
        ...data,
        picture: picture ? picture.path : exercise.picture,
      });
      return res.status(200).json(exercise);
    } else {
      return res.status(404).json({ message: "Exercise not found" });
    }
  } catch (error) {
    next(error);
  }
};

// Delete an exercise
export const deleteExercise = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ message: "Missing ID parameter!" });
    }

    const exercise = await Exercise.findByPk(id);

    if (exercise) {
      await exercise.destroy();
      return res.status(204).json();
    } else {
      return res.status(404).json({ message: "Exercise not found" });
    }
  } catch (error) {
    next(error);
  }
};
