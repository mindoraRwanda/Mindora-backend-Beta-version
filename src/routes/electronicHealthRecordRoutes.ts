import { Router } from "express";
import {
  createElectronicHealthRecord,
  getElectronicHealthRecords,
  getElectronicHealthRecordById,
  updateElectronicHealthRecord,
  deleteElectronicHealthRecord,
} from "../controllers/electronicHealthRecordController";

const router = Router();

router.post("/electronic_health_records", createElectronicHealthRecord);
router.get("/electronic_health_records", getElectronicHealthRecords);
router.get("/electronic_health_records/:id", getElectronicHealthRecordById);
router.put("/electronic_health_records/:id", updateElectronicHealthRecord);
router.delete("/electronic_health_records/:id", deleteElectronicHealthRecord);

export default router;
