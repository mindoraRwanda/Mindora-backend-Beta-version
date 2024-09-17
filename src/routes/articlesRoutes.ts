import { Router } from "express";
import {
  createArticle,
  getArticles,
  getArticleById,
  updateArticle,
  deleteArticle,
} from "../controllers/articlesController";
import { uploadGeneral } from "../config/multerConfig";

const router = Router();

router.post(
  "/articles",
  uploadGeneral.fields([{ name: "file" }, { name: "picture" }]),
  createArticle
);
router.get("/articles/courses/:courseId", getArticles);
router.get("/articles/:id", getArticleById);
router.put(
  "/articles/:id",
  uploadGeneral.fields([{ name: "file" }, { name: "picture" }]),
  updateArticle
);
router.delete("/articles/:id", deleteArticle);

export default router;
