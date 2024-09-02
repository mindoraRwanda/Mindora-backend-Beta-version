import { Request, Response, NextFunction } from "express";
import PostReaction from "../database/models/postReaction";

// Create or update a post reaction
export const createOrUpdatePostReaction = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { postId, commentId, userId, isLike, isDislike, emojiType } =
      req.body;

    if (!postId || !userId) {
      return res.status(400).json({ message: "Missing parameter(s)!" });
    }

    const existingReaction = await PostReaction.findOne({
      where: {
        postId,
        userId,
        ...(commentId && { commentId }), // Only include commentId if provided
      },
    });

    if (existingReaction) {
      // Handle undo reaction logic (if the user sends the same reaction again)
      if (
        (isLike && existingReaction.isLike) ||
        (isDislike && existingReaction.isDislike) ||
        (emojiType && existingReaction.emojiType === emojiType)
      ) {
        await existingReaction.destroy();
        return res.status(204).json();
      } else {
        // Otherwise, update the reaction
        await existingReaction.update({
          isLike: isLike || false,
          isDislike: isDislike || false,
          emojiType: emojiType || null,
        });
        return res.status(200).json(existingReaction);
      }
    } else {
      // Create a new reaction
      const newReaction = await PostReaction.create({
        postId,
        commentId: commentId || null,
        userId,
        isLike: isLike || false,
        isDislike: isDislike || false,
        emojiType: emojiType || null,
      });

      return res.status(201).json(newReaction);
    }
  } catch (error) {
    next(error);
  }
};

// Get all reactions for a specific post
export const getPostReactions = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { postId } = req.params;

    if (!postId) {
      return res.status(400).json({ message: "Missing post ID parameter!" });
    }

    const reactions = await PostReaction.findAll({ where: { postId } });

    if (reactions.length > 0) {
      return res.status(200).json(reactions);
    } else {
      return res.status(404).json({ message: "Post reactions not found" });
    }
  } catch (error) {
    next(error);
  }
};

// Get all reactions for a specific comment
export const getCommentReactions = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { commentId } = req.params;

    if (!commentId) {
      return res.status(400).json({ message: "Missing comment ID parameter!" });
    }

    const reactions = await PostReaction.findAll({ where: { commentId } });

    if (reactions.length > 0) {
      return res.status(200).json(reactions);
    } else {
      return res.status(404).json({ message: "Comment reactions not found" });
    }
  } catch (error) {
    next(error);
  }
};

// Get a reaction by its ID
export const getPostReactionById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ message: "Missing ID parameter!" });
    }

    const reaction = await PostReaction.findByPk(id);

    if (reaction) {
      return res.status(200).json(reaction);
    } else {
      return res.status(404).json({ message: "Reaction not found" });
    }
  } catch (error) {
    next(error);
  }
};

// Update a post reaction by its ID
export const updatePostReaction = async (
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

    const reaction = await PostReaction.findByPk(id);

    if (reaction) {
      await reaction.update(data);
      return res.status(200).json(reaction);
    } else {
      return res.status(404).json({ message: "Reaction not found" });
    }
  } catch (error) {
    next(error);
  }
};

// Delete a post reaction by its ID
export const deletePostReaction = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ message: "Missing ID parameter!" });
    }

    const reaction = await PostReaction.findByPk(id);

    if (reaction) {
      await reaction.destroy();
      return res.status(204).json();
    } else {
      return res.status(404).json({ message: "Reaction not found" });
    }
  } catch (error) {
    next(error);
  }
};
