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
    const { courseId, title, author, category, publishedDate } = req.body;
    const file = req.file;

    // Check parameter(s)
    if (
      !courseId ||
      !title ||
      !author ||
      !category ||
      !publishedDate ||
      !file
    ) {
      return res.status(400).json({ message: "Missing parameter(s)!" });
    }

    const article = await Article.create({
      courseId,
      title,
      author,
      category,
      publishedDate,
      url: file?.path, // Store the Cloudinary URL if uploaded
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
    const file = req.file;
    const data = req.body;
    if (!id || !data) {
      return res.status(400).json({ message: "Missing parameter(s)!" });
    }
    const article = await Article.findByPk(id);

    if (!article) {
      return res.status(404).json({ message: "Article not found." });
    }

    await article.update({ ...data, url: file ? file.path : article.url });

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

    if (article.url) {
      // const publicId = article.url.split("/").pop()?.split(".")[0]; // Extract the public ID
      // Parse the URL to extract the public ID
      const parsedUrl = path.parse(article.url);
      const publicId = parsedUrl.name; // Get the file name without the extension
      await cloudinary.uploader.destroy(`uploads/${publicId}`); // Delete the file from Cloudinary
    }

    await article.destroy();

    return res.status(204).json();
  } catch (error) {
    next(error);
  }
};
