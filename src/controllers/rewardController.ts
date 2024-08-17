import { Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";
import {
  createReward,
  updateTargetReward,
  retrieveReward,
  removeReward,
} from "../models/Reward";

export const addReward = async (req: Request, res: Response) => {
  const { name, description, pointsRequired } = req.body;
  if (!name || !description || !pointsRequired) {
    return res.status(400).json({ Error: "Missing parameter(s)!" });
  }
  try {
    const uniqueId = uuidv4();
    const insertedReward = await createReward({
      id: uniqueId,
      name,
      description,
      pointsRequired,
    });
    if (!insertedReward) {
      return res.status(500).json({ Error: "Error while adding a reward!" });
    }
    return res.status(201).json(insertedReward);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ Error: "Error while adding a reward!" });
  }
};

export const updateReward = async (req: Request, res: Response) => {
  const { id, name, description, pointsRequired } = req.body;
  if (!id || !name || !description || !pointsRequired) {
    return res.status(400).json({ Error: "Missing parameter(s)!" });
  }
  try {
    const updatedReward = await updateTargetReward({
      id,
      name,
      description,
      pointsRequired,
    });
    if (!updatedReward) {
      return res.status(404).json({ Error: "A reward not found!" });
    }
    return res.status(200).json(updatedReward);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ Error: "Error while updating a reward!" });
  }
};

export const getReward = async (req: Request, res: Response) => {
  const { id } = req.params;
  if (!id) {
    return res.status(400).json({ Error: "Missing parameter(s)!" });
  }
  try {
    const reward = await retrieveReward(id);
    if (!reward) {
      return res.status(404).json({ Error: "A reward not found!" });
    }
    return res.status(200).json(reward);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ Error: "Error while retrieving a reward!" });
  }
};

export const deleteReward = async (req: Request, res: Response) => {
  const { id } = req.params;
  if (!id) {
    return res.status(400).json({ Error: "Missing parameter(s)!" });
  }
  try {
    const deletedReward = await removeReward(id);
    if (!deletedReward) {
      return res.status(404).json({ Error: "A reward not found!" });
    }
    return res.status(200).json(deletedReward);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ Error: "Error while deleting a reward!" });
  }
};
