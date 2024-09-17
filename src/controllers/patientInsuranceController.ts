import { Request, Response, NextFunction } from "express";
import PatientInsurance from "../database/models/patientInsurance";

// Create a new patient insurance
export const createPatientInsurance = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { patientId, insuranceId, verified, expiryDate, status } = req.body;

    if (!patientId || !insuranceId || !status) {
      return res.status(400).json({ message: "Missing parameter(s)!" });
    }

    const patientInsurance = await PatientInsurance.create({
      patientId,
      insuranceId,
      verified: verified || false,
      expiryDate,
      status,
    });

    res.status(201).json(patientInsurance);
  } catch (error) {
    next(error);
  }
};

// Get all patient insurances
export const getPatientInsurances = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const patientInsurances = await PatientInsurance.findAll();
    res.status(200).json(patientInsurances);
  } catch (error) {
    next(error);
  }
};
// Get a single patient insurance by ID
export const getPatientInsuranceById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ message: "Missing parameter(s)!" });
    }

    const patientInsurance = await PatientInsurance.findByPk(id);

    if (patientInsurance) {
      res.status(200).json(patientInsurance);
    } else {
      return res.status(404).json({ message: "PatientInsurance not found" });
    }
  } catch (error) {
    next(error);
  }
};

// Update a patient insurance
export const updatePatientInsurance = async (
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

    const patientInsurance = await PatientInsurance.findByPk(id);

    if (patientInsurance) {
      await patientInsurance.update(data);
      res.status(200).json(patientInsurance);
    } else {
      return res.status(404).json({ message: "PatientInsurance not found" });
    }
  } catch (error) {
    next(error);
  }
};

// Delete a patient insurance
export const deletePatientInsurance = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ message: "Missing parameter(s)!" });
    }

    const patientInsurance = await PatientInsurance.findByPk(id);

    if (patientInsurance) {
      await patientInsurance.destroy();
      res.status(204).json();
    } else {
      return res.status(404).json({ message: "PatientInsurance not found" });
    }
  } catch (error) {
    next(error);
  }
};
