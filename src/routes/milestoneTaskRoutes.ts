import express from "express";
import {
  createMilestoneTask,
  getMilestoneTaskById,
  getMilestoneTasks,
  updateMilestoneTask,
  deleteMilestoneTask,
} from "../controllers/milestoneTaskController";

const router = express.Router();

// Create a new milestone task
router.post("/milestone-tasks", createMilestoneTask);

// Get a single milestone task by ID
router.get("/milestone-tasks/:id", getMilestoneTaskById);

// Get all milestone tasks
router.get("/milestone-tasks", getMilestoneTasks);

// Update a milestone task
router.put("/milestone-tasks/:id", updateMilestoneTask);

// Delete a milestone task
router.delete("/milestone-tasks/:id", deleteMilestoneTask);

export default router;
