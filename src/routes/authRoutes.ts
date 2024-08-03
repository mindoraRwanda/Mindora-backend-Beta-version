import express from 'express';
import { adminSignUp, therapistSignUp, normalUserSignUp, login } from '../controllers/authController';

const router = express.Router();

router.post('/signup/admin', adminSignUp);
router.post('/signup/therapist', therapistSignUp);
router.post('/signup/user', normalUserSignUp);
router.post('/login', login);

export default router;
