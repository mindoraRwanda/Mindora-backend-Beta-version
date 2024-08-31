import { Router } from "express";
import {
  createReward,
  getRewards,
  getRewardById,
  updateReward,
  deleteReward,
} from "../controllers/rewardController";

const router = Router();

// Create a new reward
router.post("/rewards", createReward);

// Get all rewards
router.get("/rewards", getRewards);

// Get a reward by ID
router.get("/rewards/:id", getRewardById);

// Update a reward by ID
router.put("/rewards/:id", updateReward);

// Delete a reward by ID
router.delete("/rewards/:id", deleteReward);

export default router;
