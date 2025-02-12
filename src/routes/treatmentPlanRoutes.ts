import { Router } from "express";
import {
  createTreatmentPlan,
  getTreatmentPlans,
  getTreatmentPlanById,
  updateTreatmentPlan,
  deleteTreatmentPlan,
  getTherapistTreatmentPlan,
} from "../controllers/treatmentPlanController";
import { authorize } from "../middleware/rbac.middleware";

const router = Router();

router.post(
  "/treatment_plans",
  authorize("create_treatment_plan"),
  createTreatmentPlan
);
router.get(
  "/treatment_plans",
  authorize("get_treatment_plans"),
  getTreatmentPlans
);
router.get(
  "/treatment_plans/therapists/:therapistId",
  authorize("get_therapist_treatment_plan"),
  getTherapistTreatmentPlan
);
router.get(
  "/treatment_plans/:id",
  authorize("get_treatment_plan"),
  getTreatmentPlanById
);
router.put(
  "/treatment_plans/:id",
  authorize("update_treatment_plan"),
  updateTreatmentPlan
);
router.delete(
  "/treatment_plans/:id",
  authorize("delete_treatment_plan"),
  deleteTreatmentPlan
);

export default router;
