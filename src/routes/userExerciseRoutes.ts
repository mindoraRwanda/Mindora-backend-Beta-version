import { Router } from "express";
import {
  createUserExercise,
  getUserExercises,
  getUserExerciseById,
  updateUserExercise,
  deleteUserExercise,
} from "../controllers/userExerciseController";

const router = Router();

// Route to create a new user exercise
router.post("/user-exercises", createUserExercise);

// Route to get all user exercises
router.get("/user-exercises", getUserExercises);

// Route to get a user exercise by ID
router.get("/user-exercises/:id", getUserExerciseById);

// Route to update a user exercise by ID
router.put("/user-exercises/:id", updateUserExercise);

// Route to delete a user exercise by ID
router.delete("/user-exercises/:id", deleteUserExercise);

export default router;
