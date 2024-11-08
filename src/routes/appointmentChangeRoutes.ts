import { Router } from "express";
import {
  createAppointmentChange,
  getAppointmentChangeById,
  updateAppointmentChange,
  deleteAppointmentChange,
  getAllAppointmentChanges,
  getAppointmentChangesByRole,
} from "../controllers/appointmentChangeController";

const router = Router();

// Create a new appointment change
router.post("/appointment_changes", createAppointmentChange);

// Get an appointment change by ID
router.get("/appointment_changes/:id", getAppointmentChangeById);
router.get("/appointments/changes/:roleId", getAppointmentChangesByRole);
// Update an appointment change
router.put("/appointment_changes/:id", updateAppointmentChange);

// Delete an appointment change
router.delete("/appointment_changes/:id", deleteAppointmentChange);

// Get all appointment changes
router.get("/appointment_changes", getAllAppointmentChanges);

export default router;
