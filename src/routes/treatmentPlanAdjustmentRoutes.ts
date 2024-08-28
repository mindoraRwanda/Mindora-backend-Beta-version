import { Router } from "express";
import {
  createTreatmentPlanAdjustment,
  getTreatmentPlanAdjustmentById,
  getTreatmentPlanAdjustments,
  updateTreatmentPlanAdjustment,
  deleteTreatmentPlanAdjustment,
} from "../controllers/treatmentPlanAdjustmentController";

const router = Router();

router.post("/treatment-plan-adjustments", createTreatmentPlanAdjustment);
router.get("/treatment-plan-adjustments", getTreatmentPlanAdjustments);
router.get("/treatment-plan-adjustments/:id", getTreatmentPlanAdjustmentById);
router.put("/treatment-plan-adjustments/:id", updateTreatmentPlanAdjustment);
router.delete("/treatment-plan-adjustments/:id", deleteTreatmentPlanAdjustment);

export default router;
