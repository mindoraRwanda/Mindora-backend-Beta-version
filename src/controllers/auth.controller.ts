import { Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator";
import User from "../database/models/user";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import crypto from "crypto";
import { Op } from "sequelize";
import nodemailer from "nodemailer";
import Subscription from "../database/models/subscription";
import MembershipPlan from "../database/models/membershipPlan";
import SubscriptionLinkedAccount from "../database/models/subscriptionLinkedAccount";
import UserPreferences from "../database/models/userPreferences";
import Therapist from "../database/models/therapist";
import Patient from "../database/models/patient";
import Role from "../database/models/role";

dotenv.config();

interface SubscriptionWithMembershipPlan extends Subscription {
  membershipPlan?: MembershipPlan;
}

interface linkedAccountWithMembershipPlan extends SubscriptionLinkedAccount {
  subscription?: SubscriptionWithMembershipPlan;
}

export const register = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { firstName, lastName, email, password, username, phoneNumber } =
    req.body;
  const profile = req.file;
  try {
    const existingUser = await User.findOne({
      where: {
        [Op.or]: [{ email }, { username }],
      },
    });

    if (existingUser) {
      const errorMessage =
        existingUser.email === email
          ? "Email already exists"
          : "Username already exists";
      return res.status(400).json({ message: errorMessage });
    }

    const newUser = await User.create({
      firstName,
      lastName,
      email,
      password,
      username,
      phoneNumber,
      profileImage: profile?.path,
    });
    const role = await Role.findOne({ where: { name: newUser.role } });
    const preferences = await UserPreferences.create({ userId: newUser.id });
    const token = jwt.sign(
      { id: newUser.id, role: newUser.role, roleId: role?.id },
      process.env.JWT_SECRET as string,
      { expiresIn: "1h" }
    );

    res.status(201).json({
      user: {
        id: newUser.id,
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        email: newUser.email,
        username: newUser.username,
        phoneNumber: newUser.phoneNumber,
        profileImage: newUser.profileImage,
        role: newUser.role,
        preferences,
      },
      token,
    });
  } catch (error) {
    next(error);
  }
};

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password } = req.body;
  try {
    const user = await User.findOne({
      where: { email },
      include: [
        { model: UserPreferences, as: "preferences" },
        { model: Therapist, as: "therapist" },
        { model: Patient, as: "patient" },
      ],
    });

    if (!user || !(await user.validatePassword(password))) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    let subscription: SubscriptionWithMembershipPlan | null =
      await Subscription.findOne({
        where: { userId: user.id },
        include: { model: MembershipPlan, as: "membershipPlan" },
      });

    const linkedAccount: linkedAccountWithMembershipPlan | null =
      await SubscriptionLinkedAccount.findOne({
        where: {
          userId: user.id,
        },
        include: {
          model: Subscription,
          as: "subscription",
          include: [{ model: MembershipPlan, as: "membershipPlan" }],
        },
      });

    const plan = subscription?.membershipPlan
      ? subscription?.membershipPlan
      : linkedAccount?.subscription?.membershipPlan;

    const role = await Role.findOne({ where: { name: user.role } });

    const token = jwt.sign(
      { id: user.id, role: user.role, roleId: role?.id },
      process.env.JWT_SECRET as string,
      {
        expiresIn: "1h",
      }
    );
    res.status(200).json({ token, user, membershipPlan: plan });
  } catch (error) {
    next(error);
  }
};

// reset password request
export const requestPasswordReset = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { email } = req.body;
  try {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    // Generate a token
    const resetToken = crypto.randomBytes(32).toString("hex");
    const resetTokenExpiry = new Date(Date.now() + 3600000); // 1 hour expiry

    // Save token and expiry to user record
    user.resetPasswordToken = resetToken;
    user.resetPasswordExpiry = resetTokenExpiry;
    await user.save();

    // Send email with reset link (Example using nodemailer)
    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: process.env.EMAIL_USER?.trim(),
        pass: process.env.EMAIL_PASS?.trim(),
      },
    });

    const resetUrl = `http://localhost:5173/resetPassword/${resetToken}`;

    const mailOptions = {
      to: email.trim(),
      from: process.env.EMAIL_USER?.trim(),
      subject: "Password Reset",
      text: `You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n
        Please click on the following link, or paste this into your browser to complete the process:\n\n
        ${resetUrl}\n\n
        If you did not request this, please ignore this email and your password will remain unchanged.\n`,
    };

    await transporter.sendMail(mailOptions);

    res.status(200).json({ message: "Password reset link sent to your email" });
  } catch (error) {
    next(error);
  }
};

// handles password reset
export const resetPassword = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { token } = req.params;
  const { password, confirmPassword } = req.body;

  if (password !== confirmPassword) {
    return res.status(400).json({ message: "Passwords do not match" });
  }

  try {
    const user = await User.findOne({
      where: {
        resetPasswordToken: token,
        resetPasswordExpiry: { [Op.gt]: new Date() }, // Check if token is not expired
      },
    });

    if (!user) {
      return res.status(400).json({ message: "Invalid or expired token" });
    }
    // Update password
    await user.update({
      password,
      resetPasswordToken: null,
      resetPasswordExpiry: null,
    });

    res.status(200).json({ message: "Password reset successful" });
  } catch (error) {
    next(error);
  }
};
