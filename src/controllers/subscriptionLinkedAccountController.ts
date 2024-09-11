import { Request, Response, NextFunction } from "express";
import SubscriptionLinkedAccount from "../database/models/subscriptionLinkedAccount";
import Subscription from "../database/models/subscription";
import User from "../database/models/user";
import MembershipPlan from "../database/models/membershipPlan";

interface SubscriptionWithMembershipPlan extends Subscription {
  membershipPlan?: MembershipPlan;
}

// Create a subscription linked account
export const createSubscriptionLinkedAccount = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { subscriptionId, userId } = req.body;

    if (!subscriptionId || !userId) {
      return res.status(400).json({ message: "Missing parameter(s)!" });
    }

    const linkedAccounts = await SubscriptionLinkedAccount.findAndCountAll({
      where: { subscriptionId },
    });

    const subscription: SubscriptionWithMembershipPlan | null =
      await Subscription.findByPk(subscriptionId, {
        include: { model: MembershipPlan, as: "membershipPlan" },
      });

    if (!subscription) {
      return res.status(404).json({ message: "Subscription not found!" });
    }

    const maxAccounts = subscription.membershipPlan?.maxAccounts;

    if (maxAccounts !== undefined) {
      const reachedLimit = maxAccounts <= linkedAccounts.count;

      if (reachedLimit) {
        return res
          .status(403)
          .json({ message: "You have reached the subscription limit!" });
      }
    } else {
      return res.status(404).json({ message: "Membership plan not found!" });
    }

    const linkedAccount = await SubscriptionLinkedAccount.create({
      subscriptionId,
      userId,
    });

    res.status(201).json(linkedAccount);
  } catch (error) {
    next(error);
  }
};

// Get all subscription linked accounts
export const getSubscriptionLinkedAccounts = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { subscriptionId } = req.params;
    if (!subscriptionId) {
      return res
        .status(400)
        .json({ message: "Missing subscription ID parameter!" });
    }
    const linkedAccounts = await SubscriptionLinkedAccount.findAll({
      where: { subscriptionId },
      include: [
        {
          model: Subscription,
          as: "subscription",
        },
        {
          model: User,
          as: "user",
        },
      ],
    });

    if (linkedAccounts.length > 0) {
      return res.status(200).json(linkedAccounts);
    } else {
      return res.status(404).json({ message: "No linked accounts found" });
    }
  } catch (error) {
    next(error);
  }
};

// Get a subscription linked account by ID
export const getSubscriptionLinkedAccountById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ message: "Missing ID parameter!" });
    }

    const linkedAccount = await SubscriptionLinkedAccount.findByPk(id, {
      include: [
        {
          model: Subscription,
          as: "subscription",
        },
        {
          model: User,
          as: "user",
        },
      ],
    });

    if (linkedAccount) {
      return res.status(200).json(linkedAccount);
    } else {
      return res.status(404).json({ message: "Linked account not found" });
    }
  } catch (error) {
    next(error);
  }
};

// Update a subscription linked account
export const updateSubscriptionLinkedAccount = async (
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

    const linkedAccount = await SubscriptionLinkedAccount.findByPk(id);

    if (linkedAccount) {
      await linkedAccount.update(data);
      return res.status(200).json(linkedAccount);
    } else {
      return res.status(404).json({ message: "Linked account not found" });
    }
  } catch (error) {
    next(error);
  }
};

// Delete a subscription linked account
export const deleteSubscriptionLinkedAccount = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ message: "Missing ID parameter!" });
    }

    const linkedAccount = await SubscriptionLinkedAccount.findByPk(id);

    if (linkedAccount) {
      await linkedAccount.destroy();
      return res.status(204).json();
    } else {
      return res.status(404).json({ message: "Linked account not found" });
    }
  } catch (error) {
    next(error);
  }
};
