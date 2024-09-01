import { Request, Response, NextFunction } from "express";
import SupportCommunity from "../database/models/community";
import User from "../database/models/user";

// Create a support community
export const createSupportCommunity = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { moderatorId, name, description, isPrivate } = req.body;

    if (!moderatorId || !name || !description || isPrivate === undefined) {
      return res.status(400).json({ message: "Missing parameter(s)!" });
    }

    const supportCommunity = await SupportCommunity.create({
      moderatorId,
      name,
      description,
      isPrivate,
    });

    res.status(201).json(supportCommunity);
  } catch (error) {
    next(error);
  }
};

// Get all support communities
export const getSupportCommunities = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const supportCommunities = await SupportCommunity.findAll({
      include: { model: User, as: "moderator" },
    });
    if (supportCommunities) {
      return res.status(200).json(supportCommunities);
    } else {
      return res.status(404).json({ message: "Support communities not found" });
    }
  } catch (error) {
    next(error);
  }
};

// Get a support community by its ID
export const getSupportCommunityById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ message: "Missing ID parameter!" });
    }

    const supportCommunity = await SupportCommunity.findByPk(id, {
      include: { model: User, as: "moderator" },
    });

    if (supportCommunity) {
      return res.status(200).json(supportCommunity);
    } else {
      return res.status(404).json({ message: "Support community not found" });
    }
  } catch (error) {
    next(error);
  }
};

// Update a support community
export const updateSupportCommunity = async (
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

    const supportCommunity = await SupportCommunity.findByPk(id);

    if (supportCommunity) {
      await supportCommunity.update(data);
      return res.status(200).json(supportCommunity);
    } else {
      return res.status(404).json({ message: "Support community not found" });
    }
  } catch (error) {
    next(error);
  }
};

// Delete a support community
export const deleteSupportCommunity = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ message: "Missing ID parameter!" });
    }

    const supportCommunity = await SupportCommunity.findByPk(id);

    if (supportCommunity) {
      await supportCommunity.destroy();
      return res.status(204).json();
    } else {
      return res.status(404).json({ message: "Support community not found" });
    }
  } catch (error) {
    next(error);
  }
};
