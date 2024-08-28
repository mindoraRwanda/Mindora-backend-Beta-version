import { Router } from "express";
import {
  createElectronicHealthRecord,
  getElectronicHealthRecords,
  getElectronicHealthRecordById,
  updateElectronicHealthRecord,
  deleteElectronicHealthRecord,
} from "../controllers/electronicHealthRecordController";

const router = Router();

router.post("/electronic-health-records", createElectronicHealthRecord);
router.get("/electronic-health-records", getElectronicHealthRecords);
router.get("/electronic-health-records/:id", getElectronicHealthRecordById);
router.put("/electronic-health-records/:id", updateElectronicHealthRecord);
router.delete("/electronic-health-records/:id", deleteElectronicHealthRecord);

export default router;
