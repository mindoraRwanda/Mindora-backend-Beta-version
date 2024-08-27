import { Request, Response, NextFunction } from "express";
import Appointment from "../database/models/appointment";
import Therapist from "../database/models/therapist";
import Patient from "../database/models/patient";

// Create a new appointment
export const createAppointment = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const {
      patientId,
      therapistId,
      startTime,
      endTime,
      location,
      appointmentType,
      status,
      notes,
    } = req.body;
    if (
      !patientId ||
      !therapistId ||
      !startTime ||
      !endTime ||
      !location ||
      !appointmentType ||
      !status
    ) {
      return res.status(400).json({ message: "Missing parameter(s)!" });
    }
    const appointment = await Appointment.create({
      patientId,
      therapistId,
      startTime,
      endTime,
      location,
      appointmentType,
      status,
      notes,
    });
    res.status(201).json(appointment);
  } catch (error) {
    // pass error to errorHandler middleware to be structured
    next(error);
  }
};

// Get all appointments
export const getAppointments = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const appointments = await Appointment.findAll({
      include: [
        { model: Therapist, as: "therapist" },
        { model: Patient, as: "patient" },
      ],
    });
    res.status(200).json(appointments);
  } catch (error) {
    next(error);
  }
};

// Get a single appointment by ID
export const getAppointmentById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ message: "Missing parameter(s)!" });
    }
    const appointment = await Appointment.findByPk(id, {
      include: [
        { model: Therapist, as: "therapist" },
        { model: Patient, as: "patient" },
      ],
    });
    if (appointment) {
      return res.status(200).json(appointment);
    } else {
      return res.status(404).json({ message: "Appointment not found" });
    }
  } catch (error) {
    // pass error to errorHandler middleware to be structured
    next(error);
  }
};

// Update an appointment
export const updateAppointment = async (
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
    const appointment = await Appointment.findByPk(id);
    if (appointment) {
      await appointment.update(data);
      res.status(200).json(appointment);
    } else {
      return res.status(404).json({ message: "Appointment not found" });
    }
  } catch (error) {
    // pass error to errorHandler middleware to be structured
    next(error);
  }
};

// Delete an appointment
export const deleteAppointment = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ message: "Missing parameter(s)!" });
    }
    const appointment = await Appointment.findByPk(id);
    if (appointment) {
      await appointment.destroy();
      res.status(204).json();
    } else {
      return res.status(404).json({ message: "Appointment not found" });
    }
  } catch (error) {
    // pass error to errorHandler middleware to be structured
    next(error);
  }
};
