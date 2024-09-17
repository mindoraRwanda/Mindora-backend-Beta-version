import express from "express";
import {
  createExercise,
  getExercises,
  getExerciseById,
  updateExercise,
  deleteExercise,
} from "../controllers/exerciseController";
import { uploadGeneral } from "../config/multerConfig";

const router = express.Router();

// Create a new exercise
router.post("/exercises", uploadGeneral.single("picture"), createExercise);

// Get all exercises
router.get("/exercises", getExercises);

// Get an exercise by ID
router.get("/exercises/:id", getExerciseById);

// Update an exercise by ID
router.put("/exercises/:id", uploadGeneral.single("picture"), updateExercise);

// Delete an exercise by ID
router.delete("/exercises/:id", deleteExercise);

export default router;
