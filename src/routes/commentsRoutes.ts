import { Router } from "express";
import {
  createComment,
  getCommentById,
  updateComment,
  deleteComment,
  getComments,
} from "../controllers/commentsController";
import { uploadGeneral } from "../config/multerConfig";

const router = Router();

router.post(
  "/post/comments",
  uploadGeneral.array("attachments", 5),
  createComment
);
router.get("/post/comments/:id", getCommentById);
router.put(
  "/post/comments/:id",
  uploadGeneral.array("attachments", 5),
  updateComment
);
router.delete("/post/comments/:id", deleteComment);
router.get("/post/comments", getComments);

export default router;
