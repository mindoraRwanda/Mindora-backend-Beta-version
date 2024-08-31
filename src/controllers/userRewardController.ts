import { Request, Response, NextFunction } from "express";
import UserReward from "../database/models/userReward";

// Create a UserReward
export const createUserReward = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { userId, rewardId } = req.body;

    if (!userId || !rewardId) {
      return res.status(400).json({ message: "Missing parameter(s)!" });
    }

    const userReward = await UserReward.create({
      userId,
      rewardId,
    });

    res.status(201).json(userReward);
  } catch (error) {
    next(error);
  }
};

// Get all UserRewards
export const getUserRewards = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userRewards = await UserReward.findAll();

    if (userRewards) {
      return res.status(200).json(userRewards);
    } else {
      return res.status(404).json({ message: "UserRewards not found" });
    }
  } catch (error) {
    next(error);
  }
};

// Get a UserReward by its ID
export const getUserRewardById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ message: "Missing ID parameter!" });
    }

    const userReward = await UserReward.findByPk(id);

    if (userReward) {
      return res.status(200).json(userReward);
    } else {
      return res.status(404).json({ message: "UserReward not found" });
    }
  } catch (error) {
    next(error);
  }
};

// Update a UserReward
export const updateUserReward = async (
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

    const userReward = await UserReward.findByPk(id);

    if (userReward) {
      await userReward.update(data);
      return res.status(200).json(userReward);
    } else {
      return res.status(404).json({ message: "UserReward not found" });
    }
  } catch (error) {
    next(error);
  }
};

// Delete a UserReward
export const deleteUserReward = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ message: "Missing ID parameter!" });
    }

    const userReward = await UserReward.findByPk(id);

    if (userReward) {
      await userReward.destroy();
      return res.status(204).json();
    } else {
      return res.status(404).json({ message: "UserReward not found" });
    }
  } catch (error) {
    next(error);
  }
};
