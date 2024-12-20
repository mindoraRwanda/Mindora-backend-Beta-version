import { Request, Response, NextFunction } from "express";
import CommunityPost from "../database/models/communityPost";
import SupportCommunity from "../database/models/community";
import User from "../database/models/user";

// Create a community post
export const createCommunityPost = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { communityId, title, content, isFlagged, createdBy } = req.body;

    if (!communityId || !title || !createdBy) {
      return res.status(400).json({ message: "Missing parameter(s)!" });
    }
    const files = req.files as Express.Multer.File[];
    // Map the attachment paths to an array of strings
    const attachments = files.map((file) => file.path);
    const communityPost = await CommunityPost.create({
      communityId,
      title,
      content,
      isFlagged: isFlagged || false,
      createdBy,
      attachments,
    });

    res.status(201).json(communityPost);
  } catch (error) {
    next(error);
  }
};

// Get all community posts
export const getCommunityPosts = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const communityPosts = await CommunityPost.findAll({
      include: [
        { model: SupportCommunity, as: "community" },
        { model: User, as: "user" },
      ],
    });

    if (communityPosts) {
      return res.status(200).json(communityPosts);
    } else {
      return res.status(404).json({ message: "Community posts not found" });
    }
  } catch (error) {
    next(error);
  }
};

// Get a community post by its ID
export const getCommunityPostById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ message: "Missing ID parameter!" });
    }

    const communityPost = await CommunityPost.findByPk(id, {
      include: [
        { model: SupportCommunity, as: "community" },
        { model: User, as: "user" },
      ],
    });

    if (communityPost) {
      return res.status(200).json(communityPost);
    } else {
      return res.status(404).json({ message: "Community post not found" });
    }
  } catch (error) {
    next(error);
  }
};

// Update a community post
export const updateCommunityPost = async (
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

    const files = req.files as Express.Multer.File[] | undefined;
    // Map the attachment paths to an array of strings
    const attachments = files?.map((file) => file.path) || [];

    const communityPost = await CommunityPost.findByPk(id);
    if (communityPost) {
      await communityPost.update({
        ...data,
        attachments:
          attachments.length > 0 ? attachments : communityPost.attachments,
      });

      return res.status(200).json(communityPost);
    } else {
      return res.status(404).json({ message: "Community post not found" });
    }
  } catch (error) {
    next(error);
  }
};

// Delete a community post
export const deleteCommunityPost = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ message: "Missing ID parameter!" });
    }

    const communityPost = await CommunityPost.findByPk(id);

    if (communityPost) {
      await communityPost.destroy();
      return res.status(204).json();
    } else {
      return res.status(404).json({ message: "Community post not found" });
    }
  } catch (error) {
    next(error);
  }
};
