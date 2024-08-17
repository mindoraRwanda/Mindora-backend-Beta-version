import { Router } from "express";
import {
  addExercise,
  updateExercise,
  getExercises,
  deleteExercise,
} from "../controllers/exerciseController";
import {
  addExerciseQuestion,
  updateExerciseQuestion,
  deleteExerciseQuestion,
  getExerciseQuestion,
} from "../controllers/exerciseQuestionsController";

import {
  addReward,
  updateReward,
  getReward,
  deleteReward,
} from "../controllers/rewardController";

import {
  addUserReward,
  updateUserReward,
  getUserReward,
  deleteUserReward,
} from "../controllers/userRewardController";

import {
  addUserExercise,
  updateUserExercise,
  getUserExercise,
  deleteUserExercise,
} from "../controllers/userExerciseController";

import {
  addUserExerciseResponse,
  getUserExerciseResponse,
  updateUserExerciseResponse,
  deleteUserExerciseResponse,
} from "../controllers/userExerciseResponseController";

import { calculateUserExerciseProgress } from "../models/UserExerciseProgress";

const router = Router();
// exercise
router.post("/add_exercise", addExercise);
router.post("/update_exercise", updateExercise);
router.get("/get_exercises", getExercises);
router.post("/delete_exercise/:exerciseId", deleteExercise);

// user exercise
router.post("/add_user_exercise", addUserExercise);
router.post("/update_user_exercise", updateUserExercise);
router.post("/delete_user_exercise/:userExerciseId", deleteUserExercise);
router.get("/get_user_exercise/:userId/:exerciseId", getUserExercise);

// user responses
router.post("/add_user_exercise_response", addUserExerciseResponse);
router.post("/update_user_exercise_response", updateUserExerciseResponse);
router.post("/delete_user_exercise_response/:id", deleteUserExerciseResponse);
router.get("/get_user_exercise_response/:id", getUserExerciseResponse);

// exercise questions
router.post("/add_exercise_question", addExerciseQuestion);
router.post("/update_exercise_question", updateExerciseQuestion);
router.post("/delete_exercise_question/:id", addExerciseQuestion);
router.get("/get_exercise_question/:id", getExerciseQuestion);

// reward
router.post("/add_reward", addReward);
router.post("/update_reward", updateReward);
router.post("/delete_reward/:id", deleteReward);
router.post("/get_reward/:id", getReward);

// user rewards
router.post("/add_user_reward", addUserReward);
router.post("/update_user_reward", updateUserReward);
router.post("/delete_user_reward/:id", deleteUserReward);
router.get("/get_user_reward/:id", getUserReward);

// progress
router.get(
  "/get_exercise_progress/:userExerciseId",
  calculateUserExerciseProgress
);
export default router;
