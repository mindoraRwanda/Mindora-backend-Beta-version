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
import { authorize } from "../middleware/rbac.middleware";

const router = express.Router();

router.post(
  "/therapists",
  authorize("create_therapist"),
  uploadGeneral.fields([
    { name: "diploma", maxCount: 1 },
    { name: "license", maxCount: 1 },
  ]),
  createTherapist
);
router.get("/therapists/:id", authorize("get_therapist"), getTherapistById);
router.get(
  "/therapists/:therapistId/patients",
  authorize("get_therapist_patients"),
  therapistPatients
);
router.get("/therapists", authorize("get_therapists"), getAllTherapists);
router.put(
  "/therapists/:id",
  authorize("update_therapist"),
  uploadGeneral.fields([
    { name: "diploma", maxCount: 1 },
    { name: "license", maxCount: 1 },
  ]),
  updateTherapist
);
router.delete(
  "/therapists/:id",
  authorize("delete_therapist"),
  deleteTherapist
);

export default router;
