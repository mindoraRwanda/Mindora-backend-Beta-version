import express from "express";
import {
  createMilestoneTask,
  getMilestoneTaskById,
  getMilestoneTasks,
  updateMilestoneTask,
  deleteMilestoneTask,
} from "../controllers/milestoneTaskController";
import { authorize } from "../middleware/rbac.middleware";

const router = express.Router();

// Create a new milestone task
router.post(
  "/milestone-tasks",
  authorize("create_milestone_task"),
  createMilestoneTask
);

// Get a single milestone task by ID
router.get(
  "/milestone-tasks/:id",
  authorize("get_milestone_task"),
  getMilestoneTaskById
);

// Get all milestone tasks
router.get(
  "/milestone-tasks",
  authorize("get_milestone_tasks"),
  getMilestoneTasks
);

// Update a milestone task
router.put(
  "/milestone-tasks/:id",
  authorize("update_milestone_task"),
  updateMilestoneTask
);

// Delete a milestone task
router.delete(
  "/milestone-tasks/:id",
  authorize("delete_milestone_task"),
  deleteMilestoneTask
);

export default router;
