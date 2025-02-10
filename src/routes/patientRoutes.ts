import { Router } from "express";
import {
  createPatient,
  getPatientById,
  updatePatient,
  deletePatient,
  getAllPatients,
} from "../controllers/patientController";
import { authorize } from "../middleware/rbac.middleware";

const router = Router();

router.post("/patients", authorize("create_patient"), createPatient);
router.get("/patients/:id", authorize("get_patient"), getPatientById);
router.put("/patients/:id", authorize("update_patient"), updatePatient);
router.delete("/patients/:id", authorize("delete_patient"), deletePatient);
router.get("/patients", authorize("get_patients"), getAllPatients);

export default router;
