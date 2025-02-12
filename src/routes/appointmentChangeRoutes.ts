import { Router } from "express";
import {
  createAppointmentChange,
  getAppointmentChangeById,
  updateAppointmentChange,
  deleteAppointmentChange,
  getAllAppointmentChanges,
  getAppointmentChangesByRole,
} from "../controllers/appointmentChangeController";
import { authorize } from "../middleware/rbac.middleware";

const router = Router();

// Create a new appointment change
router.post(
  "/appointment_changes",
  authorize("create_appointment_change"),
  createAppointmentChange
);

// Get an appointment change by ID
router.get(
  "/appointment_changes/:id",
  authorize("get_appointment_change"),
  getAppointmentChangeById
);
router.get("/appointments/changes/:roleId", getAppointmentChangesByRole);
// Update an appointment change
router.put(
  "/appointment_changes/:id",
  authorize("update_appointment_change"),
  updateAppointmentChange
);

// Delete an appointment change
router.delete(
  "/appointment_changes/:id",
  authorize("delete_appointment_change"),
  deleteAppointmentChange
);

// Get all appointment changes
router.get(
  "/appointment_changes",
  authorize("get_appointment_changes"),
  getAllAppointmentChanges
);

export default router;
