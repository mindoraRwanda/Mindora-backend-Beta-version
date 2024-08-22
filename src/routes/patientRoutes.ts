import { Router } from "express";
import {
  createPatient,
  getPatientById,
  updatePatient,
  deletePatient,
  getAllPatients,
} from "../controllers/patientController";

const router = Router();

router.post("/patients", createPatient);
router.get("/patients/:id", getPatientById);
router.put("/patients/:id", updatePatient);
router.post("/patients/:id", deletePatient);
router.get("/patients", getAllPatients);

export default router;
