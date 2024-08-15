// src/routes/appointmentRoutes.ts

import { Router } from 'express';
import {
  createAppointmentController,
  updateAppointmentController,
  deleteAppointmentController,
  getAppointmentsController
} from '../controllers/appointmentController';

const router = Router();

router.post('/createAppointment', createAppointmentController);
router.put('/', updateAppointmentController);
router.delete('/', deleteAppointmentController);
router.get('/', getAppointmentsController);

export default router;
