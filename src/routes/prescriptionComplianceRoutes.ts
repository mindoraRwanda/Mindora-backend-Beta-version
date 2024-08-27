import { Router } from "express";
import {
  createPrescriptionCompliance,
  getPrescriptionCompliances,
  getPrescriptionComplianceById,
  updatePrescriptionCompliance,
  deletePrescriptionCompliance,
} from "../controllers/prescriptionComplianceController";

const router = Router();

router.post("/prescription-compliance", createPrescriptionCompliance);
router.get("/prescription-compliance", getPrescriptionCompliances);
router.get("/prescription-compliance/:id", getPrescriptionComplianceById);
router.put("/prescription-compliance/:id", updatePrescriptionCompliance);
router.delete("/prescription-compliance/:id", deletePrescriptionCompliance);

export default router;
