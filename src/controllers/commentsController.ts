import { Request, Response, NextFunction } from "express";
import Comment from "../database/models/comment";
import CommunityPost from "../database/models/communityPost";
import User from "../database/models/user";

// Create a comment
export const createComment = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { postId, parentCommentId, content, isFlagged, createdBy } = req.body;

    if (!postId || !createdBy) {
      return res.status(400).json({ message: "Missing parameter(s)!" });
    }

    const files = req.files as Express.Multer.File[];
    // Map the attachment paths to an array of strings
    const attachments: Array<string> | null = files.length
      ? files.map((file) => file.path)
      : null;
    const parentId = parentCommentId ? parentCommentId : null;

    const comment = await Comment.create({
      postId,
      parentCommentId: parentId,
      content,
      isFlagged: isFlagged || false,
      createdBy,
      attachments,
    });

    res.status(201).json(comment);
  } catch (error) {
    next(error);
  }
};

// Get all comments
export const getComments = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const comments = await Comment.findAll({
      include: [
        { model: CommunityPost, as: "post" },
        { model: User, as: "user" },
        { model: Comment, as: "parent_comment" },
      ],
    });

    if (comments) {
      return res.status(200).json(comments);
    } else {
      return res.status(404).json({ message: "Comments not found" });
    }
  } catch (error) {
    next(error);
  }
};

// Get a comment by its ID
export const getCommentById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ message: "Missing ID parameter!" });
    }

    const comment = await Comment.findByPk(id, {
      include: [
        { model: CommunityPost, as: "post" },
        { model: User, as: "user" },
        { model: Comment, as: "parent_comment" },
      ],
    });

    if (comment) {
      return res.status(200).json(comment);
    } else {
      return res.status(404).json({ message: "Comment not found" });
    }
  } catch (error) {
    next(error);
  }
};

// Update a comment
export const updateComment = async (
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

    const files = req.files as Express.Multer.File[];
    // Map the attachment paths to an array of strings
    const attachments: Array<string> | null = files.length
      ? files.map((file) => file.path)
      : null;
    console.log("data: ", data);
    console.log("attachments: out:", attachments);
    const comment = await Comment.findByPk(id);

    if (comment) {
      await comment.update({ ...data, attachments });
    } else {
      return res.status(404).json({ message: "Comment not found" });
    }
    return res.status(200).json(comment);
  } catch (error) {
    next(error);
  }
};

// Delete a comment
export const deleteComment = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ message: "Missing ID parameter!" });
    }

    const comment = await Comment.findByPk(id);

    if (comment) {
      await comment.destroy();
      return res.status(204).json();
    } else {
      return res.status(404).json({ message: "Comment not found" });
    }
  } catch (error) {
    next(error);
  }
};
