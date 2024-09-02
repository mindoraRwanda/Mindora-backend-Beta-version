import { Request, Response, NextFunction } from "express";
import CommunityModerationAction from "../database/models/CommunityModerationAction";
import CommunityPost from "../database/models/communityPost";
import Comment from "../database/models/comment";
import User from "../database/models/user";

export const createCommunityModerationAction = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { postId, commentId, actionTaken, actionBy, reason } = req.body;

    if (!postId || !actionTaken || !actionBy) {
      return res.status(400).json({ message: "Missing parameter(s)!" });
    }

    const moderationAction = await CommunityModerationAction.create({
      postId,
      commentId,
      actionTaken,
      actionBy,
      reason,
    });

    res.status(201).json(moderationAction);
  } catch (error) {
    next(error);
  }
};

export const getCommunityModerationActions = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const moderationActions = await CommunityModerationAction.findAll({
      include: [
        { model: CommunityPost, as: "post" },
        { model: Comment, as: "comment", required: false }, // Comment is optional
        { model: User, as: "user" },
      ],
    });

    if (moderationActions.length > 0) {
      return res.status(200).json(moderationActions);
    } else {
      return res.status(404).json({ message: "No moderation actions found" });
    }
  } catch (error) {
    next(error);
  }
};

export const getCommunityModerationActionById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ message: "Missing ID parameter!" });
    }

    const moderationAction = await CommunityModerationAction.findByPk(id, {
      include: [
        { model: CommunityPost, as: "post" },
        { model: Comment, as: "comment", required: false }, // Comment is optional
        { model: User, as: "user" },
      ],
    });

    if (moderationAction) {
      return res.status(200).json(moderationAction);
    } else {
      return res.status(404).json({ message: "Moderation action not found" });
    }
  } catch (error) {
    next(error);
  }
};

export const updateCommunityModerationAction = async (
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

    const moderationAction = await CommunityModerationAction.findByPk(id);

    if (moderationAction) {
      await moderationAction.update(data);
      return res.status(200).json(moderationAction);
    } else {
      return res.status(404).json({ message: "Moderation action not found" });
    }
  } catch (error) {
    next(error);
  }
};

export const deleteCommunityModerationAction = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ message: "Missing ID parameter!" });
    }

    const moderationAction = await CommunityModerationAction.findByPk(id);

    if (moderationAction) {
      await moderationAction.destroy();
      return res.status(204).json();
    } else {
      return res.status(404).json({ message: "Moderation action not found" });
    }
  } catch (error) {
    next(error);
  }
};
