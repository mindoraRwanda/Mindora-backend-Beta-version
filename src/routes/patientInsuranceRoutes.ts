import { Router } from "express";
import {
  createPatientInsurance,
  getPatientInsurances,
  getPatientInsuranceById,
  updatePatientInsurance,
  deletePatientInsurance,
} from "../controllers/patientInsuranceController";

const router = Router();

router.post("/patient-insurances", createPatientInsurance);
router.get("/patient-insurances", getPatientInsurances);
router.get("/patient-insurances/:id", getPatientInsuranceById);
router.put("/patient-insurances/:id", updatePatientInsurance);
router.delete("/patient-insurances/:id", deletePatientInsurance);

export default router;
