import { Router } from 'express';
import { createProfile, getProfile, updateProfile } from '../controllers/medicalProfileController';
import authMiddleware from '../middleware/authMiddleware';

const router = Router();

router.post('/profile', authMiddleware, createProfile);
router.get('/profile', authMiddleware, getProfile);
router.put('/profile', authMiddleware, updateProfile);

export default router;
