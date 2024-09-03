import { Router } from "express";
import {
  createMoodLog,
  getMoodLogs,
  getMoodLogById,
  updateMoodLog,
  deleteMoodLog,
} from "../controllers/moodLogsController";

const router = Router();

router.post("/mood-logs", createMoodLog);
router.get("/mood-logs/user/:userId", getMoodLogs);
router.get("/mood-logs/:id", getMoodLogById);
router.put("/mood-logs/:id", updateMoodLog);
router.delete("/mood-logs/:id", deleteMoodLog);

export default router;
