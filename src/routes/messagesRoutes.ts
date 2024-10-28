import { Router } from "express";
import {
  createMessage,
  getMessages,
  getMessageById,
  updateMessage,
  deleteMessage,
  getMessagesByChatId,
  createMsg,
} from "../controllers/messageController";
import { uploadGeneral } from "../config/multerConfig";

const router = Router();

router.post("/messages", uploadGeneral.array("attachments"), createMessage);
router.post("/message", createMsg);
router.get("/messages", getMessages);
router.get("/messages/:id", getMessageById);
router.put("/messages/:id", updateMessage);
router.delete("/messages/:id", deleteMessage);
router.get("/chats/:chatId/messages", getMessagesByChatId);

export default router;
