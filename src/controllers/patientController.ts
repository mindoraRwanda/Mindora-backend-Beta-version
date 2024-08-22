import { Request, Response } from "express";
import Patient from "../database/models/patient";
import { error } from "console";

// Create a new Patient
export const createPatient = async (req: Request, res: Response) => {
  try {
    const { userId, medicalProfile, personalInformation, emergencyContact } =
      req.body;
    if (
      !userId ||
      !medicalProfile ||
      !personalInformation ||
      !emergencyContact
    ) {
      res.status(400).json({ error: "Missing parameter(s)!" });
    }
    const newPatient = await Patient.create({
      userId,
      medicalProfile,
      personalInformation,
      emergencyContact,
    });

    res.status(201).json(newPatient);
  } catch (error) {
    res.status(500).json({ error: "Failed to create patient" });
  }
};

// Get a specific Patient by ID
export const getPatientById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    if (id) {
      res.status(400).json({ error: "Missing parameter(s)!" });
    }
    const patient = await Patient.findByPk(id);

    if (!patient) {
      return res.status(404).json({ error: "Patient not found" });
    }

    res.status(200).json(patient);
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve patient" });
  }
};

// Update a Patient
export const updatePatient = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    if (id) {
      res.status(400).json({ error: "Missing parameter(s)!" });
    }
    const { userId, medicalProfile, personalInformation, emergencyContact } =
      req.body;

    const patient = await Patient.findByPk(id);

    if (!patient) {
      return res.status(404).json({ error: "Patient not found" });
    }

    patient.userId = userId || patient.userId;
    patient.medicalProfile = medicalProfile || patient.medicalProfile;
    patient.personalInformation =
      personalInformation || patient.personalInformation;
    patient.emergencyContact = emergencyContact || patient.emergencyContact;

    await patient.save();

    res.status(200).json(patient);
  } catch (error) {
    res.status(500).json({ error: "Failed to update patient" });
  }
};

// Delete a Patient
export const deletePatient = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    if (id) {
      res.status(400).json({ error: "Missing parameter(s)!" });
    }

    const patient = await Patient.findByPk(id);

    if (!patient) {
      return res.status(404).json({ error: "Patient not found" });
    }

    await patient.destroy();

    res.status(204).json();
  } catch (error) {
    res.status(500).json({ error: "Failed to delete patient" });
  }
};

// Get all Patients
export const getAllPatients = async (req: Request, res: Response) => {
  try {
    const patients = await Patient.findAll();
    if (!patients) {
      return res.status(404).json({ error: "Patients not found" });
    }
    res.status(200).json(patients);
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve patients" });
  }
};
