import express from "express";
import {
  createProgressReport,
  getProgressReports,
  getProgressReportById,
  updateProgressReport,
  deleteProgressReport,
} from "../controllers/progressReportController";

const router = express.Router();

router.post("/progress/logs/report", createProgressReport);
router.get("/progress/logs/report/user/:userId", getProgressReports);
router.get("/progress/logs/report/:id", getProgressReportById);
router.put("/progress/logs/report/:id", updateProgressReport);
router.delete("/progress/logs/report/:id", deleteProgressReport);

export default router;
