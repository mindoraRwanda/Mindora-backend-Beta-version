import { NextFunction, Request, Response } from "express";
import PostReport from "../database/models/postReport";

// Create a new report
export const createReport = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { reportedByUserId, postId, reason } = req.body;
    if (!reportedByUserId || !postId || !reason) {
      res.status(400).json({ message: "Missing required parameter(s)" });
      return;
    }
    const report = await PostReport.create({
      reportedByUserId,
      postId,
      reason,
    });
    res.status(201).json(report);
  } catch (err) {
    next(err);
  }
};

// Get all reports for specific post
export const getPostReports = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { postId } = req.params;
    if (!postId) {
      res.status(400).json({ message: "Missing post ID" });
      return;
    }
    const postReports = await PostReport.findAll({ where: { postId } });
    if (!postReports || !postReports.length) {
      res.status(404).json({ message: "Not post reports found!" });
    }
    res.status(200).json(postReports);
  } catch (err) {
    next(err);
  }
};

// Get all reports
export const getAllReports = async (
  _req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const reports = await PostReport.findAll();
    if (!reports || !reports.length) {
      res.status(404).json({ message: "Not reports found!" });
    }
    res.status(200).json(reports);
  } catch (err) {
    next(err);
  }
};

// Get a specific report by ID
export const getReportById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { reportId } = req.params;
    if (!reportId) {
      res.status(400).json({ message: "Missing post ID" });
      return;
    }
    const report = await PostReport.findByPk(reportId);
    if (!report) {
      return res.status(404).json({ message: "Report not found" });
    }
    res.status(200).json(report);
  } catch (err) {
    next(err);
  }
};

// Update a report (usually for admin to mark as Reviewed or Resolved)
export const updateReport = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { status, actionTaken } = req.body;
    const { reportId } = req.params;
    if (!reportId) {
      res.status(400).json({ message: "Missing post ID" });
      return;
    }
    const report = await PostReport.findByPk(reportId);
    if (!report) {
      return res.status(404).json({ message: "Report not found" });
    }

    report.status = status || report.status;
    report.actionTaken = actionTaken || report.actionTaken;
    await report.save();

    res.status(200).json(report);
  } catch (err) {
    next(err);
  }
};

// Delete a report
export const deleteReport = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { reportId } = req.params;
    if (!reportId) {
      res.status(400).json({ message: "Missing post ID" });
      return;
    }
    const report = await PostReport.findByPk(reportId);
    if (!report) {
      return res.status(404).json({ message: "Report not found" });
    }

    await report.destroy();
    res.status(200).json({ message: "Report deleted successfully" });
  } catch (err) {
    next(err);
  }
};
