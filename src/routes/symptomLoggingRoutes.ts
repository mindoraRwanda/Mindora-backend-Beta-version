import express from "express";
import {
  addSymptoms,
  getSymptoms,
  updateSymptoms,
  deleteSymptoms,
} from "../controllers/symptomLoggingController";

const router = express.Router();

router.post("/add_symptom", addSymptoms);
router.get("/get_symptoms/:userId", getSymptoms);
router.post("/update_symptom/:id", updateSymptoms);
router.post("/delete_symptom/:id", deleteSymptoms);

export default router;
