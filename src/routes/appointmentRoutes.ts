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
import { authorize } from "../middleware/rbac.middleware";

const router = Router();

router.post(
  "/appointments",
  authorize("create_appointment"),
  createAppointment
);
router.get("/appointments", authorize("get_appointments"), getAppointments);
router.get(
  "/therapists/:therapistId/appointments",
  authorize("get_therapist_appointments"),
  getTherapistAppointments
);
router.get(
  "/patients/:patientId/appointments",
  authorize("get_patient_appointments"),
  getPatientAppointments
);
router.get(
  "/appointments/:id",
  authorize("get_appointment"),
  getAppointmentById
);
router.put(
  "/appointments/:id",
  authorize("update_appointment"),
  updateAppointment
);
router.delete(
  "/appointments/:id",
  authorize("delete_appointment"),
  deleteAppointment
);

export default router;
