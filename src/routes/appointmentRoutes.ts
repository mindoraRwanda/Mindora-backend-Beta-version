import { Router } from "express";
import {
  createAppointment,
  getAppointments,
  getAppointmentById,
  updateAppointment,
  deleteAppointment,
  getTherapistAppointments,
  getPatientAppointments,
} from "../controllers/appointmentController";

const router = Router();

router.post("/appointments", createAppointment);
router.get("/appointments", getAppointments);
router.get("/therapists/:therapistId/appointments", getTherapistAppointments);
router.get("/patients/:patientId/appointments", getPatientAppointments);
router.get("/appointments/:id", getAppointmentById);
router.put("/appointments/:id", updateAppointment);
router.delete("/appointments/:id", deleteAppointment);

export default router;
