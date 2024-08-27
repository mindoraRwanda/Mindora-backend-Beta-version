import { Request, Response, NextFunction } from "express";
import MedicationRecommendation from "../database/models/medicationRecommendation";
import User from "../database/models/user";
import Patient from "../database/models/patient";

// Create Medication Recommendation
export const createMedicationRecommendation = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { patientId, recommendation, reason } = req.body;

    if (!patientId || !recommendation || !reason) {
      return res.status(400).json({ message: "Missing required parameters!" });
    }

    const medicationRecommendation = await MedicationRecommendation.create({
      patientId,
      recommendation,
      reason,
    });

    res.status(201).json(medicationRecommendation);
  } catch (error) {
    next(error);
  }
};

// Get All Medication Recommendations
export const getMedicationRecommendations = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const medicationRecommendations = await MedicationRecommendation.findAll({
      include: {
        model: Patient,
        as: "patient",
        include: [{ model: User, as: "user" }],
      },
    });
    if (medicationRecommendations) {
      return res.status(200).json(medicationRecommendations);
    } else {
      return res
        .status(404)
        .json({ message: "Medication recommendations not found" });
    }
  } catch (error) {
    next(error);
  }
};

// Get Medication Recommendation by ID
export const getMedicationRecommendationById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ message: "Missing ID parameter!" });
    }

    const medicationRecommendation = await MedicationRecommendation.findByPk(
      id,
      {
        include: {
          model: Patient,
          as: "patient",
          include: [{ model: User, as: "user" }],
        },
      }
    );

    if (medicationRecommendation) {
      return res.status(200).json(medicationRecommendation);
    } else {
      return res
        .status(404)
        .json({ message: "Medication recommendation not found" });
    }
  } catch (error) {
    next(error);
  }
};

// Update Medication Recommendation
export const updateMedicationRecommendation = async (
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

    const medicationRecommendation = await MedicationRecommendation.findByPk(
      id
    );

    if (medicationRecommendation) {
      await medicationRecommendation.update(data);
      return res.status(200).json(medicationRecommendation);
    } else {
      return res
        .status(404)
        .json({ message: "Medication recommendation not found" });
    }
  } catch (error) {
    next(error);
  }
};

// Delete Medication Recommendation
export const deleteMedicationRecommendation = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ message: "Missing ID parameter!" });
    }

    const medicationRecommendation = await MedicationRecommendation.findByPk(
      id
    );

    if (medicationRecommendation) {
      await medicationRecommendation.destroy();
      return res.status(204).json();
    } else {
      return res
        .status(404)
        .json({ message: "Medication recommendation not found" });
    }
  } catch (error) {
    next(error);
  }
};
