import { Router } from 'express';
import { toggleTherapistApproval } from '../controllers/adminController';
import { normalUserSignUp } from '../controllers/authController';
import { upload } from '../config/multerConfig';

const router = Router();

router.post('/therapist-approval', toggleTherapistApproval);
router.post('/admin/users',upload.single('profile_picture'), normalUserSignUp)
router.put('/admin/users',)
export default router;
