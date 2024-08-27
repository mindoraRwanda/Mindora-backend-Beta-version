import { Request, Response, NextFunction } from "express";
import FutureIntegration from "../database/models/EHRFutureIntegration";

// Create a new future integration
export const createFutureIntegration = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { ehrSystemName, apiEndPoint, authMethod, lastSyncTime, status } =
      req.body;
    if (!ehrSystemName || !apiEndPoint) {
      return res.status(400).json({ message: "Missing parameter(s)!" });
    }

    const futureIntegration = await FutureIntegration.create({
      ehrSystemName,
      apiEndPoint,
      authMethod,
      lastSyncTime,
      status,
    });

    res.status(201).json(futureIntegration);
  } catch (error) {
    next(error);
  }
};

// Get all future integrations
export const getFutureIntegrations = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const futureIntegrations = await FutureIntegration.findAll();

    if (!futureIntegrations || futureIntegrations.length === 0) {
      return res.status(404).json({ message: "No future integrations found!" });
    }

    res.status(200).json(futureIntegrations);
  } catch (error) {
    next(error);
  }
};

// Get a single future integration by ID
export const getFutureIntegrationById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ message: "Missing parameter(s)!" });
    }

    const futureIntegration = await FutureIntegration.findByPk(id);

    if (futureIntegration) {
      return res.status(200).json(futureIntegration);
    } else {
      return res.status(404).json({ message: "Future integration not found" });
    }
  } catch (error) {
    next(error);
  }
};

// Update a future integration
export const updateFutureIntegration = async (
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

    const futureIntegration = await FutureIntegration.findByPk(id);

    if (futureIntegration) {
      await futureIntegration.update(data);
      res.status(200).json(futureIntegration);
    } else {
      return res.status(404).json({ message: "Future integration not found" });
    }
  } catch (error) {
    next(error);
  }
};

// Delete a future integration
export const deleteFutureIntegration = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ message: "Missing parameter(s)!" });
    }

    const futureIntegration = await FutureIntegration.findByPk(id);

    if (futureIntegration) {
      await futureIntegration.destroy();
      res.status(204).json();
    } else {
      return res.status(404).json({ message: "Future integration not found" });
    }
  } catch (error) {
    next(error);
  }
};
