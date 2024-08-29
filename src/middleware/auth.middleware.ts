import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { getUserByID } from "../services/userServices";

// Load environment variables
dotenv.config();

// Define a custom interface to extend the Express Request object
interface CustomRequest extends Request {
  user?: { id: string };
}

// Authentication middleware
export const authMiddleware = (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as {
      id: string;
    };
    req.user = { id: decoded.id };
    next();
  } catch (error) {
    next(error);
  }
};

// Check if the user is authenticated
export const isAuthenticated = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res
      .status(401)
      .json({ message: "Unauthorized: No authorization header" });
  }

  const token = authHeader.split(" ")[1];

  if (!token) {
    return res.status(403).json({ message: "Forbidden: No token provided" });
  }

  try {
    const decodedToken = jwt.verify(
      token,
      process.env.JWT_SECRET as string
    ) as { id: string };
    const user = await getUserByID(decodedToken.id);

    if (!user) {
      return res.status(403).json({ message: "Forbidden: Invalid token" });
    }

    req.user = user;
    return next();
  } catch (error) {
    next(error);
  }
};

// Middleware to check permissions
export const checkPermission =
  (permissionRole: string) =>
  async (req: CustomRequest, res: Response, next: NextFunction) => {
    const userInfo = req.user;
    if (userInfo) {
      const existingUser = await getUserByID(userInfo.id);
      if (existingUser && existingUser.role === permissionRole) {
        return next();
      }
    }
    return res.status(401).json({ code: 401, message: "Unauthorized" });
  };
