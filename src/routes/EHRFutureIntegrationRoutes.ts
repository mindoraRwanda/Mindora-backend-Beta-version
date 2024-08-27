import { Router } from "express";
import {
  createFutureIntegration,
  getFutureIntegrations,
  getFutureIntegrationById,
  updateFutureIntegration,
  deleteFutureIntegration,
} from "../controllers/EHRFutureIntegrationController";

const router = Router();

router.post("/future_integrations", createFutureIntegration);
router.get("/future_integrations", getFutureIntegrations);
router.get("/future_integrations/:id", getFutureIntegrationById);
router.put("/future_integrations/:id", updateFutureIntegration);
router.delete("/future_integrations/:id", deleteFutureIntegration);

export default router;
