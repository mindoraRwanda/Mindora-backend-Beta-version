import express from "express";
import {
  createTreatmentMilestone,
  getTreatmentMilestoneById,
  getTreatmentMilestones,
  updateTreatmentMilestone,
  deleteTreatmentMilestone,
} from "../controllers/treatmentMilestoneController";
import { authorize } from "../middleware/rbac.middleware";

const router = express.Router();

router.post(
  "/treatment_milestones",
  authorize("create_treatment_milestone"),
  createTreatmentMilestone
);
router.get(
  "/treatment_milestones/:id",
  authorize("get_treatment_milestone"),
  getTreatmentMilestoneById
);
router.get(
  "/treatment_milestones",
  authorize("get_treatment_milestones"),
  getTreatmentMilestones
);
router.put(
  "/treatment_milestones/:id",
  authorize("update_treatment_milestone"),
  updateTreatmentMilestone
);
router.delete(
  "/treatment_milestones/:id",
  authorize("delete_treatment_milestone"),
  deleteTreatmentMilestone
);

export default router;
