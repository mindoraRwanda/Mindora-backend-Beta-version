import { Router } from "express";
import {
  addMood,
  getMood,
  updateMood,
  deleteMood,
} from "../controllers/moodLoggingController";

const router = Router();

router.post("/add_mood", addMood);
router.get("/get_moods/:userId", getMood);
router.post("/update_mood", updateMood);
router.post("/delete_mood/:id", deleteMood);

export default router;
