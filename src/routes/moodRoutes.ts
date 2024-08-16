import { Router } from "express";
import { addMood, getMood } from "../controllers/moodLoggingController";

const router = Router();

router.post("/add_mood", addMood);
router.get("/get_moods/:userId", getMood);

export default router;
