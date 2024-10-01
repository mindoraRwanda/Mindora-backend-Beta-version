import { Request, Response, NextFunction } from "express";
import UserPreferences from "../database/models/userPreferences";

// Create new user preferences
export const createUserPreferences = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const {
      userId,
      preferredLanguage,
      communicationMethods,
      notificationSettings,
    } = req.body;
    if (
      !userId ||
      !preferredLanguage ||
      !communicationMethods ||
      !notificationSettings
    ) {
      return res.status(400).json({ message: "Missing parameter(s)!" });
    }

    const userPreferences = await UserPreferences.create({
      userId,
      preferredLanguage,
      communicationMethods,
      notificationSettings,
    });

    res.status(201).json(userPreferences);
  } catch (error) {
    next(error);
  }
};

// Get all user preferences
export const getUserPreferences = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const preferences = await UserPreferences.findAll();
    res.status(200).json(preferences);
  } catch (error) {
    next(error);
  }
};

// Get a single user preference by user ID
export const getUserPreferencesById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { userId } = req.params;
    if (!userId) {
      return res.status(400).json({ message: "Missing parameter(s)!" });
    }

    const userPreferences = await UserPreferences.findOne({
      where: { userId },
    });
    if (userPreferences) {
      return res.status(200).json(userPreferences);
    } else {
      return res.status(404).json({ message: "User Preferences not found" });
    }
  } catch (error) {
    next(error);
  }
};

// Update user preferences
export const updateUserPreferences = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const data = req.body;
    const { userId } = req.params;

    if (!userId || !data) {
      return res.status(400).json({ message: "Missing parameter(s)!" });
    }

    const userPreferences = await UserPreferences.findOne({
      where: { userId },
    });
    if (userPreferences) {
      await userPreferences.update(data);
      res.status(200).json(userPreferences);
    } else {
      return res.status(404).json({ message: "User Preferences not found" });
    }
  } catch (error) {
    next(error);
  }
};

// Delete user preferences
export const deleteUserPreferences = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ message: "Missing parameter(s)!" });
    }

    const userPreferences = await UserPreferences.findByPk(id);
    if (userPreferences) {
      await userPreferences.destroy();
      res.status(204).json();
    } else {
      return res.status(404).json({ message: "User Preferences not found" });
    }
  } catch (error) {
    next(error);
  }
};
