import express from "express";
import {
  createExercise,
  getExercises,
  getExerciseById,
  updateExercise,
  deleteExercise,
} from "../controllers/exerciseController";

const router = express.Router();

// Create a new exercise
router.post("/exercises", createExercise);

// Get all exercises
router.get("/exercises", getExercises);

// Get an exercise by ID
router.get("/exercises/:id", getExerciseById);

// Update an exercise by ID
router.put("/exercises/:id", updateExercise);

// Delete an exercise by ID
router.delete("/exercises/:id", deleteExercise);

export default router;
