// src/routes/systemConfigurationRoutes.ts

import { Router } from 'express';
import {
  createOrUpdateConfiguration,
  deleteConfiguration,
  getConfiguration,
  getAllConfigurations
} from '../controllers/systemConfigurationController';

const router = Router();

router.post('/', createOrUpdateConfiguration);
router.delete('/', deleteConfiguration);
router.get('/', getConfiguration);
router.get('/all', getAllConfigurations);

export default router;
