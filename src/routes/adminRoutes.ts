import { Router } from 'express';
import { deleteUserAccount, toggleTherapistApproval } from '../controllers/adminController';
import { normalUserSignUp } from '../controllers/authController';
import { upload } from '../config/multerConfig';
import { updateUserAccount } from '../controllers/adminController';

const router = Router();

router.post('/therapist-approval', toggleTherapistApproval);
router.post('/admin/users',upload.single('profile_picture'), normalUserSignUp)
router.put('/admin/users',updateUserAccount)
router.delete('/admin/users',deleteUserAccount)
export default router;
