import { Request, Response, NextFunction } from "express";
import MedicationPrescription from "../database/models/medicationPrescription";
import Medication from "../database/models/medication";

// Create Medication Prescription
export const createMedicationPrescription = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const {
      patientId,
      therapistId,
      medicationId,
      dosage,
      duration,
      startDate,
      endDate,
      status,
      notes,
    } = req.body;

    if (!patientId || !therapistId || !medicationId || !dosage) {
      return res.status(400).json({ message: "Missing required parameters!" });
    }

    const prescription = await MedicationPrescription.create({
      patientId,
      therapistId,
      medicationId,
      dosage,
      duration,
      startDate,
      endDate,
      status,
      notes,
    });

    res.status(201).json(prescription);
  } catch (error) {
    next(error);
  }
};

// Get All Medication Prescriptions
export const getMedicationPrescriptions = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const prescriptions = await MedicationPrescription.findAll({
      include: { model: Medication, as: "medication" },
    });
    if (prescriptions) {
      return res.status(200).json(prescriptions);
    } else {
      return res
        .status(404)
        .json({ message: "Medication prescriptions not found" });
    }
  } catch (error) {
    next(error);
  }
};

// Get Medication Prescription by ID
export const getMedicationPrescriptionById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ message: "Missing ID parameter!" });
    }

    const prescription = await MedicationPrescription.findByPk(id, {
      include: { model: Medication, as: "medication" },
    });

    if (prescription) {
      return res.status(200).json(prescription);
    } else {
      return res
        .status(404)
        .json({ message: "Medication prescription not found" });
    }
  } catch (error) {
    next(error);
  }
};

// Update Medication Prescription
export const updateMedicationPrescription = async (
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

    const prescription = await MedicationPrescription.findByPk(id);

    if (prescription) {
      await prescription.update(data);
      return res.status(200).json(prescription);
    } else {
      return res
        .status(404)
        .json({ message: "Medication prescription not found" });
    }
  } catch (error) {
    next(error);
  }
};

// Delete Medication Prescription
export const deleteMedicationPrescription = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ message: "Missing ID parameter!" });
    }

    const prescription = await MedicationPrescription.findByPk(id);

    if (prescription) {
      await prescription.destroy();
      return res.status(204).json();
    } else {
      return res
        .status(404)
        .json({ message: "Medication prescription not found" });
    }
  } catch (error) {
    next(error);
  }
};
