import { Router } from "express";
import {
  createChat,
  getChats,
  getChatById,
  getChatsByUserId,
  updateChat,
  deleteChat,
} from "../controllers/chatController";

const router = Router();

router.post("/chats", createChat);
router.get("/chats", getChats);
router.get("/chats/:id", getChatById);
router.get("/chats/:userId", getChatsByUserId);
router.put("/chats/:id", updateChat);
router.delete("/chats/:id", deleteChat);

export default router;
