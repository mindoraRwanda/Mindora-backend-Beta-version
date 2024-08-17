import { Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";
import {
  createExercise,
  updateTargetExercise,
  getAllExercises,
  removeExercise,
} from "../models/Exercise";

export const addExercise = async (req: Request, res: Response) => {
  const { title, description, difficultyLevel, category } = req.body;
  if (!title || !description || !difficultyLevel || !category) {
    return res.status(400).json({ Error: "Missing parameter(s)!" });
  }
  try {
    const unniqueId = uuidv4();
    const InsertedExercise = await createExercise({
      ...{ title, description, difficultyLevel, category },
      id: unniqueId,
    });
    if (!InsertedExercise) {
      return res.status(500).json({ Error: "Error while adding an exercise!" });
    }
    return res.status(201).json(InsertedExercise);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ Error: "Error while adding an exercise!" });
  }
};

export const updateExercise = async (req: Request, res: Response) => {
  const { id, title, description, difficultyLevel, category } = req.body;
  if (!id || !title || !description || !difficultyLevel || !category) {
    return res.status(400).json({ Error: "Missing parameter(s)!" });
  }
  try {
    const updatedExercise = await updateTargetExercise({
      id,
      title,
      description,
      difficultyLevel,
      category,
    });
    if (!updatedExercise) {
      return res.status(500).json({ Error: "Exercise to update not found!" });
    }
    return res.status(200).json(updatedExercise);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ Error: "Error while updating an exercise!" });
  }
};

export const getExercises = async (req: Request, res: Response) => {
  try {
    const exercises = await getAllExercises();
    if (!exercises || exercises.length === 0) {
      return res.status(404).json({ Error: "No exercises found!" });
    }
    return res.status(200).json(exercises);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ Error: "Error while retrieving exercises!" });
  }
};

export const deleteExercise = async (req: Request, res: Response) => {
  const { id } = req.body;
  if (!id) {
    return res.status(400).json({ Error: "Missing parameter(s)!" });
  }
  try {
    const removedExercise = await removeExercise(id);
    if (!removedExercise) {
      return res.status(404).json({ Error: "No exercises found!" });
    }
    return res.status(200).json(removedExercise);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ Error: "Error while deleting an exercise!" });
  }
};
