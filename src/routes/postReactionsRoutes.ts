import { Router } from "express";
import {
  createOrUpdatePostReaction,
  getPostReactions,
  getCommentReactions,
  getPostReactionById,
  updatePostReaction,
  deletePostReaction,
} from "../controllers/postReactionController";

const router = Router();

// Route to create or update a post reaction
router.post("/post/reactions", createOrUpdatePostReaction);
router.get("/post/reactions/all/:postId", getPostReactions);
router.get("/post/comments/reactions/:commentId", getCommentReactions);
router.get("/post/reactions/:id", getPostReactionById);
router.put("/post/reactions/:id", updatePostReaction);
router.delete("/post/reactions/:id", deletePostReaction);

export default router;
