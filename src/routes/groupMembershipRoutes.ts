// src/routes/groupMembershipRoutes.ts

import { Router } from 'express';
import {
  createGroupMembershipController,
  updateGroupMembershipController,
  deleteGroupMembershipController,
  getGroupMembershipsController
} from '../controllers/groupMembershipController';

const router = Router();

router.post('/', createGroupMembershipController);
router.put('/', updateGroupMembershipController);
router.delete('/', deleteGroupMembershipController);
router.get('/', getGroupMembershipsController);

export default router;
