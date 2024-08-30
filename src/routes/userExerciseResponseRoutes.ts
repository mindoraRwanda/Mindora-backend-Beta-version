import express from "express";
import {
  createUserExerciseResponse,
  getUserExerciseResponses,
  getUserExerciseResponseById,
  updateUserExerciseResponse,
  deleteUserExerciseResponse,
} from "../controllers/userExerciseResponseController";

const router = express.Router();

// Create a user exercise response
router.post("/user-exercise-responses", createUserExerciseResponse);

// Get all user exercise responses
router.get("/user-exercise-responses", getUserExerciseResponses);

// Get a user exercise response by its ID
router.get("/user-exercise-responses/:id", getUserExerciseResponseById);

// Update a user exercise response
router.put("/user-exercise-responses/:id", updateUserExerciseResponse);

// Delete a user exercise response
router.delete("/user-exercise-responses/:id", deleteUserExerciseResponse);

export default router;
