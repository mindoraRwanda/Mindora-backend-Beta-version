import { Router } from "express";
import {
  createTreatmentPlanAdjustment,
  getTreatmentPlanAdjustmentById,
  getTreatmentPlanAdjustments,
  updateTreatmentPlanAdjustment,
  deleteTreatmentPlanAdjustment,
} from "../controllers/treatmentPlanAdjustmentController";

const router = Router();

router.post("/treatment_adjustments", createTreatmentPlanAdjustment);
router.get("/treatment_adjustments", getTreatmentPlanAdjustments);
router.get("/treatment_adjustments/:id", getTreatmentPlanAdjustmentById);
router.put("/treatment_adjustments/:id", updateTreatmentPlanAdjustment);
router.delete("/treatment_adjustments/:id", deleteTreatmentPlanAdjustment);

export default router;
