import express from "express";
import {
  createReport,
  getAllReports,
  getReportById,
  getPostReports,
  updateReport,
  deleteReport,
} from "../controllers/postReportController";

const router = express.Router();

// Create a new report
router.post("/post-report/", createReport);

// Get all reports
router.get("/post-report/", getAllReports);

// Get all reports for a specific post
router.get("/post-report/post/:postId", getPostReports);

// Get a specific report by ID
router.get("/post-report/:reportId", getReportById);

// Update a specific report (mark as Reviewed / Resolved)
router.put("/post-report/:reportId", updateReport);

// Delete a specific report
router.delete("/post-report/:reportId", deleteReport);

export default router;
