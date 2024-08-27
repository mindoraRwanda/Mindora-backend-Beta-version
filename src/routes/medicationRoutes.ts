import { Router } from "express";
import {
  createMedication,
  getMedications,
  getMedicationById,
  updateMedication,
  deleteMedication,
} from "../controllers/medicationController";

const router = Router();

router.post("/medications", createMedication);
router.get("/medications", getMedications);
router.get("/medications/:id", getMedicationById);
router.put("/medications/:id", updateMedication);
router.delete("/medications/:id", deleteMedication);

export default router;
