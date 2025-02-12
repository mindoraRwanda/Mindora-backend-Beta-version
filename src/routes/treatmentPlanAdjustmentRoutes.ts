import { Router } from "express";
import {
  createTreatmentPlanAdjustment,
  getTreatmentPlanAdjustmentById,
  getTreatmentPlanAdjustments,
  updateTreatmentPlanAdjustment,
  deleteTreatmentPlanAdjustment,
} from "../controllers/treatmentPlanAdjustmentController";
import { authorize } from "../middleware/rbac.middleware";

const router = Router();

router.post(
  "/treatment-plan-adjustments",
  authorize("create_treatment_plan_adjustment"),
  createTreatmentPlanAdjustment
);
router.get(
  "/treatment-plan-adjustments",
  authorize("get_treatment_plan_adjustments"),
  getTreatmentPlanAdjustments
);
router.get(
  "/treatment-plan-adjustments/:id",
  authorize("get_treatment_plan_adjustment"),
  getTreatmentPlanAdjustmentById
);
router.put(
  "/treatment-plan-adjustments/:id",
  authorize("update_treatment_plan_adjustment"),
  updateTreatmentPlanAdjustment
);
router.delete(
  "/treatment-plan-adjustments/:id",
  authorize("delete_treatment_plan_adjustment"),
  deleteTreatmentPlanAdjustment
);

export default router;
