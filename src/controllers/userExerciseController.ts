import { Request, Response } from "express";
import {
  createUserExercise,
  updateTargetUserExercise,
  retrieveUserExercise,
  removeUserExercise,
} from "../models/UserExercise";
import { v4 as uuidv4 } from "uuid";

export const addUserExercise = async (req: Request, res: Response) => {
  const { userId, exerciseId, completedAt, score, status } = req.body;
  if (!userId || !exerciseId || !completedAt || !score || !status) {
    return res.status(400).json({ Error: "Missing parameter(s)!" });
  }
  try {
    const unniqueId = uuidv4();
    const InsertedUserExercise = await createUserExercise({
      userId,
      exerciseId,
      completedAt,
      score,
      status,
      id: unniqueId,
    });
    if (!InsertedUserExercise) {
      return res
        .status(500)
        .json({ Error: "Error while adding a user exercise!" });
    }
    return res.status(201).json(InsertedUserExercise);
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ Error: "Error while adding a user exercise!" });
  }
};

export const updateUserExercise = async (req: Request, res: Response) => {
  const { id, userId, exerciseId, completedAt, score, status } = req.body;
  if (!id || !userId || !exerciseId || !completedAt || !score || !status) {
    return res.status(400).json({ Error: "Missing parameter(s)!" });
  }
  try {
    const updatedUserExercise = await updateTargetUserExercise({
      id,
      userId,
      exerciseId,
      completedAt,
      score,
      status,
    });
    if (!updatedUserExercise) {
      return res
        .status(404)
        .json({ Error: "User exercise not found or updated!" });
    }
    return res.status(200).json(updatedUserExercise);
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ Error: "Error while updatding a user exercise!" });
  }
};

export const getUserExercise = async (req: Request, res: Response) => {
  const { userId, exerciseId } = req.params;
  if (!userId || !exerciseId) {
    return res.status(400).json({ Error: "Missing parameter(s)!" });
  }
  try {
    const UserExercise = await retrieveUserExercise(userId, exerciseId);
    if (!UserExercise) {
      return res.status(404).json({ Error: "User exercise not found!" });
    }
    return res.status(200).json(UserExercise);
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ Error: "Error while retrieving a user exercise!" });
  }
};

export const deleteUserExercise = async (req: Request, res: Response) => {
  const { id } = req.params;
  if (id) {
    return res.status(400).json({ Error: "Missing parameter(s)!" });
  }
  try {
    const deletedUserExercise = await removeUserExercise(id);
    if (!deletedUserExercise) {
      return res.status(404).json({ Error: "User exercise not found!" });
    }
    return res.status(200).json(deletedUserExercise);
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ Error: "Error while deleting a user exercise!" });
  }
};
