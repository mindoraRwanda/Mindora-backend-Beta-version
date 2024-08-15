// src/controllers/appointmentController.ts

import { Request, Response } from 'express';
import { createAppointment, updateAppointment, deleteAppointment, getAppointments } from '../models/Appointment';

export const createAppointmentController = async (req: Request, res: Response) => {
  const { userId, providerId, appointmentTime, status } = req.body;

  if (!userId || !providerId || !appointmentTime) {
    return res.status(400).json({ error: "Missing parameter(s)!" });
  }

  try {
    const newAppointment = await createAppointment({
      userId,
      providerId,
      appointmentTime,
      status
    });
    res.status(201).json(newAppointment);
  } catch (err) {
    console.error('Error creating appointment:', err);
    res.status(500).json({ error: "Error occurred while creating appointment!" });
  }
};

export const updateAppointmentController = async (req: Request, res: Response) => {
  const { id, ...updateData } = req.body;

  if (!id) {
    return res.status(400).json({ error: "Missing parameter(s)!" });
  }

  try {
    const updatedAppointment = await updateAppointment(id, updateData);
    if (!updatedAppointment) {
      return res.status(404).json({ error: "Appointment not found or not updated." });
    }
    res.status(200).json(updatedAppointment);
  } catch (err) {
    console.error('Error updating appointment:', err);
    res.status(500).json({ error: "Error occurred while updating appointment!" });
  }
};

export const deleteAppointmentController = async (req: Request, res: Response) => {
  const { id } = req.body;

  if (!id) {
    return res.status(400).json({ error: "Missing parameter(s)!" });
  }

  try {
    const deletedAppointment = await deleteAppointment(id);
    if (!deletedAppointment) {
      return res.status(404).json({ error: "Appointment not found or not deleted." });
    }
    res.status(200).json(deletedAppointment);
  } catch (err) {
    console.error('Error deleting appointment:', err);
    res.status(500).json({ error: "Error occurred while deleting appointment!" });
  }
};

export const getAppointmentsController = async (req: Request, res: Response) => {
  const userId = parseInt(req.query.userId as string, 10);

  if (isNaN(userId)) {
    return res.status(400).json({ error: "Invalid userId parameter!" });
  }

  try {
    const appointments = await getAppointments(userId);
    res.status(200).json(appointments);
  } catch (err) {
    console.error('Error retrieving appointments:', err);
    res.status(500).json({ error: "Error while retrieving appointments!" });
  }
};
