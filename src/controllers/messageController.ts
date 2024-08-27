import { Request, Response, NextFunction } from "express";
import Message from "../database/models/message";
import User from "../database/models/user";

// create message
export const createMessage = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const {
      chatId,
      senderId,
      receiverId,
      messageType,
      messageText,
      mediaUrl,
      mediaSize,
      mediaDuration,
    } = req.body;

    if (!chatId || !senderId || !receiverId || !messageType) {
      return res.status(400).json({ message: "Missing required parameters!" });
    }

    const message = await Message.create({
      chatId,
      senderId,
      receiverId,
      messageType,
      messageText,
      mediaUrl,
      mediaSize,
      mediaDuration,
    });

    res.status(201).json(message);
  } catch (error) {
    next(error);
  }
};

// get all messages
export const getMessages = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const messages = await Message.findAll({
      include: [
        { model: User, as: "sender" }, // Include sender
        { model: User, as: "receiver" }, // Include receiver
      ],
      order: [["createdAt", "ASC"]], // or 'DESC' for descending order
    });
    res.status(200).json(messages);
  } catch (error) {
    next(error);
  }
};

// get chat conversation or chat specific messages
export const getMessagesByChatId = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { chatId } = req.params;

    if (!chatId) {
      return res.status(400).json({ message: "Missing chatId parameter!" });
    }

    const messages = await Message.findAll({
      where: { chatId },
      include: [
        { model: User, as: "sender" }, // Include sender
        { model: User, as: "receiver" }, // Include receiver
      ],
      order: [["createdAt", "ASC"]],
    });

    if (messages.length > 0) {
      return res.status(200).json(messages);
    } else {
      return res
        .status(404)
        .json({ message: "No messages found for this chat" });
    }
  } catch (error) {
    next(error);
  }
};

// get single message by its id
export const getMessageById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ message: "Missing ID parameter!" });
    }

    const message = await Message.findByPk(id);

    if (message) {
      return res.status(200).json(message);
    } else {
      return res.status(404).json({ message: "Message not found" });
    }
  } catch (error) {
    next(error);
  }
};

// update or edit a single message
export const updateMessage = async (
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

    const message = await Message.findByPk(id);

    if (message) {
      await message.update(data);
      return res.status(200).json(message);
    } else {
      return res.status(404).json({ message: "Message not found" });
    }
  } catch (error) {
    next(error);
  }
};

// delete a message
export const deleteMessage = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ message: "Missing ID parameter!" });
    }

    const message = await Message.findByPk(id);

    if (message) {
      await message.destroy();
      return res.status(204).json();
    } else {
      return res.status(404).json({ message: "Message not found" });
    }
  } catch (error) {
    next(error);
  }
};
