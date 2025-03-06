import { Router } from "express";
import {
  createSymptomLog,
  getSymptomLogs,
  getSymptomLogById,
  updateSymptomLog,
  deleteSymptomLog,
} from "../controllers/symptomLogsController";
import { authorize } from "../middleware/rbac.middleware";

const router = Router();

router.post("/symptom-logs", authorize("create_symptom_log"), createSymptomLog);
router.get(
  "/symptom-logs/user/:userId",
  authorize("get_user_symptom_logs"),
  getSymptomLogs
);
router.get(
  "/symptom-logs/:id",
  authorize("get_symptom_log"),
  getSymptomLogById
);
router.put(
  "/symptom-logs/:id",
  authorize("update_symptom_log"),
  updateSymptomLog
);
router.delete(
  "/symptom-logs/:id",
  authorize("delete_symptom_log"),
  deleteSymptomLog
);

export default router;
