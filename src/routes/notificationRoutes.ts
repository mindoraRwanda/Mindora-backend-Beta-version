// src/routes/notificationRoutes.ts

import { Router } from 'express';
import {
  createNotificationController,
  updateNotificationController,
  deleteNotificationController,
  getNotificationsController
} from '../controllers/notificationController';

const router = Router();

router.post('/', createNotificationController);
router.put('/', updateNotificationController);
router.delete('/', deleteNotificationController);
router.get('/', getNotificationsController);

export default router;
