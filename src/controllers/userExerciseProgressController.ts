import { Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";
import { calculateUserExerciseProgress } from "../models/UserExerciseProgress";

export const getUserExerciseProgress = async (req: Request, res: Response) => {
  const { userExerciseId } = req.params;
  if (!userExerciseId) {
    return res.status(400).json({ Error: "Missing parameter(s)!" });
  }
  try {
    const progress = await calculateUserExerciseProgress(userExerciseId);
    return res.status(200).json(progress);
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ Error: "Error while getting user progress!" });
  }
};
