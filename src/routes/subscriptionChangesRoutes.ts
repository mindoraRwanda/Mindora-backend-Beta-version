import express from "express";
import {
  createSubscriptionChange,
  getSubscriptionChanges,
  getSubscriptionChangeById,
  updateSubscriptionChange,
  deleteSubscriptionChange,
} from "../controllers/subscriptionChangeController";

const router = express.Router();

router.post("/subscription-changes", createSubscriptionChange);
router.get("/subscription-changes", getSubscriptionChanges);
router.get("/subscription-changes/:id", getSubscriptionChangeById);
router.put("/subscription-changes/:id", updateSubscriptionChange);
router.delete("/subscription-changes/:id", deleteSubscriptionChange);

export default router;
