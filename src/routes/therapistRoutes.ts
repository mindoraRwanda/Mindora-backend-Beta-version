import express from "express";
import {
  createTherapist,
  getTherapistById,
  getAllTherapists,
  updateTherapist,
  deleteTherapist,
  therapistPatients,
} from "../controllers/therapistController";
import { uploadGeneral } from "../config/multerConfig";

const router = express.Router();

router.post(
  "/therapists",
  uploadGeneral.fields([
    { name: "diploma", maxCount: 1 },
    { name: "license", maxCount: 1 },
  ]),
  createTherapist
);
router.get("/therapists/:id", getTherapistById);
router.get("/therapists/:therapistId/patients", therapistPatients);
router.get("/therapists", getAllTherapists);
router.put(
  "/therapists/:id",
  uploadGeneral.fields([
    { name: "diploma", maxCount: 1 },
    { name: "license", maxCount: 1 },
  ]),
  updateTherapist
);
router.delete("/therapists/:id", deleteTherapist);

export default router;
