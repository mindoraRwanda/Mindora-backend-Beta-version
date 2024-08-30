import { Router } from "express";
import {
  createUserReward,
  getUserRewards,
  getUserRewardById,
  updateUserReward,
  deleteUserReward,
} from "../controllers/userRewardController";

const router = Router();

router.post("/user-rewards", createUserReward);
router.get("/user-rewards", getUserRewards);
router.get("/user-rewards/:id", getUserRewardById);
router.put("/user-rewards/:id", updateUserReward);
router.delete("/user-rewards/:id", deleteUserReward);

export default router;
