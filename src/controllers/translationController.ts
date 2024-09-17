import { Request, Response, NextFunction } from "express";
import Translation from "../database/models/translation";

// Create a new translation
export const createTranslation = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { languageId, key, value } = req.body;

    if (!languageId || !key || !value) {
      return res
        .status(400)
        .json({ message: "Missing required fields: languageId, key, value" });
    }

    // Create the new translation
    const translation = await Translation.create({
      languageId,
      key,
      value,
    });

    res.status(201).json(translation);
  } catch (error) {
    next(error);
  }
};

// Get all translations
export const getAllTranslations = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const translations = await Translation.findAll();
    res.status(200).json(translations);
  } catch (error) {
    next(error);
  }
};

// Get all translations for particular language
export const getLanguageTranslations = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { languageId } = req.params;
    if (!languageId) {
      return res
        .status(400)
        .json({ message: "Missing language ID parameter!" });
    }
    const translations = await Translation.findAll({ where: { languageId } });
    if (translations) {
      res.status(200).json(translations);
    } else {
      return res
        .status(404)
        .json({ message: "Language translations not found!" });
    }
  } catch (error) {
    next(error);
  }
};

// Get a single translation by ID
export const getTranslationById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ message: "Missing translation ID" });
    }

    const translation = await Translation.findByPk(id);

    if (translation) {
      res.status(200).json(translation);
    } else {
      res.status(404).json({ message: "Translation not found" });
    }
  } catch (error) {
    next(error);
  }
};

// Update a translation by ID
export const updateTranslation = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const data = req.body;

    if (!id || !data) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const translation = await Translation.findByPk(id);

    if (translation) {
      await translation.update(data);
      res.status(200).json(translation);
    } else {
      res.status(404).json({ message: "Translation not found" });
    }
  } catch (error) {
    next(error);
  }
};

// Delete a translation by ID
export const deleteTranslation = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ message: "Missing translation ID" });
    }

    const translation = await Translation.findByPk(id);

    if (translation) {
      await translation.destroy();
      res.status(204).json();
    } else {
      res.status(404).json({ message: "Translation not found" });
    }
  } catch (error) {
    next(error);
  }
};
