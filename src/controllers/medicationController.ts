import { Request, Response, NextFunction } from "express";
import Medication from "../database/models/medication";

// Create Medication
export const createMedication = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name, description, dosageForm, strength } = req.body;

    if (!name || !description || !dosageForm || !strength) {
      return res.status(400).json({ message: "Missing required parameters!" });
    }

    const medication = await Medication.create({
      name,
      description,
      dosageForm,
      strength,
    });

    res.status(201).json(medication);
  } catch (error) {
    next(error);
  }
};

// Get All Medications
export const getMedications = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const medications = await Medication.findAll();
    if (medications) {
      return res.status(200).json(medications);
    } else {
      return res.status(404).json({ message: "Medications not found" });
    }
  } catch (error) {
    next(error);
  }
};

// Get Medication by ID
export const getMedicationById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ message: "Missing ID parameter!" });
    }

    const medication = await Medication.findByPk(id);

    if (medication) {
      return res.status(200).json(medication);
    } else {
      return res.status(404).json({ message: "Medication not found" });
    }
  } catch (error) {
    next(error);
  }
};

// Update Medication
export const updateMedication = async (
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

    const medication = await Medication.findByPk(id);

    if (medication) {
      await medication.update(data);
      return res.status(200).json(medication);
    } else {
      return res.status(404).json({ message: "Medication not found" });
    }
  } catch (error) {
    next(error);
  }
};

// Delete Medication
export const deleteMedication = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ message: "Missing ID parameter!" });
    }

    const medication = await Medication.findByPk(id);

    if (medication) {
      await medication.destroy();
      return res.status(204).json();
    } else {
      return res.status(404).json({ message: "Medication not found" });
    }
  } catch (error) {
    next(error);
  }
};
