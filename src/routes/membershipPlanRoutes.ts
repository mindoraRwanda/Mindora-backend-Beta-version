import express from "express";
import {
  createMembershipPlan,
  getMembershipPlans,
  getMembershipPlanById,
  updateMembershipPlan,
  deleteMembershipPlan,
} from "../controllers/membershipPlanController";

const router = express.Router();

router.post("/membership-plans", createMembershipPlan);
router.get("/membership-plans", getMembershipPlans);
router.get("/membership-plans/:id", getMembershipPlanById);
router.put("/membership-plans/:id", updateMembershipPlan);
router.delete("/membership-plans/:id", deleteMembershipPlan);

export default router;
