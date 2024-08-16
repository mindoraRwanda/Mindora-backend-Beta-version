import { Request, Response } from "express";
import { createMood, getUserMood } from "../models/MoodLoggging";
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
    res.status(200).json(userMoods);
  } catch (err) {
    console.log(err);
    res.status(500).json({ Error: "Error while retrieving user moods!" });
  }
};
