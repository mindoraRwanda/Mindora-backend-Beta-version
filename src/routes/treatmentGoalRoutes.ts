import express from "express";
import {
  createTreatmentGoal,
  getTreatmentGoalById,
  getTreatmentGoals,
  updateTreatmentGoal,
  deleteTreatmentGoal,
} from "../controllers/treatmentGoalController";
import { authorize } from "../middleware/rbac.middleware";

const router = express.Router();

router.post(
  "/treatment-goals",
  authorize("create_treatment_goal"),
  createTreatmentGoal
);
router.get(
  "/treatment-goals/:id",
  authorize("get_treatment_goal"),
  getTreatmentGoalById
);
router.get(
  "/treatment-goals",
  authorize("get_treatment_goals"),
  getTreatmentGoals
);
router.put(
  "/treatment-goals/:id",
  authorize("update_treatment_goal"),
  updateTreatmentGoal
);
router.delete(
  "/treatment-goals/:id",
  authorize("delete_treatment_goal"),
  deleteTreatmentGoal
);

export default router;
