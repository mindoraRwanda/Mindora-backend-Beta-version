import { Request, Response, NextFunction } from "express";
import {
  generateMoodSummary,
  generateSymptomSummary,
} from "../utils/generateLogSummary";
import ProgressReport from "../database/models/progressReport";

// Create a new progress report
export const createProgressReport = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { userId, startDate, endDate } = req.body;

    const moodSummary = await generateMoodSummary(userId, startDate, endDate);
    const symptomSummary = await generateSymptomSummary(
      userId,
      startDate,
      endDate
    );

    const progressReport = await ProgressReport.create({
      userId,
      startDate,
      endDate,
      moodSummary,
      symptomSummary,
    });

    res.status(201).json(progressReport);
  } catch (error) {
    next(error);
  }
};

// Get all progress reports for a user
export const getProgressReports = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { userId } = req.params;
    if (!userId) {
      return res.status(400).json({ message: "Missing user ID parameter" });
    }
    const reports = await ProgressReport.findAll({
      where: { userId },
    });

    if (reports.length === 0) {
      return res.status(404).json({ message: "No progress reports found" });
    }

    res.status(200).json(reports);
  } catch (error) {
    next(error);
  }
};

// Get a progress report by ID
export const getProgressReportById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ message: "Missing ID parameter" });
    }
    const progressReport = await ProgressReport.findByPk(id);

    if (!progressReport) {
      return res.status(404).json({ message: "Progress report not found" });
    }

    res.status(200).json(progressReport);
  } catch (error) {
    next(error);
  }
};

// Update a progress report
export const updateProgressReport = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ message: "Missing ID parameter" });
    }
    const { moodSummary, symptomSummary } = req.body;

    const progressReport = await ProgressReport.findByPk(id);

    if (!progressReport) {
      return res.status(404).json({ message: "Progress report not found" });
    }

    progressReport.moodSummary = moodSummary;
    progressReport.symptomSummary = symptomSummary;
    await progressReport.save();

    res.status(200).json(progressReport);
  } catch (error) {
    next(error);
  }
};

// Delete a progress report
export const deleteProgressReport = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ message: "Missing ID parameter" });
    }
    const result = await ProgressReport.findByPk(id);

    if (!result) {
      return res.status(404).json({ message: "Progress report not found" });
    } else {
      await result.destroy();
    }

    res.status(204).json();
  } catch (error) {
    next(error);
  }
};
