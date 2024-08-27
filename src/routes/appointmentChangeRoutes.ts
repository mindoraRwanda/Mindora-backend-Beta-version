import { Router } from "express";
import {
  createAppointmentChange,
  getAppointmentChangeById,
  updateAppointmentChange,
  deleteAppointmentChange,
  getAllAppointmentChanges,
} from "../controllers/appointmentChangeController";

const router = Router();

// Create a new appointment change
router.post("/appointment_changes", createAppointmentChange);

// Get an appointment change by ID
router.get("/appointment_changes/:id", getAppointmentChangeById);

// Update an appointment change
router.put("/appointment_changes/:id", updateAppointmentChange);

// Delete an appointment change
router.post("/appointment_changes/:id", deleteAppointmentChange);

// Get all appointment changes
router.get("/appointment_changes", getAllAppointmentChanges);

export default router;
