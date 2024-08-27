import { Router } from "express";
import {
  createMessage,
  getMessages,
  getMessageById,
  updateMessage,
  deleteMessage,
  getMessagesByChatId,
} from "../controllers/messageController";

const router = Router();

router.post("/messages", createMessage);
router.get("/messages", getMessages);
router.get("/messages/:id", getMessageById);
router.put("/messages/:id", updateMessage);
router.delete("/messages/:id", deleteMessage);
router.get("/chats/:chatId/messages", getMessagesByChatId);

export default router;
