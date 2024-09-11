import { Request, Response, NextFunction } from "express";
import Subscription from "../database/models/subscription";
import MembershipPlan from "../database/models/membershipPlan";

// Create a subscription
export const createSubscription = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const {
      userId,
      membershipPlanId,
      startDate,
      endDate,
      paymentMethod,
      status,
    } = req.body;

    if (!userId || !membershipPlanId || !startDate || !endDate || !status) {
      return res.status(400).json({ message: "Missing parameter(s)!" });
    }

    const subscription = await Subscription.create({
      userId,
      membershipPlanId,
      startDate,
      endDate,
      paymentMethod,
      status,
    });

    res.status(201).json(subscription);
  } catch (error) {
    next(error);
  }
};

// Get all subscriptions
export const getSubscriptions = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const subscriptions = await Subscription.findAll({
      include: {
        model: MembershipPlan,
        as: "membershipPlan",
      },
    });

    if (subscriptions.length > 0) {
      return res.status(200).json(subscriptions);
    } else {
      return res.status(404).json({ message: "No subscriptions found" });
    }
  } catch (error) {
    next(error);
  }
};

// Get a subscription by user ID
export const getSubscriptionByUserId = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { userId } = req.params;

    if (!userId) {
      return res.status(400).json({ message: "Missing user ID parameter!" });
    }

    const subscription = await Subscription.findOne({
      where: { userId, status: "Active" },
      include: {
        model: MembershipPlan,
        as: "membershipPlan",
      },
    });

    if (subscription) {
      return res.status(200).json(subscription);
    } else {
      return res.status(404).json({ message: "User subscription not found" });
    }
  } catch (error) {
    next(error);
  }
};

// Get a subscription by its ID
export const getSubscriptionById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ message: "Missing ID parameter!" });
    }

    const subscription = await Subscription.findByPk(id, {
      include: {
        model: MembershipPlan,
        as: "membershipPlan",
      },
    });

    if (subscription) {
      return res.status(200).json(subscription);
    } else {
      return res.status(404).json({ message: "Subscription not found" });
    }
  } catch (error) {
    next(error);
  }
};

// Update a subscription
export const updateSubscription = async (
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

    const subscription = await Subscription.findByPk(id);

    if (subscription) {
      await subscription.update(data);
      return res.status(200).json(subscription);
    } else {
      return res.status(404).json({ message: "Subscription not found" });
    }
  } catch (error) {
    next(error);
  }
};

// Delete a subscription
export const deleteSubscription = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ message: "Missing ID parameter!" });
    }

    const subscription = await Subscription.findByPk(id);

    if (subscription) {
      await subscription.destroy();
      return res.status(204).json();
    } else {
      return res.status(404).json({ message: "Subscription not found" });
    }
  } catch (error) {
    next(error);
  }
};
