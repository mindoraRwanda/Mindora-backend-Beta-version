import { Request, Response, NextFunction } from "express";
import UserCommunity from "../database/models/userCommunity";
import User from "../database/models/user";
import SupportCommunity from "../database/models/community";

// Create a user community
export const createUserCommunity = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { communityId, userId, role, status } = req.body;

    if (!communityId || !userId || !role || !status) {
      return res.status(400).json({ message: "Missing parameter(s)!" });
    }
    const existingRecord = await UserCommunity.findOne({
      where: { communityId, userId },
    });
    if (existingRecord) {
      return res
        .status(409)
        .json({ message: "User is already part of this community" });
    }

    const userCommunity = await UserCommunity.create({
      communityId,
      userId,
      role,
      status,
    });

    res.status(201).json(userCommunity);
  } catch (error) {
    next(error);
  }
};

// Get all user communities
export const getUserCommunities = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { userId } = req.params;
    if (!userId) {
      return res.status(400).json({ message: "Missing user ID parameter" });
    }
    const userCommunities = await UserCommunity.findAll({ where: { userId } });
    if (userCommunities) {
      return res.status(200).json(userCommunities);
    } else {
      return res.status(404).json({ message: "User communities not found" });
    }
  } catch (error) {
    next(error);
  }
};

// Get a user community
export const getUserCommunity = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { communityId, userId } = req.params;

    if (!userId || !communityId) {
      return res.status(400).json({ message: "Missing ID parameter(s)!" });
    }

    const userCommunity = await UserCommunity.findOne({
      where: { communityId, userId },
    });

    if (userCommunity) {
      return res.status(200).json(userCommunity);
    } else {
      return res.status(404).json({ message: "User community not found" });
    }
  } catch (error) {
    next(error);
  }
};

// Update a user community
export const updateUserCommunity = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { communityId, userId } = req.params;
    const data = req.body;

    if (!userId || !communityId || !data) {
      return res.status(400).json({ message: "Missing parameter(s)!" });
    }

    const userCommunity = await UserCommunity.findOne({
      where: { communityId, userId },
    });

    if (userCommunity) {
      await userCommunity.update(data);
      return res.status(200).json(userCommunity);
    } else {
      return res.status(404).json({ message: "User community not found" });
    }
  } catch (error) {
    next(error);
  }
};

// Delete a user community
export const deleteUserCommunity = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { communityId, userId } = req.params;

    if (!communityId || !userId) {
      return res.status(400).json({ message: "Missing ID parameter(s)!" });
    }

    const userCommunity = await UserCommunity.findOne({
      where: { communityId, userId },
    });

    if (userCommunity) {
      await userCommunity.destroy();
      return res.status(204).json();
    } else {
      return res.status(404).json({ message: "User community not found" });
    }
  } catch (error) {
    next(error);
  }
};
