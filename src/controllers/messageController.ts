import { Request, Response } from "express";
import { createMsg } from "../models/Message";
import { getMessages } from "../models/Message";
import { updateMsg } from "../models/Message";
import { deleteMsg } from "../models/Message";

export const createMessage = async (req: Request, res: Response) => {
  const msgData = req.body;

  if (!msgData) {
    res.status(400).json({ Error: "Missing parameter(s)!" });
  }

  console.log(msgData);

  try {
    const rows = await createMsg({ ...msgData });
    res.status(201).json(rows);
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .json({ Error: "Error occurred while creating message instance!" });
  }
};

export const updateMessage = async (req: Request, res: Response) => {
  const data = req.body;
  if (!data) {
    res.status(400).json({ Error: "Missing parameter(s)!" });
  }
  try {
    const updatedRow = await updateMsg({ ...data });
    if (!updatedRow) {
      return res
        .status(404)
        .json({ Error: "Message not found or not updated." });
    }
    res.status(200).json(updatedRow);
  } catch (err) {
    console.log(err);
    res.status(500).json({ Error: "Error occurred while updating message!" });
  }
};

export const deleteMessage = async (req: Request, res: Response) => {
  const { id } = req.body;
  console.log("This is chat id: ", 1);
  if (!id) {
    res.status(400).json({ Error: "Missing parameter(s)!" });
  }
  try {
    const deletedRow = await deleteMsg(id);
    if (!deletedRow) {
      return res
        .status(404)
        .json({ Error: "Message not found or not deleted." });
    }
    res.status(200).json(deletedRow);
  } catch (err) {
    console.log(err);
    res.status(500).json({ Error: "Error occurred while deleting message!" });
  }
};

export const getChatHistory = async (req: Request, res: Response) => {
  const { userId } = req.body;

  if (!userId) {
    res.status(400).json({ Error: "Missing parameter(s)!" });
  }
  try {
    const chatHistory = await getMessages(userId);
    res.status(200).json(chatHistory);
  } catch (err) {
    console.log(err);
    res.status(500).json({ Error: "Error while retrieving chat history!" });
  }
};
