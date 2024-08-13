import express from 'express';
import { adminSignUp, therapistSignUp, normalUserSignUp, login } from '../controllers/authController';
import { upload } from '../config/multerConfig';

const router = express.Router();

router.post('/signup/admin', adminSignUp);
router.post('/signup/therapist', therapistSignUp);
router.post('/signup/user', upload.single('profile_picture'), normalUserSignUp);
router.post('/login', login);

export default router;
