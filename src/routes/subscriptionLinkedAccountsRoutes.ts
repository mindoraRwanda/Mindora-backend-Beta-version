import { Router } from "express";
import {
  createSubscriptionLinkedAccount,
  getSubscriptionLinkedAccounts,
  getSubscriptionLinkedAccountById,
  updateSubscriptionLinkedAccount,
  deleteSubscriptionLinkedAccount,
} from "../controllers/subscriptionLinkedAccountController";

const router = Router();

router.post("/subscription-linked-accounts", createSubscriptionLinkedAccount);
router.get(
  "/subscription-linked-accounts/subscriptions/:subscriptionId",
  getSubscriptionLinkedAccounts
);
router.get(
  "/subscription-linked-accounts/:id",
  getSubscriptionLinkedAccountById
);
router.put(
  "/subscription-linked-accounts/:id",
  updateSubscriptionLinkedAccount
);
router.delete(
  "/subscription-linked-accounts/:id",
  deleteSubscriptionLinkedAccount
);

export default router;
