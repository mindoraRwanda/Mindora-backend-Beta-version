import { Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";
import {
  createExerciseQuestion,
  updateTargetExerciseQuestion,
  removeExerciseQuestion,
  retrieveExerciseQuestion,
} from "../models/ExerciseQuestions";

export const addExerciseQuestion = async (req: Request, res: Response) => {
  const { exerciseId, question, correctAnswer } = req.body;
  if (!exerciseId || !question || !correctAnswer) {
    return res.status(400).json({ Error: "Missing parameter(s)!" });
  }
  try {
    const uniqueId = uuidv4();
    const InsertedQuestion = await createExerciseQuestion({
      exerciseId,
      question,
      correctAnswer,
      id: uniqueId,
    });
    if (!InsertedQuestion) {
      return res
        .status(500)
        .json({ Error: "Error while adding an exercise question!" });
    }
    return res.status(201).json(InsertedQuestion);
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ Error: "Error while adding an exercise question!" });
  }
};

export const updateExerciseQuestion = async (req: Request, res: Response) => {
  const { id, exerciseId, question, correctAnswer } = req.body;
  if (!id || !exerciseId || !question || !correctAnswer) {
    return res.status(400).json({ Error: "Missing parameter(s)!" });
  }
  try {
    const updatedQuestion = await updateTargetExerciseQuestion({
      id,
      exerciseId,
      question,
      correctAnswer,
    });
    if (!updatedQuestion) {
      return res
        .status(404)
        .json({ Error: "Exercise question not found or updated!" });
    }
    return res.status(200).json(updatedQuestion);
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ Error: "Error while updating an exercise question!" });
  }
};

export const getExerciseQuestion = async (req: Request, res: Response) => {
  const { id } = req.params;
  if (!id) {
    return res.status(400).json({ Error: "Missing parameter(s)!" });
  }
  try {
    const question = await retrieveExerciseQuestion(id);
    if (!question) {
      return res.status(404).json({ Error: "Exercise question not found!" });
    }
    return res.status(200).json(question);
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ Error: "Error while retrieving an exercise question!" });
  }
};

export const deleteExerciseQuestion = async (req: Request, res: Response) => {
  const { id } = req.params;
  if (!id) {
    return res.status(400).json({ Error: "Missing parameter(s)!" });
  }
  try {
    const deletedQuestion = await removeExerciseQuestion(id);
    if (!deletedQuestion) {
      return res.status(404).json({ Error: "Exercise question not found!" });
    }
    return res.status(200).json(deletedQuestion);
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ Error: "Error while deleting an exercise question!" });
  }
};
