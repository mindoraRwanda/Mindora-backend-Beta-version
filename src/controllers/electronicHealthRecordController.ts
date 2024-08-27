import { Request, Response, NextFunction } from "express";
import ElectronicHealthRecord from "../database/models/electronicHealthRecord";
import Patient from "../database/models/patient";
import Therapist from "../database/models/therapist";
import User from "../database/models/user";

// Create a new electronic health record
export const createElectronicHealthRecord = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { patientId, therapistId, recordType, recordData } = req.body;
    if (!patientId || !therapistId || !recordType || !recordData) {
      return res.status(400).json({ message: "Missing parameter(s)!" });
    }
    const electronicHealthRecord = await ElectronicHealthRecord.create({
      patientId,
      therapistId,
      recordType,
      recordData,
    });
    res.status(201).json(electronicHealthRecord);
  } catch (error) {
    // pass error to errorHandler middleware to be structured
    next(error);
  }
};

// Get all electronic health records
export const getElectronicHealthRecords = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const electronicHealthRecords = await ElectronicHealthRecord.findAll({
      include: [
        {
          model: Patient,
          as: "patient",
          include: [{ model: User, as: "user" }],
        },
        {
          model: Therapist,
          as: "therapist",
          include: [{ model: User, as: "user" }],
        },
      ],
    });
    if (!electronicHealthRecords) {
      return res
        .status(404)
        .json({ message: "No electronic health records found!" });
    }
    res.status(200).json(electronicHealthRecords);
  } catch (error) {
    next(error);
  }
};

// Get a single electronic health record by ID
export const getElectronicHealthRecordById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ message: "Missing parameter(s)!" });
    }
    const electronicHealthRecord = await ElectronicHealthRecord.findByPk(id, {
      include: [
        {
          model: Patient,
          as: "patient",
          include: [{ model: User, as: "user" }],
        },
        {
          model: Therapist,
          as: "therapist",
          include: [{ model: User, as: "user" }],
        },
      ],
    });
    if (electronicHealthRecord) {
      return res.status(200).json(electronicHealthRecord);
    } else {
      return res
        .status(404)
        .json({ message: "Electronic Health Record not found" });
    }
  } catch (error) {
    // pass error to errorHandler middleware to be structured
    next(error);
  }
};

// Update an electronic health record
export const updateElectronicHealthRecord = async (
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
    const electronicHealthRecord = await ElectronicHealthRecord.findByPk(id);
    if (electronicHealthRecord) {
      await electronicHealthRecord.update(data);
      res.status(200).json(electronicHealthRecord);
    } else {
      return res
        .status(404)
        .json({ message: "Electronic Health Record not found" });
    }
  } catch (error) {
    // pass error to errorHandler middleware to be structured
    next(error);
  }
};

// Delete an electronic health record
export const deleteElectronicHealthRecord = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ message: "Missing parameter(s)!" });
    }
    const electronicHealthRecord = await ElectronicHealthRecord.findByPk(id);
    if (electronicHealthRecord) {
      await electronicHealthRecord.destroy();
      res.status(204).json();
    } else {
      return res
        .status(404)
        .json({ message: "Electronic Health Record not found" });
    }
  } catch (error) {
    // pass error to errorHandler middleware to be structured
    next(error);
  }
};
