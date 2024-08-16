import { Router } from "express";
import {
  deleteProgressReport,
  generateProgressReport,
  getProgressReport,
  updateProgressReport,
} from "../controllers/progressController";

const router = Router();

router.post("/generate_progress_report", generateProgressReport);
// router.get("/get_progress_report/:reportId", getProgressReportById);
router.get("/progress_report/:userId/:startDate/:endDate", getProgressReport);
router.post("/update_progress_report", updateProgressReport);
router.post("/delete_progress_report/:reportId", deleteProgressReport);

export default router;
