import { Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";
import { createChatRoom } from "../models/Chat";

export const createChat = async (req: Request, res: Response) => {
  const chatData = req.body;
  console.log(chatData);
  if (!chatData) {
    return res.status(400).json({ Error: "Missing parameter(s)!" });
  }

  // Generate a unique chat identifier
  const uniqueId = uuidv4();
  try {
    const savedChat = await createChatRoom({
      ...chatData,
      id: uniqueId,
    });
    if (!savedChat) {
      return res.status(500).json({ Error: "Failed to save the chat in db" });
    }

    return res.status(201).json(savedChat);
  } catch (err) {
    console.error("Error while saving chat:", err);
    return res.status(500).json({ Error: "Error while saving chat!" });
  }
};
