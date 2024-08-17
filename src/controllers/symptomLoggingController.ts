import { Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";
import {
  addUserSymptoms,
  getUserSymptoms,
  updateUserSymptoms,
  deleteUserSymptoms,
} from "../models/SymptomLogging";

export const addSymptoms = async (req: Request, res: Response) => {
  const symptomData = req.body;
  console.log(symptomData);
  if (!symptomData) {
    return res.status(400).json({ Error: "Missing parameter(s)!" });
  }

  // Generate a new UUID
  const uniqueId = uuidv4();
  try {
    const updatedSymptom = await addUserSymptoms({
      ...symptomData,
      id: uniqueId,
    });
    if (!updatedSymptom) {
      return res
        .status(500)
        .json({ Error: "Failed to save the symptom in db" });
    }

    return res.status(201).json(updatedSymptom);
  } catch (err) {
    console.error("Error while saving symptom:", err);
    return res.status(500).json({ Error: "Error while saving symtom!" });
  }
};

export const getSymptoms = async (req: Request, res: Response) => {
  const { userId } = req.params;

  if (!userId) {
    return res.status(400).json({ Error: "Missing parameter(s)!" });
  }
  try {
    const symptoms = await getUserSymptoms(userId);
    if (!symptoms || symptoms.length === 0) {
      return res.status(404).json({ Error: "User symptoms not found!" });
    }
    return res.status(200).json(symptoms);
  } catch (err) {
    console.error("Error while retrieving symptoms:", err);
    return res
      .status(500)
      .json({ Error: "Error while retrieving symptoms for user!" });
  }
};

export const updateSymptoms = async (req: Request, res: Response) => {
  const symptomData = req.body;
  console.log(symptomData);
  if (!symptomData) {
    return res.status(400).json({ Error: "Missing parameter(s)!" });
  }

  try {
    const updatedSymptom = await updateUserSymptoms({
      ...symptomData,
    });
    if (!updatedSymptom) {
      return res
        .status(500)
        .json({ Error: "Failed to update the symptom in db" });
    }

    return res.status(201).json(updatedSymptom);
  } catch (err) {
    console.error("Error while updating symptom:", err);
    return res.status(500).json({ Error: "Error while updating symtom!" });
  }
};

export const deleteSymptoms = async (req: Request, res: Response) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({ Error: "Missing parameter(s)!" });
  }
  try {
    const symptoms = await deleteUserSymptoms(id);
    if (!symptoms || symptoms.length === 0) {
      return res.status(404).json({ Error: "User symptoms not found!" });
    }
    return res.status(200).json(symptoms);
  } catch (err) {
    console.error("Error while deleting symptoms:", err);
    return res
      .status(500)
      .json({ Error: "Error while deleting symptoms for user!" });
  }
};
