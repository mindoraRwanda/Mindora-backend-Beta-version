import { Request, Response, NextFunction } from "express";
import Appointment from "../database/models/appointment";
import Therapist from "../database/models/therapist";
import Patient from "../database/models/patient";
import { createAppointmentAvailableSlot } from "./appointmentSlotsController";
import AppointmentAvailableSlots from "../database/models/appointmentAvailableSlots";
import User from "../database/models/user";

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
      appointmentSlot,
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
      !appointmentSlot ||
      !status
    ) {
      return res.status(400).json({ message: "Missing parameter(s)!" });
    }
    const slot = await AppointmentAvailableSlots.findByPk(appointmentSlot);
    if (!slot) {
      return res.status(404).json({ message: "Slot not found" });
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
    await slot.destroy();
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

// Get all appointments for particular therapist
export const getTherapistAppointments = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { therapistId } = req.params;
    if (!therapistId) {
      return res
        .status(400)
        .json({ message: "Missing therapist ID parameter(s)!" });
    }
    const appointments = await Appointment.findAll({
      where: { therapistId },
      include: [
        {
          model: Therapist,
          as: "therapist",
          include: [{ model: User, as: "user" }],
        },
        {
          model: Patient,
          as: "patient",
          include: [{ model: User, as: "user" }],
        },
      ],
    });
    if (appointments) {
      return res.status(200).json(appointments);
    } else {
      return res.status(404).json({ message: "Appointments not found" });
    }
  } catch (error) {
    next(error);
  }
};

// Get all appointments for particular patient
export const getPatientAppointments = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { patientId } = req.params;
    if (!patientId) {
      return res
        .status(400)
        .json({ message: "Missing patient ID parameter(s)!" });
    }
    const appointments = await Appointment.findAll({
      where: { patientId },
      include: [
        {
          model: Therapist,
          as: "therapist",
          include: [{ model: User, as: "user" }],
        },
        {
          model: Patient,
          as: "patient",
          include: [{ model: User, as: "user" }],
        },
      ],
    });
    if (appointments) {
      return res.status(200).json(appointments);
    } else {
      return res.status(404).json({ message: "Appointments not found" });
    }
  } catch (error) {
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
