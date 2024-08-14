import { Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";
import {
  generateReport,
  updateUserProgressReport,
  getProgressReportsByUserId,
  deleteUserProgressReport,
} from "../models/ProgressReport";

export const generateProgressReport = async (req: Request, res: Response) => {
  const { userId, startDate, endDate } = req.body;

  if (!userId || !startDate || !endDate) {
    res.status(400).json({ Error: "Missing parameter(s)!" });
  }

  try {
    const rows = await generateReport(userId, startDate, endDate);
    res.status(201).json(rows);
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .json({ Error: "Error occurred while creating message instance!" });
  }
};

export const getProgressReport = async (req: Request, res: Response) => {
  const { userId, startDate, endDate } = req.params;

  if (!userId || !startDate || endDate) {
    return res.status(400).json({ Error: "Missing parameter(s)!" });
  }
  try {
    const progressReport = await getProgressReportsByUserId(
      userId,
      new Date(startDate),
      new Date(endDate)
    );
    if (!progressReport || progressReport.length === 0) {
      return res.status(404).json({ Error: "Progress report not found!" });
    }
    return res.status(200).json(progressReport);
  } catch (err) {
    console.error("Error while retrieving Progress report:", err);
    return res
      .status(500)
      .json({ Error: "Error while retrieving Progress report for user!" });
  }
};

export const updateProgressReport = async (req: Request, res: Response) => {
  const { reportId, updatedMoodSummary, updatedSymptomSummary } = req.body;
  if (!reportId || !updatedMoodSummary || !updatedSymptomSummary) {
    return res.status(400).json({ Error: "Missing parameter(s)!" });
  }

  try {
    const updatedReport = await updateUserProgressReport(
      reportId,
      updatedMoodSummary,
      updatedSymptomSummary
    );
    if (!updatedReport) {
      return res.status(404).json({ Error: "Progress report not found!" });
    }
    return res.status(200).json(updatedReport);
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ Error: "Error while updating the progress report!" });
  }
};

export const deleteProgressReport = async (req: Request, res: Response) => {
  const { reportId } = req.params;
  if (!reportId) {
    return res.status(400).json({ Error: "Missing parameter(s)!" });
  }
};
