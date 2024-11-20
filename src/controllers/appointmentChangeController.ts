import { Request, Response, NextFunction } from "express";
import AppointmentChange from "../database/models/appointmentChanges";
import User from "../database/models/user";
import Appointment from "../database/models/appointment";
import { Op } from "sequelize";
import Patient from "../database/models/patient";
import Therapist from "../database/models/therapist";

interface AppointmentChangeResult extends AppointmentChange {
  cancelledBy?: User;
}

interface AppointmentResult extends Appointment {
  appointmentChanges?: AppointmentChangeResult[];
}

// Create a new appointment change
export async function createAppointmentChange(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const {
      appointmentId,
      newStartTime,
      newEndTime,
      reason,
      action,
      actionBy,
      actionTime,
    } = req.body;
    if (!appointmentId || !reason || !action || !actionBy || !actionTime) {
      return res.status(400).json({ message: "Missing parameter(s)!" });
    }
    const appointmentChange = await AppointmentChange.create({
      appointmentId,
      newStartTime,
      newEndTime,
      reason,
      action,
      actionBy,
      actionTime,
    });
    return res.status(201).json(appointmentChange);
  } catch (error) {
    next(error);
  }
}

// Get an appointment change by ID
export async function getAppointmentChangeById(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ message: "Missing parameter(s)!" });
    }
    const appointmentChange = await AppointmentChange.findByPk(id, {
      include: [
        { model: User, as: "changedBy", attributes: { exclude: ["password"] } },
      ],
    });

    if (!appointmentChange) {
      return res.status(404).json({ message: "Appointment change not found" });
    }

    return res.status(200).json(appointmentChange);
  } catch (error) {
    next(error);
  }
}

// Update an appointment change
export async function updateAppointmentChange(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { id } = req.params;
    const data = req.body;
    if (!id || !data) {
      return res.status(400).json({ message: "Missing parameter(s)!" });
    }
    const appointmentChange = await AppointmentChange.findByPk(id);

    if (!appointmentChange) {
      return res.status(404).json({ message: "Appointment change not found" });
    }

    await appointmentChange.update(data);
    return res.status(200).json(appointmentChange);
  } catch (error) {
    next(error);
  }
}

// Delete an appointment change
export async function deleteAppointmentChange(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ message: "Missing parameter(s)!" });
    }
    const appointmentChange = await AppointmentChange.findByPk(id);

    if (!appointmentChange) {
      return res.status(404).json({ message: "Appointment change not found" });
    }

    await appointmentChange.destroy();
    return res.status(204).json();
  } catch (error) {
    next(error);
  }
}

// Get all appointment changes
export async function getAllAppointmentChanges(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const appointmentChanges = await AppointmentChange.findAll({
      include: [
        { model: User, as: "changedBy", attributes: { exclude: ["password"] } },
      ],
    });

    if (!appointmentChanges) {
      return res.status(404).json({ message: "Appointment change not found" });
    }
    return res.status(200).json(appointmentChanges);
  } catch (error) {
    next(error);
  }
}

// Function to find appointments by roleId without specifying the role attribute name
async function getAppointmentsChangeByUser(roleId: string) {
  const appointments: AppointmentResult[] = await Appointment.findAll({
    where: {
      [Op.or]: [{ patientId: roleId }, { therapistId: roleId }],
      status: "Canceled",
    },
    include: [
      {
        model: Patient,
        as: "patient",
        include: [
          { model: User, as: "user", attributes: { exclude: ["password"] } },
        ],
      },
      {
        model: Therapist,
        as: "therapist",
        include: [
          { model: User, as: "user", attributes: { exclude: ["password"] } },
        ],
      },
      {
        model: AppointmentChange,
        as: "appointmentChanges",
        include: [
          {
            model: User,
            as: "changedBy",
            attributes: [
              "id",
              "firstName",
              "lastName",
              "username",
              "profileImage",
            ],
          },
        ],
      },
    ],
  });

  return appointments.flatMap(
    (appointment) =>
      appointment.appointmentChanges?.map((change) => ({
        appointmentType: appointment.appointmentType,
        location: appointment.location,
        newStartTime: change.newStartTime || "",
        newEndTime: change.newEndTime || "",
        reason: change.reason,
        action: change.action,
        cancelledBy: {
          id: change.cancelledBy?.id,
          firstName: change.cancelledBy?.firstName,
          lastName: change.cancelledBy?.lastName,
          username: change.cancelledBy?.username,
          profileImage: change.cancelledBy?.profileImage,
        },
        cancelledTime: change.actionTime,
      })) || []
  );
}

export const getAppointmentChangesByRole = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { roleId } = req.params;

    if (!roleId) {
      return res.status(400).json({ message: "missing role ID" });
    }

    const cancelledAppointments = await getAppointmentsChangeByUser(roleId);

    if (cancelledAppointments.length === 0) {
      return res
        .status(404)
        .json({ message: "No cancelled appointments found" });
    }

    return res.status(200).json(cancelledAppointments);
  } catch (error) {
    next(error);
  }
};
