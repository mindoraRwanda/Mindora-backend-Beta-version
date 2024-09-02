import { Router } from "express";
import {
  createCommunityModerationAction,
  getCommunityModerationActions,
  getCommunityModerationActionById,
  updateCommunityModerationAction,
  deleteCommunityModerationAction,
} from "../controllers/communityModerationController";

const router: Router = Router();

router.post("/community/moderation-actions", createCommunityModerationAction);
router.get("/community/moderation-actions", getCommunityModerationActions);
router.get(
  "/community/moderation-actions/:id",
  getCommunityModerationActionById
);
router.put(
  "/community/moderation-actions/:id",
  updateCommunityModerationAction
);
router.delete(
  "/community/moderation-actions/:id",
  deleteCommunityModerationAction
);

export default router;
