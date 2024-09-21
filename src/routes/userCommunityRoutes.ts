import express from "express";
import {
  createUserCommunity,
  getUserCommunity,
  getUserCommunities,
  updateUserCommunity,
  deleteUserCommunity,
} from "../controllers/userCommunityController";

const router = express.Router();

router.post("/user-communities", createUserCommunity);
router.get("/user-communities/:communityId/:userId", getUserCommunity);
router.get("/user-communities/:userId", getUserCommunities);
router.put("/user-communities/:communityId/:userId", updateUserCommunity);
router.delete("/user-communities/:communityId/:userId", deleteUserCommunity);

export default router;
