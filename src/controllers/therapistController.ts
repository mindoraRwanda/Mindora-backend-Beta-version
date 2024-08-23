import { Request, Response, NextFunction } from "express";
import Therapist from "../database/models/therapist";
import User from "../database/models/user";

// Create a new therapist
export const createTherapist = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { personalInformation, diploma, licence, userId } = req.body;
    if (!personalInformation || !diploma || !licence || !userId) {
      return res.status(400).json({ message: "Missing parameter(s)!" });
    }

    const therapist = await Therapist.create({
      personalInformation,
      diploma,
      licence,
      userId,
    });

    return res.status(201).json(therapist);
  } catch (error) {
    // pass error to errorHandler middleware
    next(error);
  }
};

// Get a single therapist by ID
export const getTherapistById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ message: "Missing parameter(s)!" });
    }
    const therapist = await Therapist.findByPk(id, {
      include: {
        model: User,
        as: "user",
      },
    });

    if (!therapist) {
      return res.status(404).json({ message: "Therapist not found" });
    }

    return res.status(200).json(therapist);
  } catch (error) {
    // pass error to errorHandler middleware
    next(error);
  }
};

// Get all therapists
export const getAllTherapists = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const therapists = await Therapist.findAll({
      include: { model: User, as: "user" },
    });
    return res.status(200).json(therapists);
  } catch (error) {
    // pass error to errorHandler middleware
    next(error);
  }
};

// Update a therapist by ID
export const updateTherapist = async (
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

    const therapist = await Therapist.findByPk(id);

    if (!therapist) {
      return res.status(404).json({ message: "Therapist not found" });
    }

    await therapist.update(data);

    return res.status(200).json(therapist);
  } catch (error) {
    // pass error to errorHandler middleware
    next(error);
  }
};

// Delete a therapist by ID
export const deleteTherapist = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ message: "Missing parameter(s)!" });
    }
    const therapist = await Therapist.findByPk(id);

    if (!therapist) {
      return res.status(404).json({ message: "Therapist not found" });
    }

    await therapist.destroy();

    return res.status(204).json();
  } catch (error) {
    // pass error to errorHandler middleware
    next(error);
  }
};
