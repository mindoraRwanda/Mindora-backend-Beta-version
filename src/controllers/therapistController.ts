import { Request, Response, NextFunction } from "express";
import Therapist from "../database/models/therapist";
import User from "../database/models/user";
import Patient from "../database/models/patient";
import TreatmentPlan from "../database/models/treatmentPlan";

// Create a new therapist
export const createTherapist = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { personalInformation, userId } = req.body;
    const { diploma, license } = req.files as {
      [fieldname: string]: Express.Multer.File[];
    };

    if (
      !personalInformation ||
      !diploma ||
      !diploma.length ||
      !license ||
      !license.length ||
      !userId
    ) {
      return res.status(400).json({ message: "Missing parameter(s)!" });
    }

    // Create therapist
    const therapist = await Therapist.create({
      personalInformation,
      diploma: diploma[0].path,
      license: license[0].path,
      userId,
    });

    // Find the user and update role
    const user = await User.findByPk(userId);
    if (therapist && user) {
      await user.update({ role: "therapist" });
    }

    return res
      .status(201)
      .json({ therapist, message: "Therapist created successfully!" });
  } catch (error) {
    next(error);
  }
};

// Get a single therapist by ID
export const getTherapistById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ message: "Missing parameter(s)!" });
    }
    const therapist = await Therapist.findByPk(id, {
      include: {
        model: User,
        as: "user",
      },
    });

    if (!therapist) {
      return res.status(404).json({ message: "Therapist not found" });
    }

    return res.status(200).json(therapist);
  } catch (error) {
    // pass error to errorHandler middleware
    next(error);
  }
};

// Get all therapists
export const getAllTherapists = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const therapists = await Therapist.findAll({
      include: { model: User, as: "user" },
    });
    return res.status(200).json(therapists);
  } catch (error) {
    // pass error to errorHandler middleware
    next(error);
  }
};

// get patients being treated by therapist
export const therapistPatients = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { therapistId } = req.params;
    if (!therapistId) {
      return res.status(400).json({ message: "Missing therapist ID" });
    }

    const treatmentPlans = await TreatmentPlan.findAll({
      where: { therapistId },
    });

    if (!treatmentPlans.length) {
      return res
        .status(404)
        .json({ message: "No patients found for this therapist" });
    }

    const patientIds = treatmentPlans.map((plan) => plan.patientId);
    const patients = await Patient.findAll({
      where: { id: patientIds },
      include: {
        model: User,
        as: "user",
        attributes: {
          exclude: ["password", "resetPasswordToken", "resetPasswordExpiry"],
        },
      },
    });

    return res.status(200).json({ patients, count: patients.length });
  } catch (err) {
    next(err);
  }
};

// Update a therapist by ID
export const updateTherapist = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const data = req.body;
    const { diploma, license } = req.files as {
      [fieldname: string]: Express.Multer.File[];
    };

    // Check if ID and data are provided
    if (!id || Object.keys(data).length === 0) {
      return res.status(400).json({ message: "Missing parameter(s)!" });
    }

    // Find the therapist by ID
    const therapist = await Therapist.findByPk(id);

    if (!therapist) {
      return res.status(404).json({ message: "Therapist not found" });
    }

    // Update therapist data
    await therapist.update({
      ...data,
      diploma: diploma && diploma[0] ? diploma[0].path : therapist.diploma,
      license: license && license[0] ? license[0].path : therapist.license,
    });

    return res
      .status(200)
      .json({ therapist, message: "Therapist updated successfully!" });
  } catch (error) {
    next(error);
  }
};

// Delete a therapist by ID
export const deleteTherapist = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ message: "Missing parameter(s)!" });
    }
    const therapist = await Therapist.findByPk(id);

    if (!therapist) {
      return res.status(404).json({ message: "Therapist not found" });
    }

    await therapist.destroy();

    return res.status(204).json();
  } catch (error) {
    // pass error to errorHandler middleware
    next(error);
  }
};
