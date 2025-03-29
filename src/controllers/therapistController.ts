import { Request, Response, NextFunction } from "express";
import Therapist from "../database/models/therapist";
import User from "../database/models/user";
import Patient from "../database/models/patient";
import TreatmentPlan from "../database/models/treatmentPlan";
import { where } from "sequelize";

interface personalInfo {
  gender: string;
  dateOfBirth: Date;
  age: number;
  address: string;
}

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

    console.log("Inside create API");

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

    const personalInfo = JSON.parse(personalInformation);

    // Create therapist
    const therapist = await Therapist.create({
      personalInformation: personalInfo,
      diploma: diploma[0].path,
      license: license[0].path,
      userId,
    });

    // Find the user and update role
    const user = await User.findByPk(userId);
    if (therapist && user) {
      await user.update({ role: "Therapist" });
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
    const { personalInformation } = req.body;
    const { diploma, license } = req.files as {
      [fieldname: string]: Express.Multer.File[];
    };

    // Check if ID and data are provided
    if (!id) {
      return res.status(400).json({ message: "Missing therapist ID!" });
    }

    // Find the therapist by ID
    const therapist = await Therapist.findByPk(id);

    if (!therapist) {
      return res.status(404).json({ message: "Therapist not found" });
    }

    const personalInfo = JSON.parse(personalInformation);

    // Update therapist data

    if (personalInfo) therapist.personalInformation = personalInfo;

    if (diploma && diploma[0]) therapist.diploma = diploma[0].path;
    if (license && license[0]) therapist.license = license[0].path;

    await therapist.save();

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
