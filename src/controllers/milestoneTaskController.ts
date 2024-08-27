import { Request, Response, NextFunction } from "express";
import MilestoneTask from "../database/models/milestoneTask";
import TreatmentMilestone from "../database/models/treatmentMilestone";

// Create a new milestone task
export const createMilestoneTask = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { milestoneId, description, targetDate, status } = req.body;

    if (!milestoneId || !description || !targetDate || !status) {
      return res.status(400).json({ message: "Missing parameter(s)!" });
    }

    const milestoneTask = await MilestoneTask.create({
      milestoneId,
      description,
      targetDate,
      status,
    });
    res.status(201).json(milestoneTask);
  } catch (error) {
    // pass error to errorHandler middleware to be structured
    next(error);
  }
};

// Get all milestone tasks
export const getMilestoneTasks = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const milestoneTasks = await MilestoneTask.findAll({
      include: [{ model: TreatmentMilestone, as: "milestone" }],
    });
    if (!milestoneTasks.length) {
      return res.status(404).json({ message: "No milestone tasks found!" });
    }
    res.status(200).json(milestoneTasks);
  } catch (error) {
    next(error);
  }
};

// Get a single milestone task by ID
export const getMilestoneTaskById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ message: "Missing parameter(s)!" });
    }

    const milestoneTask = await MilestoneTask.findByPk(id, {
      include: [{ model: TreatmentMilestone, as: "milestone" }],
    });

    if (milestoneTask) {
      return res.status(200).json(milestoneTask);
    } else {
      return res.status(404).json({ message: "Milestone Task not found" });
    }
  } catch (error) {
    // pass error to errorHandler middleware to be structured
    next(error);
  }
};

// Update a milestone task
export const updateMilestoneTask = async (
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

    const milestoneTask = await MilestoneTask.findByPk(id);

    if (milestoneTask) {
      await milestoneTask.update(data);
      res.status(200).json(milestoneTask);
    } else {
      return res.status(404).json({ message: "Milestone Task not found" });
    }
  } catch (error) {
    // pass error to errorHandler middleware to be structured
    next(error);
  }
};

// Delete a milestone task
export const deleteMilestoneTask = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ message: "Missing parameter(s)!" });
    }

    const milestoneTask = await MilestoneTask.findByPk(id);

    if (milestoneTask) {
      await milestoneTask.destroy();
      res.status(204).json();
    } else {
      return res.status(404).json({ message: "Milestone Task not found" });
    }
  } catch (error) {
    // pass error to errorHandler middleware to be structured
    next(error);
  }
};
