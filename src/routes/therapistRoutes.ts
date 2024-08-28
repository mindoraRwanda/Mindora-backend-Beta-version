import express from "express";
import {
  createTherapist,
  getTherapistById,
  getAllTherapists,
  updateTherapist,
  deleteTherapist,
} from "../controllers/therapistController";

const router = express.Router();

router.post("/therapists", createTherapist);
router.get("/therapists/:id", getTherapistById);
router.get("/therapists", getAllTherapists);
router.put("/therapists/:id", updateTherapist);
router.delete("/therapists/:id", deleteTherapist);

export default router;
