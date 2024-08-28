import express from "express";
import {
  createTreatmentMilestone,
  getTreatmentMilestoneById,
  getTreatmentMilestones,
  updateTreatmentMilestone,
  deleteTreatmentMilestone,
} from "../controllers/treatmentMilestoneController";

const router = express.Router();

router.post("/treatment-milestones", createTreatmentMilestone);
router.get("/treatment-milestones/:id", getTreatmentMilestoneById);
router.get("/treatment-milestones", getTreatmentMilestones);
router.put("/treatment-milestones/:id", updateTreatmentMilestone);
router.delete("/treatment-milestones/:id", deleteTreatmentMilestone);

export default router;
