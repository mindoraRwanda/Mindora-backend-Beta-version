import { Router } from "express";
import {
  createMedicationPrescription,
  getMedicationPrescriptions,
  getMedicationPrescriptionById,
  updateMedicationPrescription,
  deleteMedicationPrescription,
} from "../controllers/medicationPrescriptionController";

const router = Router();

router.post("/medication-prescriptions", createMedicationPrescription);
router.get("/medication-prescriptions", getMedicationPrescriptions);
router.get("/medication-prescriptions/:id", getMedicationPrescriptionById);
router.put("/medication-prescriptions/:id", updateMedicationPrescription);
router.delete("/medication-prescriptions/:id", deleteMedicationPrescription);

export default router;
