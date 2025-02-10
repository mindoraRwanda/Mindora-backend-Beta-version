import { Router } from "express";
import {
  createAppointmentAvailableSlot,
  getAllAppointmentAvailableSlots,
  getAppointmentAvailableSlotById,
  updateAppointmentAvailableSlot,
  deleteAppointmentAvailableSlot,
  getTherapistSlots,
} from "../controllers/appointmentSlotsController";
import { authorize } from "../middleware/rbac.middleware";

const router = Router();

router.post(
  "/appointment_available_slots",
  authorize("create_appointment_slot"),
  createAppointmentAvailableSlot
);
router.get(
  "/appointment_available_slots",
  authorize("get_appointment_slots"),
  getAllAppointmentAvailableSlots
);
router.get(
  "/appointment_available_slots/therapists/:therapistId",
  authorize("get_therapist_appointment_slots"),
  getTherapistSlots
);
router.get(
  "/appointment_available_slots/:id",
  authorize("get_appointment_slot"),
  getAppointmentAvailableSlotById
);
router.put(
  "/appointment_available_slots/:id",
  authorize("update_appointment_slot"),
  updateAppointmentAvailableSlot
);
router.delete(
  "/appointment_available_slots/:id",
  authorize("delete_appointment_slot"),
  deleteAppointmentAvailableSlot
);

export default router;
