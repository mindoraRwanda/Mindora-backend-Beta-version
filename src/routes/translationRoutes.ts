import { Router } from "express";
import {
  createTranslation,
  getAllTranslations,
  getLanguageTranslations,
  getTranslationById,
  updateTranslation,
  deleteTranslation,
} from "../controllers/translationController";

const router = Router();

router.post("/translations", createTranslation);
router.get("/translations", getAllTranslations);
router.get("/translations/language/:languageId", getLanguageTranslations);
router.get("/translations/:id", getTranslationById);
router.put("/translations/:id", updateTranslation);
router.delete("/translations/:id", deleteTranslation);

export default router;
