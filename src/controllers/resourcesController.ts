import { Request, Response, NextFunction } from "express";
import Article from "../database/models/article";
import Video from "../database/models/video";

export const getResources = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const [articles, videos] = await Promise.all([
      Article.findAll(),
      Video.findAll(),
    ]);

    if (articles.length === 0 && videos.length === 0) {
      return res.status(404).json({ message: "No resources available!" });
    }

    return res.status(200).json({ articles, videos });
  } catch (err) {
    next(err);
  }
};
