import { Request, Response } from "express";
import {
  saveEmergencyContact,
  saveHotline,
  getEmergencyContact,
} from "../models/EmergencyContacts";
import { v4 as uuidv4 } from "uuid";

export const addEmergencyContact = async (req: Request, res: Response) => {
  const contactData = req.body;
  console.log(contactData);
  if (!contactData) {
    return res.status(400).json({ Error: "Missing parameter(s)!" });
  }

  // Generate a new UUID
  const uniqueId = uuidv4();
  try {
    const savedContact = await saveEmergencyContact({
      ...contactData,
      id: uniqueId,
    });
    if (!savedContact) {
      return res
        .status(500)
        .json({ Error: "Failed to save the contact in db" });
    }

    return res.status(201).json(savedContact);
  } catch (err) {
    console.error("Error while saving contact:", err);
    return res.status(500).json({ Error: "Error while saving contact!" });
  }
};

export const addHotline = async (req: Request, res: Response) => {
  const hotlineData = req.body;
  if (!hotlineData) {
    return res.status(400).json({ Error: "Missing parameter(s)!" });
  }

  // Generate a new UUID
  const uniqueId = uuidv4();
  try {
    const savedHotline = await saveHotline({
      ...hotlineData,
      id: uniqueId,
    });
    if (!savedHotline) {
      return res
        .status(500)
        .json({ Error: "Failed to save the hotline in db" });
    }

    return res.status(201).json(savedHotline);
  } catch (err) {
    console.error("Error while saving hotline:", err);
    return res.status(500).json({ Error: "Error while saving hotline!" });
  }
};

export const getUserEmergencyContacts = async (req: Request, res: Response) => {
  const { userId } = req.params;

  if (!userId) {
    return res.status(400).json({ Error: "Missing parameter(s)!" });
  }
  try {
    const userEmergencyContacts = await getEmergencyContact(userId);
    if (!userEmergencyContacts || userEmergencyContacts.length === 0) {
      return res.status(404).json({ Error: "Emergency contacts not found!" });
    }
    return res.status(200).json(userEmergencyContacts);
  } catch (err) {
    console.error("Error while retrieving emergency contacts:", err);
    return res
      .status(500)
      .json({ Error: "Error while retrieving emergency contacts for user!" });
  }
};
