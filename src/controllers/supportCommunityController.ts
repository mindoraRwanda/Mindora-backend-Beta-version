import { Request, Response, NextFunction } from "express";
import SupportCommunity from "../database/models/community";
import User from "../database/models/user";
import CommunityPost from "../database/models/communityPost";

// Create a support community
export const createSupportCommunity = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { moderatorId, name, description, isPrivate } = req.body;
    const profile = req.file;

    if (!moderatorId || !name || !description || isPrivate === undefined) {
      return res.status(400).json({ message: "Missing parameter(s)!" });
    }

    const supportCommunity = await SupportCommunity.create({
      moderatorId,
      name,
      profile: profile?.path,
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
      include: [
        {
          model: CommunityPost,
          as: "posts",
          include: [
            {
              model: User,
              as: "user",
              attributes: {
                exclude: [
                  "password",
                  "resetPasswordToken",
                  "resetPasswordExpiry",
                ],
              },
            },
          ],
        },
        {
          model: User,
          as: "members",
          through: {
            attributes: ["role", "status", "joinedAt"],
          },
          attributes: ["id", "username"],
        },
      ],
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

// Get all support communities for a particular user, including all members of each community
export const getUserSupportCommunities = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { userId } = req.params;
    if (!userId) {
      return res.status(400).json({ message: "Missing user ID parameter!" });
    }

    const supportCommunities = await User.findOne({
      include: {
        model: SupportCommunity,
        as: "communities",
        include: [
          {
            model: CommunityPost,
            as: "posts",
            include: [
              {
                model: User,
                as: "user",
                attributes: {
                  exclude: [
                    "password",
                    "resetPasswordToken",
                    "resetPasswordExpiry",
                  ],
                },
              },
            ],
          },
          {
            model: User,
            as: "members",
            attributes: ["id", "username"],
          },
        ],
      },
      where: { id: userId },
      attributes: ["id", "username"],
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
      include: [
        {
          model: User,
          as: "members",
          through: {
            attributes: ["role", "status", "joinedAt"],
          },
          attributes: ["id", "username"],
        },
        {
          model: CommunityPost,
          as: "posts",
          include: [
            {
              model: User,
              as: "user",
              attributes: {
                exclude: [
                  "password",
                  "resetPasswordToken",
                  "resetPasswordExpiry",
                ],
              },
            },
          ],
        },
      ],
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
    const profile = req.file;

    if (!id || !data) {
      return res.status(400).json({ message: "Missing parameter(s)!" });
    }

    const supportCommunity = await SupportCommunity.findByPk(id);

    if (supportCommunity) {
      await supportCommunity.update({ ...data, profile: profile?.path });
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
