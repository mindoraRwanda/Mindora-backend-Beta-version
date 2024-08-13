import { Router } from 'express';
import { toggleTherapistApproval } from '../controllers/adminController';

const router = Router();

router.post('/therapist-approval', toggleTherapistApproval);

export default router;
