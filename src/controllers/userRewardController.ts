import { Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";
import {
  createUserReward,
  updateTargetUserReward,
  retrieveUserReward,
  removeUserReward,
} from "../models/UserReward";

export const addUserReward = async (req: Request, res: Response) => {
  const { userId, rewardId, earnedAt } = req.body;
  if (!userId || !rewardId || !earnedAt) {
    return res.status(400).json({ Error: "Missing parameter(s)!" });
  }
  try {
    const uniqueId = uuidv4();
    const insertedUserReward = await createUserReward({
      id: uniqueId,
      userId,
      rewardId,
      earnedAt,
    });
    if (!insertedUserReward) {
      return res
        .status(500)
        .json({ Error: "Error while adding a user reward!" });
    }
    return res.status(201).json(insertedUserReward);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ Error: "Error while adding a user reward!" });
  }
};

export const updateUserReward = async (req: Request, res: Response) => {
  const { id, userId, rewardId, earnedAt } = req.body;
  if (!id || !userId || !rewardId || !earnedAt) {
    return res.status(400).json({ Error: "Missing parameter(s)!" });
  }
  try {
    const updatedUserReward = await updateTargetUserReward({
      id,
      userId,
      rewardId,
      earnedAt,
    });
    if (!updatedUserReward) {
      return res.status(500).json({ Error: "User reward not found!" });
    }
    return res.status(200).json(updatedUserReward);
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ Error: "Error while updating a user reward!" });
  }
};

export const getUserReward = async (req: Request, res: Response) => {
  const { id } = req.params;
  if (!id) {
    return res.status(400).json({ Error: "Missing parameter(s)!" });
  }
  try {
    const userReward = await retrieveUserReward(id);
    if (!userReward) {
      return res.status(500).json({ Error: "User reward not found!" });
    }
    return res.status(200).json(userReward);
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ Error: "Error while retrieving a user reward!" });
  }
};

export const deleteUserReward = async (req: Request, res: Response) => {
  const { id } = req.params;
  if (!id) {
    return res.status(400).json({ Error: "Missing parameter(s)!" });
  }
  try {
    const deletedUserReward = await removeUserReward(id);
    if (!deletedUserReward) {
      return res.status(500).json({ Error: "User reward not found!" });
    }
    return res.status(200).json(deletedUserReward);
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ Error: "Error while deleting a user reward!" });
  }
};
