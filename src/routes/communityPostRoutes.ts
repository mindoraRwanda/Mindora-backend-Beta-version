import { Router } from "express";
import {
  createCommunityPost,
  getCommunityPosts,
  getCommunityPostById,
  updateCommunityPost,
  deleteCommunityPost,
} from "../controllers/communityPostController";
import { uploadGeneral } from "../config/multerConfig";

const router = Router();

// Create a new community post
router.post(
  "/posts",
  uploadGeneral.array("attachments", 5),
  createCommunityPost
);

// Get all community posts
router.get("/posts", getCommunityPosts);

// Get a specific community post by ID
router.get("/posts/:id", getCommunityPostById);

// Update a specific community post by ID
router.put(
  "/posts/:id",
  uploadGeneral.array("attachments", 5),
  updateCommunityPost
);

// Delete a specific community post by ID
router.delete("/posts/:id", deleteCommunityPost);

export default router;
