import { Router } from "express";
import {
  createSupportCommunity,
  getSupportCommunities,
  getUserSupportCommunities,
  getSupportCommunityById,
  updateSupportCommunity,
  deleteSupportCommunity,
} from "../controllers/supportCommunityController";
import { uploadProfilePic } from "../config/multerConfig";
import { authorize } from "../middleware/rbac.middleware";

const router = Router();

// Route to create a new support community
router.post(
  "/support-communities",
  authorize("create_community"),
  uploadProfilePic.single("profile"),
  createSupportCommunity
);

// Route to get all support communities
router.get(
  "/support-communities",
  authorize("get_communities"),
  getSupportCommunities
);

// Route to get all support communities for specific user
router.get(
  "/support-communities/user/:userId",
  authorize("get_user_communities"),
  getUserSupportCommunities
);

// Route to get a specific support community by ID
router.get(
  "/support-communities/:id",
  authorize("get_community"),
  getSupportCommunityById
);

// Route to update a specific support community by ID
router.put(
  "/support-communities/:id",
  authorize("update_community"),
  uploadProfilePic.single("profile"),
  updateSupportCommunity
);

// Route to delete a specific support community by ID
router.delete(
  "/support-communities/:id",
  authorize("delete_community"),
  deleteSupportCommunity
);

export default router;
