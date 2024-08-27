import { Request, Response, NextFunction } from "express";
import Chat from "../database/models/chat";
import ChatMembers from "../database/models/chatMember";

// Create a new chat
export const createChat = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { chatName, lastMessageId } = req.body;
    if (!chatName) {
      return res.status(400).json({ message: "Missing parameter(s)!" });
    }

    const chat = await Chat.create({
      chatName,
      lastMessageId,
    });
    res.status(201).json(chat);
  } catch (error) {
    next(error);
  }
};

// Get all chats
export const getChats = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const chats = await Chat.findAll();
    if (!chats.length) {
      return res.status(404).json({ message: "No chats found!" });
    }
    res.status(200).json(chats);
  } catch (error) {
    next(error);
  }
};

// Get all chats a user is part of by userId
export const getChatsByUserId = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { userId } = req.params;

    if (!userId) {
      return res.status(400).json({ message: "Missing userId parameter!" });
    }

    const chatMemberships = await Chat.findAll({
      include: [
        {
          model: ChatMembers,
          as: "participants",
          where: { userId },
        },
      ],
    });

    if (chatMemberships.length > 0) {
      return res.status(200).json(chatMemberships);
    } else {
      return res.status(404).json({ message: "No chats found for this user" });
    }
  } catch (error) {
    next(error);
  }
};

// Get a single chat by ID
export const getChatById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ message: "Missing parameter(s)!" });
    }

    const chat = await Chat.findByPk(id);
    if (chat) {
      res.status(200).json(chat);
    } else {
      return res.status(404).json({ message: "Chat not found" });
    }
  } catch (error) {
    next(error);
  }
};

// Update a chat
export const updateChat = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const data = req.body;

    if (!id || !data) {
      return res.status(400).json({ message: "Missing parameter(s)!" });
    }

    const chat = await Chat.findByPk(id);
    if (chat) {
      await chat.update(data);
      res.status(200).json(chat);
    } else {
      return res.status(404).json({ message: "Chat not found" });
    }
  } catch (error) {
    next(error);
  }
};

// Delete a chat
export const deleteChat = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ message: "Missing parameter(s)!" });
    }

    const chat = await Chat.findByPk(id);
    if (chat) {
      await chat.destroy();
      res.status(204).json();
    } else {
      return res.status(404).json({ message: "Chat not found" });
    }
  } catch (error) {
    next(error);
  }
};
