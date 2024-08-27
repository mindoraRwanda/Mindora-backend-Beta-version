import { Request, Response, NextFunction } from "express";
import PrescriptionCompliance from "../database/models/prescriptionCompliance";
import MedicationPrescription from "../database/models/medicationPrescription";
import Patient from "../database/models/patient";
import User from "../database/models/user";

// Create Prescription Compliance
export const createPrescriptionCompliance = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { prescriptionId, patientId, date, status, notes } = req.body;

    if (!prescriptionId || !patientId || !date || !status) {
      return res.status(400).json({ message: "Missing required parameters!" });
    }

    const compliance = await PrescriptionCompliance.create({
      prescriptionId,
      patientId,
      date,
      status,
      notes,
    });

    res.status(201).json(compliance);
  } catch (error) {
    next(error);
  }
};

// get all Prescription Compliances

export const getPrescriptionCompliances = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const compliances = await PrescriptionCompliance.findAll({
      include: [
        {
          model: Patient,
          as: "patient",
          include: [{ model: User, as: "user" }],
        },
        {
          model: MedicationPrescription,
          as: "prescription",
        },
      ],
    });

    if (compliances) {
      return res.status(200).json(compliances);
    } else {
      return res.status(404).json({ message: "No compliance records found" });
    }
  } catch (error) {
    next(error);
  }
};

// get prescription compliance by id
export const getPrescriptionComplianceById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ message: "Missing ID parameter!" });
    }

    const compliance = await PrescriptionCompliance.findByPk(id, {
      include: [
        {
          model: Patient,
          as: "patient",
          include: [{ model: User, as: "user" }],
        },
        {
          model: MedicationPrescription,
          as: "prescription",
        },
      ],
    });

    if (compliance) {
      return res.status(200).json(compliance);
    } else {
      return res.status(404).json({ message: "Compliance record not found" });
    }
  } catch (error) {
    next(error);
  }
};

// update prescription compliance
export const updatePrescriptionCompliance = async (
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

    const compliance = await PrescriptionCompliance.findByPk(id);

    if (compliance) {
      await compliance.update(data);
      return res.status(200).json(compliance);
    } else {
      return res.status(404).json({ message: "Compliance record not found" });
    }
  } catch (error) {
    next(error);
  }
};

// delete prescription compliance
export const deletePrescriptionCompliance = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ message: "Missing ID parameter!" });
    }

    const compliance = await PrescriptionCompliance.findByPk(id);

    if (compliance) {
      await compliance.destroy();
      return res.status(204).json();
    } else {
      return res.status(404).json({ message: "Compliance record not found" });
    }
  } catch (error) {
    next(error);
  }
};
