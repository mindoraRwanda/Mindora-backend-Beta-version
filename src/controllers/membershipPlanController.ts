import { Request, Response, NextFunction } from "express";
import MembershipPlan from "../database/models/membershipPlan";

// Create a membership plan
export const createMembershipPlan = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name, features, price, billingCycle, maxAccounts } = req.body;

    if (!name || !features || !price || !billingCycle || !maxAccounts) {
      return res.status(400).json({ message: "Missing parameter(s)!" });
    }

    const membershipPlan = await MembershipPlan.create({
      name,
      features,
      price,
      billingCycle,
      maxAccounts,
    });

    res.status(201).json(membershipPlan);
  } catch (error) {
    next(error);
  }
};

// Get all membership plans
export const getMembershipPlans = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const membershipPlans = await MembershipPlan.findAll();

    if (membershipPlans.length > 0) {
      return res.status(200).json(membershipPlans);
    } else {
      return res.status(404).json({ message: "No membership plans found" });
    }
  } catch (error) {
    next(error);
  }
};

// Get a membership plan by its ID
export const getMembershipPlanById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ message: "Missing ID parameter!" });
    }

    const membershipPlan = await MembershipPlan.findByPk(id);

    if (membershipPlan) {
      return res.status(200).json(membershipPlan);
    } else {
      return res.status(404).json({ message: "Membership plan not found" });
    }
  } catch (error) {
    next(error);
  }
};

// Update a membership plan
export const updateMembershipPlan = async (
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

    const membershipPlan = await MembershipPlan.findByPk(id);

    if (membershipPlan) {
      await membershipPlan.update(data);
      return res.status(200).json(membershipPlan);
    } else {
      return res.status(404).json({ message: "Membership plan not found" });
    }
  } catch (error) {
    next(error);
  }
};

// Delete a membership plan
export const deleteMembershipPlan = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ message: "Missing ID parameter!" });
    }

    const membershipPlan = await MembershipPlan.findByPk(id);

    if (membershipPlan) {
      await membershipPlan.destroy();
      return res.status(204).json();
    } else {
      return res.status(404).json({ message: "Membership plan not found" });
    }
  } catch (error) {
    next(error);
  }
};
