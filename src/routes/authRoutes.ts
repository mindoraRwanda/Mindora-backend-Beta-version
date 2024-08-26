import express from 'express';
import { upload as multerUpload } from '../config/multerConfig';
import { adminSignUp, therapistSignUp, normalUserSignUp, login } from '../controllers/authController';

const router = express.Router();

router.post('/admin/signup', adminSignUp);
router.post('/therapist/signup', multerUpload.fields([
  { name: 'diploma', maxCount: 1 },
  { name: 'license', maxCount: 1 },
  { name: 'profilePicture', maxCount: 1 }
]), therapistSignUp);
router.post('/user/signup', multerUpload.single('profile_picture'), normalUserSignUp);
router.post('/login', login);

export default router;

