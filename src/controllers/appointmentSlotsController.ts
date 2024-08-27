import { Request, Response, NextFunction } from "express";
import AppointmentAvailableSlots from "../database/models/appointmentAvailableSlots";
import Therapist from "../database/models/therapist";

export const createAppointmentAvailableSlot = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const {
      therapistId,
      availableDay,
      startTime,
      endTime,
      recurring,
      date,
      timeZone,
    } = req.body;
    if (
      !therapistId ||
      !availableDay ||
      !startTime ||
      !endTime ||
      recurring === null ||
      !timeZone
    ) {
      return res.status(400).json({ message: "Missing parameter(s)!" });
    }

    const newSlot = await AppointmentAvailableSlots.create({
      therapistId,
      availableDay,
      startTime,
      endTime,
      recurring,
      date,
      timeZone,
    });

    return res.status(201).json(newSlot);
  } catch (error) {
    next(error);
  }
};

export const getAllAppointmentAvailableSlots = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const slots = await AppointmentAvailableSlots.findAll({
      include: [
        {
          model: Therapist,
          as: "therapist",
          attributes: { exclude: ["createdAt", "updatedAt"] },
        },
      ],
    });
    if (!slots) {
      return res.status(404).json({ message: "Slots not found" });
    }
    return res.status(200).json(slots);
  } catch (error) {
    next(error);
  }
};

export const getAppointmentAvailableSlotById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ message: "Missing parameter(s)!" });
    }
    const slot = await AppointmentAvailableSlots.findByPk(id, {
      include: [
        {
          model: Therapist,
          as: "therapist",
          attributes: { exclude: ["createdAt", "updatedAt"] },
        },
      ],
    });

    if (!slot) {
      return res.status(404).json({ message: "Slot not found" });
    }

    return res.status(200).json(slot);
  } catch (error) {
    next(error);
  }
};

export const updateAppointmentAvailableSlot = async (
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

    const slot = await AppointmentAvailableSlots.findByPk(id);
    if (!slot) {
      return res.status(404).json({ message: "Slot not found" });
    }

    await slot.update(data);

    return res.status(200).json(slot);
  } catch (error) {
    next(error);
  }
};

export const deleteAppointmentAvailableSlot = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ message: "Missing parameter(s)!" });
    }
    const slot = await AppointmentAvailableSlots.findByPk(id);
    if (!slot) {
      return res.status(404).json({ message: "Slot not found" });
    }

    await slot.destroy();
    return res.status(204).json();
  } catch (error) {
    next(error);
  }
};
