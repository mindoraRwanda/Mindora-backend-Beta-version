import { Request, Response, NextFunction } from "express";
import TreatmentPlanAdjustment from "../database/models/treatmentPlanAdjustment";
import Therapist from "../database/models/therapist";
import TreatmentPlan from "../database/models/treatmentPlan";

// Create a new treatment plan adjustment
export const createTreatmentPlanAdjustment = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { treatmentPlanId, reason, changes, modifiedBy } = req.body;
    if (!treatmentPlanId || !reason || !changes || !modifiedBy) {
      return res.status(400).json({ message: "Missing parameter(s)!" });
    }
    const adjustment = await TreatmentPlanAdjustment.create({
      treatmentPlanId,
      reason,
      changes,
      modifiedBy,
    });
    res.status(201).json(adjustment);
  } catch (error) {
    next(error);
  }
};

// Get all treatment plan adjustments
export const getTreatmentPlanAdjustments = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const adjustments = await TreatmentPlanAdjustment.findAll({
      include: [
        { model: TreatmentPlan, as: "treatment_plan" },
        { model: Therapist, as: "therapist" },
      ],
    });
    if (!adjustments) {
      return res
        .status(404)
        .json({ message: "No treatment plan adjustments found!" });
    }
    res.status(200).json(adjustments);
  } catch (error) {
    next(error);
  }
};

// Get a single treatment plan adjustment by ID
export const getTreatmentPlanAdjustmentById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ message: "Missing parameter(s)!" });
    }
    const adjustment = await TreatmentPlanAdjustment.findByPk(id, {
      include: [
        { model: TreatmentPlan, as: "treatment_plan" },
        { model: Therapist, as: "therapist" },
      ],
    });
    if (adjustment) {
      return res.status(200).json(adjustment);
    } else {
      return res
        .status(404)
        .json({ message: "Treatment Plan Adjustment not found" });
    }
  } catch (error) {
    next(error);
  }
};

// Update a treatment plan adjustment
export const updateTreatmentPlanAdjustment = async (
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
    const adjustment = await TreatmentPlanAdjustment.findByPk(id);
    if (adjustment) {
      await adjustment.update(data);
      res.status(200).json(adjustment);
    } else {
      return res
        .status(404)
        .json({ message: "Treatment Plan Adjustment not found" });
    }
  } catch (error) {
    next(error);
  }
};

// Delete a treatment plan adjustment
export const deleteTreatmentPlanAdjustment = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ message: "Missing parameter(s)!" });
    }
    const adjustment = await TreatmentPlanAdjustment.findByPk(id);
    if (adjustment) {
      await adjustment.destroy();
      res.status(204).json();
    } else {
      return res
        .status(404)
        .json({ message: "Treatment Plan Adjustment not found" });
    }
  } catch (error) {
    next(error);
  }
};
