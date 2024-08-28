import { Request, Response, NextFunction } from "express";
import ChatMembers from "../database/models/chatMember";
import User from "../database/models/user";
import Therapist from "../database/models/therapist";
import Patient from "../database/models/patient";
import Chat from "../database/models/chat";

export const createChatMember = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { chatId, userId, role } = req.body;
    if (!chatId || !userId) {
      return res.status(400).json({ message: "Missing parameter(s)!" });
    }
    const chatMember = await ChatMembers.create({
      chatId,
      userId,
      role,
    });
    res.status(201).json(chatMember);
  } catch (error) {
    next(error);
  }
};

// Get all chat members
export const getChatMembers = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const chatMembers = await ChatMembers.findAll({
      include: [
        {
          model: User,
          as: "user",
          include: [
            { model: Therapist, as: "therapist" },
            { model: Patient, as: "patient" },
          ],
        },
      ],
    });
    if (!chatMembers) {
      return res.status(404).json({ message: "No chat members found!" });
    }
    res.status(200).json(chatMembers);
  } catch (error) {
    next(error);
  }
};

// Get a single chat member by chatId and userId
export const getChatMemberById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { chatId } = req.params;
    if (!chatId) {
      return res.status(400).json({ message: "Missing parameter(s)!" });
    }
    const chatMember = await ChatMembers.findOne({
      where: { chatId },
      include: [
        {
          model: User,
          as: "user",
          include: [
            { model: Therapist, as: "therapist" },
            { model: Patient, as: "patient" },
          ],
        },
      ],
    });
    if (chatMember) {
      return res.status(200).json(chatMember);
    } else {
      return res.status(404).json({ message: "Chat Member not found" });
    }
  } catch (error) {
    next(error);
  }
};

// Update a chat member
export const updateChatMember = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { chatId, userId } = req.params;
    const data = req.body;

    if (!userId || !chatId || !data) {
      return res.status(400).json({ message: "Missing parameter(s)!" });
    }
    const chatMember = await ChatMembers.findOne({ where: { chatId, userId } });
    if (chatMember) {
      await chatMember.update(data);
      res.status(200).json(chatMember);
    } else {
      return res.status(404).json({ message: "Chat Member not found" });
    }
  } catch (error) {
    next(error);
  }
};

// Delete a chat member
export const deleteChatMember = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { chatId, userId } = req.params;
    if (!chatId || !userId) {
      return res.status(400).json({ message: "Missing parameter(s)!" });
    }
    const chatMember = await ChatMembers.findOne({ where: { chatId, userId } });
    if (chatMember) {
      await chatMember.destroy();
      res.status(204).json();
    } else {
      return res.status(404).json({ message: "Chat Member not found" });
    }
  } catch (error) {
    next(error);
  }
};
