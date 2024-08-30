import { Request, Response, NextFunction } from "express";
import ExerciseQuestion from "../database/models/exerciseQuestion";

// Create an exercise question
export const createExerciseQuestion = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { exerciseId, question, correctAnswer, points, status } = req.body;

    if (!exerciseId || !question || !correctAnswer || !points) {
      return res.status(400).json({ message: "Missing parameter(s)!" });
    }

    const exerciseQuestion = await ExerciseQuestion.create({
      exerciseId,
      question,
      correctAnswer,
      points,
      status,
    });

    res.status(201).json(exerciseQuestion);
  } catch (error) {
    next(error);
  }
};

// Get all exercise questions
export const getExerciseQuestions = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const exerciseQuestions = await ExerciseQuestion.findAll();
    if (exerciseQuestions) {
      return res.status(200).json(exerciseQuestions);
    } else {
      return res.status(404).json({ message: "Exercise questions not found" });
    }
  } catch (error) {
    next(error);
  }
};

// Get an exercise question by its ID
export const getExerciseQuestionById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ message: "Missing ID parameter!" });
    }

    const exerciseQuestion = await ExerciseQuestion.findByPk(id);

    if (exerciseQuestion) {
      return res.status(200).json(exerciseQuestion);
    } else {
      return res.status(404).json({ message: "Exercise question not found" });
    }
  } catch (error) {
    next(error);
  }
};

// Update an exercise question
export const updateExerciseQuestion = async (
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

    const exerciseQuestion = await ExerciseQuestion.findByPk(id);

    if (exerciseQuestion) {
      await exerciseQuestion.update(data);
      return res.status(200).json(exerciseQuestion);
    } else {
      return res.status(404).json({ message: "Exercise question not found" });
    }
  } catch (error) {
    next(error);
  }
};

// Delete an exercise question
export const deleteExerciseQuestion = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ message: "Missing ID parameter!" });
    }

    const exerciseQuestion = await ExerciseQuestion.findByPk(id);

    if (exerciseQuestion) {
      await exerciseQuestion.destroy();
      return res.status(204).json();
    } else {
      return res.status(404).json({ message: "Exercise question not found" });
    }
  } catch (error) {
    next(error);
  }
};
