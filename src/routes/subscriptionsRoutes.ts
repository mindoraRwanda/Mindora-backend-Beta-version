import express from "express";
import {
  createSubscription,
  getSubscriptions,
  getSubscriptionByUserId,
  getSubscriptionById,
  updateSubscription,
  deleteSubscription,
} from "../controllers/subscriptionsController";

const router = express.Router();

router.post("/subscriptions", createSubscription);
router.get("/subscriptions", getSubscriptions);
router.get("/subscriptions/users/:userId", getSubscriptionByUserId);
router.get("/subscriptions/:id", getSubscriptionById);
router.put("/subscriptions/:id", updateSubscription);
router.delete("/subscriptions/:id", deleteSubscription);

export default router;
