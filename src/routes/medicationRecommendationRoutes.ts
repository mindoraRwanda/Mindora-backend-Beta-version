import { Router } from "express";
import {
  createMedicationRecommendation,
  getMedicationRecommendations,
  getMedicationRecommendationById,
  updateMedicationRecommendation,
  deleteMedicationRecommendation,
} from "../controllers/medicationRecommendationController";

const router = Router();

router.post("/medication-recommendations", createMedicationRecommendation);
router.get("/medication-recommendations", getMedicationRecommendations);
router.get("/medication-recommendations/:id", getMedicationRecommendationById);
router.put("/medication-recommendations/:id", updateMedicationRecommendation);
router.delete(
  "/medication-recommendations/:id",
  deleteMedicationRecommendation
);

export default router;
