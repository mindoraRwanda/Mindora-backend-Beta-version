import { Router } from "express";
import {
  createInsuranceServiceCoverage,
  getInsuranceServiceCoverages,
  getInsuranceServiceCoverageById,
  updateInsuranceServiceCoverage,
  deleteInsuranceServiceCoverage,
} from "../controllers/insuranceServiceCoverageController";

const router = Router();

router.post("/insurance-service-coverages", createInsuranceServiceCoverage);
router.get("/insurance-service-coverages", getInsuranceServiceCoverages);
router.get("/insurance-service-coverages/:id", getInsuranceServiceCoverageById);
router.put("/insurance-service-coverages/:id", updateInsuranceServiceCoverage);
router.delete(
  "/insurance-service-coverages/:id",
  deleteInsuranceServiceCoverage
);

export default router;
