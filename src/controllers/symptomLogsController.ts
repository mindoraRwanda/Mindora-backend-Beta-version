import { Request, Response, NextFunction } from "express";
import SymptomLog from "../database/models/symptomLog"; // Import the SymptomLog model

// Create a symptom log
export const createSymptomLog = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { userId, symptom, severity, frequency, onset, description } =
      req.body;

    if (!userId || !symptom || !severity || !frequency || !onset) {
      return res.status(400).json({ message: "Missing parameter(s)!" });
    }

    const symptomLog = await SymptomLog.create({
      userId,
      symptom,
      severity,
      frequency,
      onset,
      description,
    });

    res.status(201).json(symptomLog);
  } catch (error) {
    next(error);
  }
};

// Get all user symptom logs
export const getSymptomLogs = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { userId } = req.params;

    if (!userId) {
      return res.status(400).json({ message: "Missing user ID parameter!" });
    }
    const symptomLogs = await SymptomLog.findAll({
      where: { userId },
    });

    if (symptomLogs) {
      return res.status(200).json(symptomLogs);
    } else {
      return res.status(404).json({ message: "User symptom logs not found" });
    }
  } catch (error) {
    next(error);
  }
};

// Get a symptom log by its ID
export const getSymptomLogById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ message: "Missing ID parameter!" });
    }

    const symptomLog = await SymptomLog.findByPk(id);

    if (symptomLog) {
      return res.status(200).json(symptomLog);
    } else {
      return res.status(404).json({ message: "Symptom log not found" });
    }
  } catch (error) {
    next(error);
  }
};

// Update a symptom log
export const updateSymptomLog = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const data = req.body;

    if (!id || !data) {
      return res.status(400).json({ message: "Missing parameter(s)!" });
    }

    const symptomLog = await SymptomLog.findByPk(id);

    if (symptomLog) {
      await symptomLog.update(data);
      return res.status(200).json(symptomLog);
    } else {
      return res.status(404).json({ message: "Symptom log not found" });
    }
  } catch (error) {
    next(error);
  }
};

// Delete a symptom log
export const deleteSymptomLog = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ message: "Missing ID parameter!" });
    }

    const symptomLog = await SymptomLog.findByPk(id);

    if (symptomLog) {
      await symptomLog.destroy();
      return res.status(204).json();
    } else {
      return res.status(404).json({ message: "Symptom log not found" });
    }
  } catch (error) {
    next(error);
  }
};
