import { Request, Response, NextFunction } from "express";
import Article from "../database/models/article";
import { v2 as cloudinary } from "cloudinary";
import path from "path";

// Create an article
export const createArticle = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { courseId, title, author, category, content, publishedDate } =
      req.body;
    const { picture } = req.files as {
      picture: Express.Multer.File[];
    };

    // Check parameter(s)
    if (
      !courseId ||
      !title ||
      !author ||
      !category ||
      !publishedDate ||
      !content
    ) {
      return res.status(400).json({ message: "Missing parameter(s)!" });
    }

    const article = await Article.create({
      courseId,
      title,
      author,
      category,
      publishedDate,
      content,
      picture: picture?.[0].path,
    });

    res.status(201).json(article);
  } catch (error) {
    next(error);
  }
};

// Update an article
export const updateArticle = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const { picture } = req.files as {
      picture: Express.Multer.File[];
    };
    const data = req.body;
    if (!id || !data) {
      return res.status(400).json({ message: "Missing parameter(s)!" });
    }
    const article = await Article.findByPk(id);

    if (!article) {
      return res.status(404).json({ message: "Article not found." });
    }

    await article.update({
      ...data,
      picture:
        picture && picture.length > 0 ? picture[0].path : article.picture,
    });

    res.status(200).json(article);
  } catch (error) {
    next(error);
  }
};

// Get all articles
export const getArticles = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { courseId } = req.params;
    if (!courseId) {
      return res.status(400).json({ message: "Missing course ID parameter!" });
    }
    const articles = await Article.findAll({ where: { courseId } });
    if (articles.length > 0) {
      return res.status(200).json(articles);
    } else {
      return res.status(404).json({ message: "No articles found." });
    }
  } catch (error) {
    next(error);
  }
};

// Get article by ID
export const getArticleById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ message: "Missing ID parameter!" });
    }
    const article = await Article.findByPk(id);
    if (article) {
      return res.status(200).json(article);
    } else {
      return res.status(404).json({ message: "Article not found." });
    }
  } catch (error) {
    next(error);
  }
};

// Delete an article
export const deleteArticle = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ message: "Missing ID parameter!" });
    }

    const article = await Article.findByPk(id);

    if (!article) {
      return res.status(404).json({ message: "Article not found." });
    }

    await article.destroy();

    return res.status(204).json();
  } catch (error) {
    next(error);
  }
};
