import { Request, Response, NextFunction } from "express";
import SubscriptionChanges from "../database/models/subscriptionChange";

// Create a Subscription Change
export const createSubscriptionChange = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const {
      subscriptionId,
      changeType,
      previousPlanId,
      newPlanId,
      changeDate,
      changedBy,
      notes,
    } = req.body;

    if (
      !subscriptionId ||
      !changeType ||
      !previousPlanId ||
      !changeDate ||
      !changedBy
    ) {
      return res.status(400).json({ message: "Missing parameter(s)!" });
    }

    const subscriptionChange = await SubscriptionChanges.create({
      subscriptionId,
      changeType,
      previousPlanId,
      newPlanId,
      changeDate,
      changedBy,
      notes,
    });

    res.status(201).json(subscriptionChange);
  } catch (error) {
    next(error);
  }
};

// Get all Subscription Changes
export const getSubscriptionChanges = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const subscriptionChanges = await SubscriptionChanges.findAll();

    if (subscriptionChanges.length > 0) {
      return res.status(200).json(subscriptionChanges);
    } else {
      return res.status(404).json({ message: "No subscription changes found" });
    }
  } catch (error) {
    next(error);
  }
};

// Get a Subscription Change by its ID
export const getSubscriptionChangeById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ message: "Missing ID parameter!" });
    }

    const subscriptionChange = await SubscriptionChanges.findByPk(id);

    if (subscriptionChange) {
      return res.status(200).json(subscriptionChange);
    } else {
      return res.status(404).json({ message: "Subscription change not found" });
    }
  } catch (error) {
    next(error);
  }
};

// Update a Subscription Change
export const updateSubscriptionChange = async (
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

    const subscriptionChange = await SubscriptionChanges.findByPk(id);

    if (subscriptionChange) {
      await subscriptionChange.update(data);
      return res.status(200).json(subscriptionChange);
    } else {
      return res.status(404).json({ message: "Subscription change not found" });
    }
  } catch (error) {
    next(error);
  }
};

// Delete a Subscription Change
export const deleteSubscriptionChange = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ message: "Missing ID parameter!" });
    }

    const subscriptionChange = await SubscriptionChanges.findByPk(id);

    if (subscriptionChange) {
      await subscriptionChange.destroy();
      return res.status(204).json();
    } else {
      return res.status(404).json({ message: "Subscription change not found" });
    }
  } catch (error) {
    next(error);
  }
};
