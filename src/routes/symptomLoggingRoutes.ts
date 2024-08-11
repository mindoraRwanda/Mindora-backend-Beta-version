import express from "express";
import {
  addSymptoms,
  getSymptoms,
} from "../controllers/symptomLoggingController";

const router = express.Router();

router.post("/add_symptom", addSymptoms);
router.get("/get_symptoms/:userId", getSymptoms);

export default router;
