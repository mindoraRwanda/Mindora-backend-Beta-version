// src/routes/symptomLoggingRoutes.ts

import { Router } from 'express';
import { createSymptom, updateSymptom, deleteSymptom, getSymptom, getUserSymptoms } from '../controllers/symptomLoggingController';

const router = Router();

router.post('/', createSymptom);
router.put('/', updateSymptom);
router.delete('/', deleteSymptom);
router.get('/', getSymptom);
router.get('/user', getUserSymptoms);

export default router;
