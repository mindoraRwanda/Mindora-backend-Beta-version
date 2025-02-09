import { Router } from "express";
import {
  createAppointmentAvailableSlot,
  getAllAppointmentAvailableSlots,
  getAppointmentAvailableSlotById,
  updateAppointmentAvailableSlot,
  deleteAppointmentAvailableSlot,
  getTherapistSlots,
} from "../controllers/appointmentSlotsController";

const router = Router();

router.post("/appointment_available_slots", createAppointmentAvailableSlot);
router.get("/appointment_available_slots", getAllAppointmentAvailableSlots);
router.get(
  "/appointment_available_slots/therapists/:therapistId",
  getTherapistSlots
);
router.get("/appointment_available_slots/:id", getAppointmentAvailableSlotById);
router.put("/appointment_available_slots/:id", updateAppointmentAvailableSlot);
router.delete(
  "/appointment_available_slots/:id",
  deleteAppointmentAvailableSlot
);

export default router;
