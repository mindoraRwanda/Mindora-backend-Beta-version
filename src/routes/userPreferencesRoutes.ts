import { Router } from "express";
import {
  createUserPreferences,
  getUserPreferences,
  getUserPreferencesById,
  updateUserPreferences,
  deleteUserPreferences,
} from "../controllers/userPreferencesController";

const router = Router();

router.post("/user-preferences", createUserPreferences);
router.get("/user-preferences", getUserPreferences);
router.get("/user-preferences/:userId", getUserPreferencesById);
router.put("/user-preferences/:userId", updateUserPreferences);
router.delete("/user-preferences/:id", deleteUserPreferences);

export default router;
