import { Router } from "express";
import {
  createChatMember,
  getChatMembers,
  getChatMemberById,
  updateChatMember,
  deleteChatMember,
} from "../controllers/chatMembersController";

const router = Router();

router.post("/chat_members", createChatMember);
router.get("/chat_members", getChatMembers);
router.get("/chat_members/:chatId", getChatMemberById);
router.put("/chat_members/:chatId/:userId", updateChatMember);
router.delete("/chat_members/:chatId/:userId", deleteChatMember);

export default router;
