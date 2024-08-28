import { Router } from "express";
import {
  createFutureIntegration,
  getFutureIntegrations,
  getFutureIntegrationById,
  updateFutureIntegration,
  deleteFutureIntegration,
} from "../controllers/EHRFutureIntegrationController";

const router = Router();

router.post("/future-integrations", createFutureIntegration);
router.get("/future-integrations", getFutureIntegrations);
router.get("/future-integrations/:id", getFutureIntegrationById);
router.put("/future-integrations/:id", updateFutureIntegration);
router.delete("/future-integrations/:id", deleteFutureIntegration);

export default router;
