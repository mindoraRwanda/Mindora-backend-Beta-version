import { Request, Response, NextFunction } from "express";
import TreatmentMilestone from "../database/models/treatmentMilestone";
import TreatmentGoal from "../database/models/treatmentGoal";

export const createTreatmentMilestone = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { goalId, description, targetDate, status } = req.body;
    if (!goalId || !description || !targetDate || !status) {
      return res.status(400).json({ message: "Missing parameter(s)!" });
    }
    const treatmentMilestone = await TreatmentMilestone.create({
      goalId,
      description,
      targetDate,
      status,
    });
    res.status(201).json(treatmentMilestone);
  } catch (error) {
    next(error);
  }
};

export const getTreatmentMilestones = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const treatmentMilestones = await TreatmentMilestone.findAll({
      include: { model: TreatmentGoal, as: "goal" },
    });
    if (!treatmentMilestones) {
      return res
        .status(404)
        .json({ message: "No treatment milestones found!" });
    }
    res.status(200).json(treatmentMilestones);
  } catch (error) {
    next(error);
  }
};

export const getTreatmentMilestoneById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ message: "Missing parameter(s)!" });
    }
    const treatmentMilestone = await TreatmentMilestone.findByPk(id, {
      include: { model: TreatmentGoal, as: "goal" },
    });
    if (treatmentMilestone) {
      return res.status(200).json(treatmentMilestone);
    } else {
      return res.status(404).json({ message: "Treatment Milestone not found" });
    }
  } catch (error) {
    next(error);
  }
};

export const updateTreatmentMilestone = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const data = req.body;
    const { id } = req.params;

    if (!id || !data) {
      return res.status(400).json({ message: "Missing parameter(s)!" });
    }
    const treatmentMilestone = await TreatmentMilestone.findByPk(id);
    if (treatmentMilestone) {
      await treatmentMilestone.update(data);
      res.status(200).json(treatmentMilestone);
    } else {
      return res.status(404).json({ message: "Treatment Milestone not found" });
    }
  } catch (error) {
    next(error);
  }
};

export const deleteTreatmentMilestone = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ message: "Missing parameter(s)!" });
    }
    const treatmentMilestone = await TreatmentMilestone.findByPk(id);
    if (treatmentMilestone) {
      await treatmentMilestone.destroy();
      res.status(204).json();
    } else {
      return res.status(404).json({ message: "Treatment Milestone not found" });
    }
  } catch (error) {
    next(error);
  }
};
