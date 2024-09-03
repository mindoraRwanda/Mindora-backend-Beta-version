import { Request, Response, NextFunction } from "express";
import MoodLog from "../database/models/moodLog"; // Adjust the path as necessary

// Create a mood log
export const createMoodLog = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { userId, mood, rating, condition, description, logDate } = req.body;

    if (!userId || !mood || rating === undefined || !logDate) {
      return res.status(400).json({ message: "Missing parameter(s)!" });
    }

    const moodLog = await MoodLog.create({
      userId,
      mood,
      rating,
      condition,
      description,
      logDate,
    });

    res.status(201).json(moodLog);
  } catch (error) {
    next(error);
  }
};

// Get all mood logs
export const getMoodLogs = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { userId } = req.params;

    if (!userId) {
      return res.status(400).json({ message: "Missing user ID parameter!" });
    }
    const moodLogs = await MoodLog.findAll({ where: { userId } });
    if (moodLogs) {
      return res.status(200).json(moodLogs);
    } else {
      return res.status(404).json({ message: "User mood logs not found" });
    }
  } catch (error) {
    next(error);
  }
};

// Get a mood log by its ID
export const getMoodLogById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ message: "Missing ID parameter!" });
    }

    const moodLog = await MoodLog.findByPk(id);

    if (moodLog) {
      return res.status(200).json(moodLog);
    } else {
      return res.status(404).json({ message: "Mood log not found" });
    }
  } catch (error) {
    next(error);
  }
};

// Update a mood log
export const updateMoodLog = async (
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

    const moodLog = await MoodLog.findByPk(id);

    if (moodLog) {
      await moodLog.update(data);
      return res.status(200).json(moodLog);
    } else {
      return res.status(404).json({ message: "Mood log not found" });
    }
  } catch (error) {
    next(error);
  }
};

// Delete a mood log
export const deleteMoodLog = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ message: "Missing ID parameter!" });
    }

    const moodLog = await MoodLog.findByPk(id);

    if (moodLog) {
      await moodLog.destroy();
      return res.status(204).json();
    } else {
      return res.status(404).json({ message: "Mood log not found" });
    }
  } catch (error) {
    next(error);
  }
};
