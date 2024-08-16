import { Request, Response } from "express";
import {
  createMood,
  getUserMood,
  updateUserMood,
  deleteUserMood,
} from "../models/MoodLoggging";
import { v4 as uuidv4 } from "uuid";

export const addMood = async (req: Request, res: Response) => {
  const moodLogs = req.body;

  if (!moodLogs) {
    res.status(400).json({ Error: "Missing parameter(s)!" });
  }

  console.log(moodLogs);

  try {
    const moodId = uuidv4();
    const rows = await createMood({ ...moodLogs, id: moodId });
    res.status(201).json(rows);
  } catch (err) {
    console.log(err);
    res.status(500).json({ Error: "Error occurred while saving user mood" });
  }
};

export const getMood = async (req: Request, res: Response) => {
  const { userId } = req.params;

  if (!userId) {
    res.status(400).json({ Error: "Missing parameter(s)!" });
  }
  try {
    const userMoods = await getUserMood(userId);
    if (!userMoods) {
      return res.status(500).json({ Error: "Failed to add user mood" });
    }
    res.status(200).json(userMoods);
  } catch (err) {
    console.log(err);
    res.status(500).json({ Error: "Error while retrieving user moods!" });
  }
};

export const updateMood = async (req: Request, res: Response) => {
  const updateData = req.body;

  if (!updateData) {
    res.status(400).json({ Error: "Missing parameter(s)!" });
  }

  console.log(updateData);

  try {
    const updatedRow = await updateUserMood({ ...updateData });
    if (!updatedRow) {
      return res.status(404).json({ Error: "User mood log not found!" });
    }
    res.status(201).json(updatedRow);
  } catch (err) {
    console.log(err);
    res.status(500).json({ Error: "Error occurred while updating user mood" });
  }
};

export const deleteMood = async (req: Request, res: Response) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({ Error: "Missing parameter(s)!" });
  }
  try {
    const deletedUserMood = await deleteUserMood(id);
    if (!deletedUserMood) {
      return res.status(500).json({ Error: "Failed to delete user mood" });
    }
    console.log("result ------------", deletedUserMood);
    return res.status(200).json(deletedUserMood);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ Error: "Error while deleting user moods!" });
  }
};
