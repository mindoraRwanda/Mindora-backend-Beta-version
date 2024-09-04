import { Router } from "express";
import {
  createSymptomLog,
  getSymptomLogs,
  getSymptomLogById,
  updateSymptomLog,
  deleteSymptomLog,
} from "../controllers/symptomLogsController";

const router = Router();

router.post("/symptom-logs", createSymptomLog);
router.get("/symptom-logs/user/:userId", getSymptomLogs);
router.get("/symptom-logs/:id", getSymptomLogById);
router.put("/symptom-logs/:id", updateSymptomLog);
router.delete("/symptom-logs/:id", deleteSymptomLog);

export default router;
