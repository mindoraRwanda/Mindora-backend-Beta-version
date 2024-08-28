import express from "express";
import {
  createTreatmentGoal,
  getTreatmentGoalById,
  getTreatmentGoals,
  updateTreatmentGoal,
  deleteTreatmentGoal,
} from "../controllers/treatmentGoalController";

const router = express.Router();

router.post("/treatment-goals", createTreatmentGoal);
router.get("/treatment-goals/:id", getTreatmentGoalById);
router.get("/treatment-goals", getTreatmentGoals);
router.put("/treatment-goals/:id", updateTreatmentGoal);
router.delete("/treatment-goals/:id", deleteTreatmentGoal);

export default router;
