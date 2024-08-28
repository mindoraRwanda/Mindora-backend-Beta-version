import { Router } from "express";
import {
  createTreatmentPlan,
  getTreatmentPlans,
  getTreatmentPlanById,
  updateTreatmentPlan,
  deleteTreatmentPlan,
} from "../controllers/treatmentPlanController";

const router = Router();

router.post("/treatment_plans", createTreatmentPlan);
router.get("/treatment_plans", getTreatmentPlans);
router.get("/treatment_plans/:id", getTreatmentPlanById);
router.put("/treatment_plans/:id", updateTreatmentPlan);
router.delete("/treatment_plans/:id", deleteTreatmentPlan);

export default router;
