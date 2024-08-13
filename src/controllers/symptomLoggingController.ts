// src/controllers/symptomLoggingController.ts

import { Request, Response } from 'express';
import { createSymptomLogging, updateSymptomLogging, deleteSymptomLogging, getSymptomLogging, getUserSymptomLoggings } from '../models/SymptomLogging';

export const createSymptom = async (req: Request, res: Response) => {
  const entry = req.body;

  if (!entry.userId || !entry.symptom || entry.severity === undefined) {
    return res.status(400).json({ error: "Missing parameter(s)!" });
  }

  try {
    const newEntry = await createSymptomLogging(entry);
    res.status(201).json(newEntry);
  } catch (err) {
    console.error('Error creating symptom logging entry:', err);
    res.status(500).json({ error: "Error occurred while creating symptom logging entry!" });
  }
};

export const updateSymptom = async (req: Request, res: Response) => {
  const { id, ...updatedEntry } = req.body;

  if (!id) {
    return res.status(400).json({ error: "Missing parameter(s)!" });
  }

  try {
    const updated = await updateSymptomLogging(id, updatedEntry);
    if (!updated) {
      return res.status(404).json({ error: "Symptom logging entry not found or not updated." });
    }
    res.status(200).json(updated);
  } catch (err) {
    console.error('Error updating symptom logging entry:', err);
    res.status(500).json({ error: "Error occurred while updating symptom logging entry!" });
  }
};

export const deleteSymptom = async (req: Request, res: Response) => {
  const { id } = req.body;

  if (!id) {
    return res.status(400).json({ error: "Missing parameter(s)!" });
  }

  try {
    const deleted = await deleteSymptomLogging(id);
    if (!deleted) {
      return res.status(404).json({ error: "Symptom logging entry not found or not deleted." });
    }
    res.status(200).json(deleted);
  } catch (err) {
    console.error('Error deleting symptom logging entry:', err);
    res.status(500).json({ error: "Error occurred while deleting symptom logging entry!" });
  }
};

export const getSymptom = async (req: Request, res: Response) => {
  const { id } = req.query;

  if (!id) {
    return res.status(400).json({ error: "Missing parameter(s)!" });
  }

  try {
    const entry = await getSymptomLogging(Number(id));
    if (!entry) {
      return res.status(404).json({ error: "Symptom logging entry not found." });
    }
    res.status(200).json(entry);
  } catch (err) {
    console.error('Error retrieving symptom logging entry:', err);
    res.status(500).json({ error: "Error while retrieving symptom logging entry!" });
  }
};

export const getUserSymptoms = async (req: Request, res: Response) => {
  const { userId } = req.query;

  if (!userId) {
    return res.status(400).json({ error: "Missing parameter(s)!" });
  }

  try {
    const entries = await getUserSymptomLoggings(Number(userId));
    res.status(200).json(entries);
  } catch (err) {
    console.error('Error retrieving symptom logging entries for user:', err);
    res.status(500).json({ error: "Error while retrieving symptom logging entries!" });
  }
};
