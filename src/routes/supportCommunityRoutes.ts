import { Router } from "express";
import {
  createSupportCommunity,
  getSupportCommunities,
  getUserSupportCommunities,
  getSupportCommunityById,
  updateSupportCommunity,
  deleteSupportCommunity,
} from "../controllers/supportCommunityController";

const router = Router();

// Route to create a new support community
router.post("/support-communities", createSupportCommunity);

// Route to get all support communities
router.get("/support-communities", getSupportCommunities);

// Route to get all support communities for specific user
router.get("/support-communities/user/:userId", getUserSupportCommunities);

// Route to get a specific support community by ID
router.get("/support-communities/:id", getSupportCommunityById);

// Route to update a specific support community by ID
router.put("/support-communities/:id", updateSupportCommunity);

// Route to delete a specific support community by ID
router.delete("/support-communities/:id", deleteSupportCommunity);

export default router;
