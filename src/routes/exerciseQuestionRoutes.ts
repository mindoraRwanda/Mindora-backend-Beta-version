import { Router } from "express";
import {
  createExerciseQuestion,
  getExerciseQuestions,
  getExerciseQuestionById,
  updateExerciseQuestion,
  deleteExerciseQuestion,
} from "../controllers/exerciseQuestionsController";

const router = Router();

// Route to create an exercise question
router.post("/exercise-questions", createExerciseQuestion);

// Route to get all exercise questions
router.get("/exercise-questions", getExerciseQuestions);

// Route to get an exercise question by its ID
router.get("/exercise-questions/:id", getExerciseQuestionById);

// Route to update an exercise question by its ID
router.put("/exercise-questions/:id", updateExerciseQuestion);

// Route to delete an exercise question by its ID
router.delete("/exercise-questions/:id", deleteExerciseQuestion);

export default router;
