import { Request, Response, NextFunction } from "express";
import Message, { MessageAttributes } from "../database/models/message";
import User from "../database/models/user";
import ffmpeg from "fluent-ffmpeg";

// Function to get media duration
const getMediaDuration = (filePath: string) => {
  return new Promise((resolve, reject) => {
    ffmpeg.ffprobe(filePath, (err, metadata) => {
      if (err) return reject(err);
      const duration = metadata.format.duration
        ? Math.round(metadata.format.duration)
        : 0; // duration in seconds
      resolve(duration);
    });
  });
};

// Helper function to determine message type from MIME type
const determineMessageType = (mimeType: string) => {
  if (mimeType.startsWith("image/")) return "image";
  if (mimeType.startsWith("audio/")) return "audio";
  if (mimeType.startsWith("video/")) return "video";

  // Handle different document types
  const documentTypes = [
    "application/pdf",
    "application/msword",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document", // DOCX
    "application/vnd.ms-powerpoint",
    "application/vnd.openxmlformats-officedocument.presentationml.presentation", // PPTX
    "application/vnd.ms-excel",
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", // XLSX
  ];

  if (documentTypes.includes(mimeType)) return "document";

  return "unknown file type";
};

export const createMsg = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { chatId, senderId, receiverId, messageType, isRead, messageText } =
      req.body;

    const msg = await Message.create({
      chatId,
      senderId,
      receiverId,
      messageType,
      isRead,
      messageText,
    });
    res.status(201).json(msg);
  } catch (err) {
    next(err);
  }
};

// Create message with multiple file uploads
export const createMessage = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const files = req.files as Express.Multer.File[];

    if (!files || files.length === 0) {
      return res.status(400).json({ message: "No file(s) uploaded!" });
    }

    const uploadedFiles = await Promise.all(
      files.map(async (file) => {
        // Determine the message type from the MIME type of the uploaded file
        const messageType = determineMessageType(file.mimetype);
        const mediaSize = file.size;
        const mediaUrl = file.path;

        let mediaDuration = null;
        if (messageType === "audio" || messageType === "video") {
          mediaDuration = await getMediaDuration(file.path); // Use ffmpeg to get duration if it's media
        }

        return { messageType, mediaUrl, mediaSize, mediaDuration };
      })
    );

    res.status(200).json({ files: uploadedFiles });
  } catch (error) {
    next(error);
  }
};

export const saveMessage = async (message: MessageAttributes) => {
  try {
    if (!message.chatId || !message.receiverId || !message.senderId) {
      throw new Error("Missing required parameter(s)!");
    }

    const msg = await Message.create(message);
    return msg;
  } catch (err: any) {
    console.error("Error saving message:", err.message);
    throw new Error(`Failed to save message: ${err.message}`);
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
