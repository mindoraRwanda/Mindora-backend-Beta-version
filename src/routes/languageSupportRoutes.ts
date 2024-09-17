import { Router } from "express";
import {
  createLanguageSupport,
  getAllLanguagesSupport,
  getLanguageSupportById,
  updateLanguageSupport,
  deleteLanguageSupport,
} from "../controllers/languageSupportController";

const router = Router();

router.post("/languages", createLanguageSupport);
router.get("/languages", getAllLanguagesSupport);
router.get("/languages/:id", getLanguageSupportById);
router.put("/languages/:id", updateLanguageSupport);
router.delete("/languages/:id", deleteLanguageSupport);

export default router;
