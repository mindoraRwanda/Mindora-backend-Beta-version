import { Router } from "express";
import {
  createBillingReport,
  getBillingReports,
  getBillingReportById,
  updateBillingReport,
  deleteBillingReport,
} from "../controllers/billingReportController";

const router = Router();

router.post("/billing-reports", createBillingReport);
router.get("/billing-reports", getBillingReports);
router.get("/billing-reports/:id", getBillingReportById);
router.put("/billing-reports/:id", updateBillingReport);
router.delete("/billing-reports/:id", deleteBillingReport);

export default router;
