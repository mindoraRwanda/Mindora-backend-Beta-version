import { Router } from "express";
import { generateProgressReport } from "../controllers/progressController";

const router = Router();

router.post("/generate_progress_report", generateProgressReport);
// router.get("/get_progress_report/:reportId", getProgressReportById);
router.get("/:userId/report/:startDate/:endDate");

export default router;
