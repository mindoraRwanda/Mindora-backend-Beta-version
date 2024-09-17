import { Request, Response, NextFunction } from "express";
import LanguageSupport from "../database/models/languageSupport";

// Create a new language
export const createLanguageSupport = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { code, name, isDefault } = req.body;

    // Check if the required fields are provided
    if (!code || !name) {
      return res
        .status(400)
        .json({ message: "Missing required fields: code, name" });
    }

    // Create the new language
    const language = await LanguageSupport.create({
      code,
      name,
      isDefault: isDefault || false,
    });

    res.status(201).json(language);
  } catch (error) {
    next(error);
  }
};

// Get all languages
export const getAllLanguagesSupport = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const languages = await LanguageSupport.findAll();
    res.status(200).json(languages);
  } catch (error) {
    next(error);
  }
};

// Get a single language by ID
export const getLanguageSupportById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ message: "Missing language ID" });
    }

    const language = await LanguageSupport.findByPk(id);

    if (language) {
      res.status(200).json(language);
    } else {
      res.status(404).json({ message: "Language not found" });
    }
  } catch (error) {
    next(error);
  }
};

// Update a language by ID
export const updateLanguageSupport = async (
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

    const language = await LanguageSupport.findByPk(id);

    if (language) {
      await language.update(data);
      res.status(200).json(language);
    } else {
      res.status(404).json({ message: "Language not found" });
    }
  } catch (error) {
    next(error);
  }
};

// Delete a language by ID
export const deleteLanguageSupport = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ message: "Missing language ID" });
    }

    const language = await LanguageSupport.findByPk(id);

    if (language) {
      await language.destroy();
      res.status(204).json();
    } else {
      res.status(404).json({ message: "Language not found" });
    }
  } catch (error) {
    next(error);
  }
};
