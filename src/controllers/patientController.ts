import { Request, Response, NextFunction } from "express";
import Patient from "../database/models/patient";
import User from "../database/models/user";
import { error } from "console";

// Create a new Patient
export const createPatient = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { userId, medicalProfile, personalInformation, emergencyContact } =
      req.body;
    if (
      !userId ||
      !medicalProfile ||
      !personalInformation ||
      !emergencyContact
    ) {
      res.status(400).json({ message: "Missing parameter(s)!" });
    }
    const newPatient = await Patient.create({
      userId,
      medicalProfile,
      personalInformation,
      emergencyContact,
    });

    res.status(201).json(newPatient);
  } catch (error) {
    next(error);
  }
};

// Get a specific Patient by ID
export const getPatientById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    if (id) {
      res.status(400).json({ message: "Missing parameter(s)!" });
    }
    const patient = await Patient.findByPk(id);

    if (!patient) {
      return res.status(404).json({ message: "Patient not found" });
    }

    res.status(200).json(patient);
  } catch (error) {
    next(error);
  }
};

// Update a Patient
export const updatePatient = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    if (id) {
      res.status(400).json({ message: "Missing parameter(s)!" });
    }
    const { userId, medicalProfile, personalInformation, emergencyContact } =
      req.body;

    const patient = await Patient.findByPk(id);

    if (!patient) {
      return res.status(404).json({ message: "Patient not found" });
    }

    patient.userId = userId || patient.userId;
    patient.medicalProfile = medicalProfile || patient.medicalProfile;
    patient.personalInformation =
      personalInformation || patient.personalInformation;
    patient.emergencyContact = emergencyContact || patient.emergencyContact;

    await patient.save();

    res.status(200).json(patient);
  } catch (error) {
    next(error);
  }
};

// Delete a Patient
export const deletePatient = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    if (id) {
      res.status(400).json({ message: "Missing parameter(s)!" });
    }

    const patient = await Patient.findByPk(id);

    if (!patient) {
      return res.status(404).json({ message: "Patient not found" });
    }

    await patient.destroy();

    res.status(204).json();
  } catch (error) {
    next(error);
  }
};

// Get all Patients
export const getAllPatients = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const patients = await Patient.findAll({ include: User });
    if (!patients) {
      return res.status(404).json({ message: "Patients not found" });
    }
    res.status(200).json(patients);
  } catch (error) {
    next(error);
  }
};
