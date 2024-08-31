import { Request, Response, NextFunction } from "express";
import Reward from "../database/models/reward";

// Create a reward
export const createReward = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name, description, pointsRequired } = req.body;

    if (!name || !pointsRequired) {
      return res.status(400).json({ message: "Missing parameter(s)!" });
    }

    const reward = await Reward.create({
      name,
      description,
      pointsRequired,
    });

    res.status(201).json(reward);
  } catch (error) {
    next(error);
  }
};

// Get all rewards
export const getRewards = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const rewards = await Reward.findAll();

    if (rewards) {
      return res.status(200).json(rewards);
    } else {
      return res.status(404).json({ message: "Rewards not found" });
    }
  } catch (error) {
    next(error);
  }
};

// Get a reward by its ID
export const getRewardById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ message: "Missing ID parameter!" });
    }

    const reward = await Reward.findByPk(id);

    if (reward) {
      return res.status(200).json(reward);
    } else {
      return res.status(404).json({ message: "Reward not found" });
    }
  } catch (error) {
    next(error);
  }
};

// Update a reward
export const updateReward = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const data = req.body;

    if (!id || !data) {
      return res.status(400).json({ message: "Missing parameter(s)!" });
    }

    const reward = await Reward.findByPk(id);

    if (reward) {
      await reward.update(data);
      return res.status(200).json(reward);
    } else {
      return res.status(404).json({ message: "Reward not found" });
    }
  } catch (error) {
    next(error);
  }
};

// Delete a reward
export const deleteReward = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ message: "Missing ID parameter!" });
    }

    const reward = await Reward.findByPk(id);

    if (reward) {
      await reward.destroy();
      return res.status(204).json();
    } else {
      return res.status(404).json({ message: "Reward not found" });
    }
  } catch (error) {
    next(error);
  }
};
