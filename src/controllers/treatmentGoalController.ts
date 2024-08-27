import { Request, Response, NextFunction } from "express";
import TreatmentGoal from "../database/models/treatmentGoal";
import TreatmentPlan from "../database/models/treatmentPlan";

// Create a new treatment goal
export const createTreatmentGoal = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { treatmentPlanId, description, targetDate, status } = req.body;

    if (!treatmentPlanId || !description || !targetDate || !status) {
      return res.status(400).json({ message: "Missing parameter(s)!" });
    }

    const treatmentGoal = await TreatmentGoal.create({
      treatmentPlanId,
      description,
      targetDate,
      status,
    });

    res.status(201).json(treatmentGoal);
  } catch (error) {
    next(error);
  }
};

// Get all treatment goals
export const getTreatmentGoals = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const treatmentGoals = await TreatmentGoal.findAll({
      include: [{ model: TreatmentPlan, as: "treatment_plan" }],
    });

    if (!treatmentGoals) {
      return res.status(404).json({ message: "No treatment goals found!" });
    }

    res.status(200).json(treatmentGoals);
  } catch (error) {
    next(error);
  }
};

// Get a single treatment goal by ID
export const getTreatmentGoalById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ message: "Missing parameter(s)!" });
    }

    const treatmentGoal = await TreatmentGoal.findByPk(id, {
      include: [{ model: TreatmentPlan, as: "treatment_plan" }],
    });

    if (treatmentGoal) {
      return res.status(200).json(treatmentGoal);
    } else {
      return res.status(404).json({ message: "Treatment Goal not found" });
    }
  } catch (error) {
    next(error);
  }
};

// Update a treatment goal
export const updateTreatmentGoal = async (
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

    const treatmentGoal = await TreatmentGoal.findByPk(id);

    if (treatmentGoal) {
      await treatmentGoal.update(data);
      res.status(200).json(treatmentGoal);
    } else {
      return res.status(404).json({ message: "Treatment Goal not found" });
    }
  } catch (error) {
    next(error);
  }
};

// Delete a treatment goal
export const deleteTreatmentGoal = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ message: "Missing parameter(s)!" });
    }

    const treatmentGoal = await TreatmentGoal.findByPk(id);

    if (treatmentGoal) {
      await treatmentGoal.destroy();
      res.status(204).json();
    } else {
      return res.status(404).json({ message: "Treatment Goal not found" });
    }
  } catch (error) {
    next(error);
  }
};
