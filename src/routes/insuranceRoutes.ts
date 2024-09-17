import { Router } from "express";
import {
  createInsurance,
  getInsuranceById,
  getUserInsurances,
  getInsurances,
  updateInsurance,
  deleteInsurance,
} from "../controllers/insurancesController";
import { uploadGeneral } from "../config/multerConfig";

const router = Router();

router.post("/insurances", uploadGeneral.single("contract"), createInsurance);
router.get("/insurances", getInsurances);
router.get("/insurances/user/:userId", getUserInsurances);
router.get("/insurances/:id", getInsuranceById);
router.put(
  "/insurances/:id",
  uploadGeneral.single("contract"),
  updateInsurance
);
router.delete("/insurances/:id", deleteInsurance);

export default router;
