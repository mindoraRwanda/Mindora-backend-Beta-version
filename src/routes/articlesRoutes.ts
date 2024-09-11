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

router.post("/articles", uploadGeneral.single("file"), createArticle);
router.get("/articles/courses/:courseId", getArticles);
router.get("/articles/:id", getArticleById);
router.put("/articles/:id", uploadGeneral.single("file"), updateArticle);
router.delete("/articles/:id", deleteArticle);

export default router;
