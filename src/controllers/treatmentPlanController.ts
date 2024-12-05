import { Request, Response, NextFunction } from "express";
import TreatmentPlan from "../database/models/treatmentPlan";
import Patient from "../database/models/patient";
import Therapist from "../database/models/therapist";
import User from "../database/models/user";

// Create a new treatment plan
export const createTreatmentPlan = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const {
      patientId,
      therapistId,
      title,
      description,
      startDate,
      endDate,
      status,
    } = req.body;
    if (!patientId || !therapistId || !title || !description || !startDate) {
      return res.status(400).json({ message: "Missing parameter(s)!" });
    }
    const treatmentPlan = await TreatmentPlan.create({
      patientId,
      therapistId,
      title,
      description,
      startDate,
      endDate,
      status,
    });
    res.status(201).json(treatmentPlan);
  } catch (error) {
    // pass error to errorHandler middleware to be structured
    next(error);
  }
};

// Get all treatment plans
export const getTreatmentPlans = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const treatmentPlans = await TreatmentPlan.findAll({
      include: [
        {
          model: Patient,
          as: "patient",
          include: [
            {
              model: User,
              as: "user",
              attributes: {
                exclude: [
                  "password",
                  "resetPasswordToken",
                  "resetPasswordExpiry",
                ],
              },
            },
          ],
        },
        {
          model: Therapist,
          as: "therapist",
          include: [
            {
              model: User,
              as: "user",
              attributes: {
                exclude: [
                  "password",
                  "resetPasswordToken",
                  "resetPasswordExpiry",
                ],
              },
            },
          ],
        },
      ],
    });
    if (!treatmentPlans) {
      return res.status(404).json({ message: "No treatment plans found!" });
    }
    res.status(200).json(treatmentPlans);
  } catch (error) {
    next(error);
  }
};

export const getTherapistTreatmentPlan = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { therapistId } = req.params;
    if (!therapistId) {
      res.status(400).json({ message: "Missing therapist ID" });
    }

    const treatmentPlans = await TreatmentPlan.findAll({
      where: { therapistId },
      include: {
        model: Therapist,
        as: "therapist",
        include: [
          {
            model: User,
            as: "user",
            attributes: {
              exclude: [
                "password",
                "resetPasswordToken",
                "resetPasswordExpiry",
              ],
            },
          },
        ],
      },
    });
    if (!treatmentPlans || treatmentPlans.length === 0) {
      res.status(404).json({ message: "No treatment plan for therapist" });
    }
    res.status(200).json(treatmentPlans);
  } catch (err) {
    next(err);
  }
};

// Get a single treatment plan by ID
export const getTreatmentPlanById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ message: "Missing parameter(s)!" });
    }
    const treatmentPlan = await TreatmentPlan.findByPk(id, {
      include: [
        {
          model: Patient,
          as: "patient",
          include: [
            {
              model: User,
              as: "user",
              attributes: {
                exclude: [
                  "password",
                  "resetPasswordToken",
                  "resetPasswordExpiry",
                ],
              },
            },
          ],
        },
        {
          model: Therapist,
          as: "therapist",
          include: [
            {
              model: User,
              as: "user",
              attributes: {
                exclude: [
                  "password",
                  "resetPasswordToken",
                  "resetPasswordExpiry",
                ],
              },
            },
          ],
        },
      ],
    });
    if (treatmentPlan) {
      return res.status(200).json(treatmentPlan);
    } else {
      return res.status(404).json({ message: "Treatment Plan not found" });
    }
  } catch (error) {
    // pass error to errorHandler middleware to be structured
    next(error);
  }
};

// Update a treatment plan
export const updateTreatmentPlan = async (
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
    const treatmentPlan = await TreatmentPlan.findByPk(id);
    if (treatmentPlan) {
      await treatmentPlan.update(data);
      res.status(200).json(treatmentPlan);
    } else {
      return res.status(404).json({ message: "Treatment Plan not found" });
    }
  } catch (error) {
    // pass error to errorHandler middleware to be structured
    next(error);
  }
};

// Delete a treatment plan
export const deleteTreatmentPlan = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ message: "Missing parameter(s)!" });
    }
    const treatmentPlan = await TreatmentPlan.findByPk(id);
    if (treatmentPlan) {
      await treatmentPlan.destroy();
      res.status(204).json();
    } else {
      return res.status(404).json({ message: "Treatment Plan not found" });
    }
  } catch (error) {
    // pass error to errorHandler middleware to be structured
    next(error);
  }
};
