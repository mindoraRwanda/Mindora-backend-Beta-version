import { Router } from "express";
import {
  createCommunityPost,
  getCommunityPosts,
  getCommunityPostById,
  updateCommunityPost,
  deleteCommunityPost,
} from "../controllers/communityPostController";
import { uploadGeneral } from "../config/multerConfig";
import { authorize } from "../middleware/rbac.middleware";

const router = Router();

// Create a new community post
router.post(
  "/posts",
  authorize("create_post"),
  uploadGeneral.array("attachments", 5),
  createCommunityPost
);

// Get all community posts
router.get("/posts", authorize("get_posts"), getCommunityPosts);

// Get a specific community post by ID
router.get("/posts/:id", authorize("get_post"), getCommunityPostById);

// Update a specific community post by ID
router.put(
  "/posts/:id",
  authorize("update_post"),
  uploadGeneral.array("attachments", 5),
  updateCommunityPost
);

// Delete a specific community post by ID
router.delete("/posts/:id", authorize("delete_post"), deleteCommunityPost);

export default router;
