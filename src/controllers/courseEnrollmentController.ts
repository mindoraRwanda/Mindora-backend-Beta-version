import { Request, Response, NextFunction } from "express";
import CourseEnrollment from "../database/models/courseEnrollment"; // Adjust the path if necessary

// Create a new course enrollment
export const createCourseEnrollment = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { courseId, userId, enrolledDate, status, progress } = req.body;

    if (!courseId || !userId || !enrolledDate) {
      return res
        .status(400)
        .json({ message: "Missing required parameter(s)!" });
    }

    const courseEnrollment = await CourseEnrollment.create({
      courseId,
      userId,
      enrolledDate,
      status,
      progress,
    });

    return res.status(201).json(courseEnrollment);
  } catch (error) {
    next(error);
  }
};

// Get all course enrollments
export const getCourseEnrollments = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { userId } = req.params;
    if (!userId) {
      return res.status(400).json({ message: "Missing user ID parameter!" });
    }
    const enrollments = await CourseEnrollment.findAll({ where: { userId } });
    if (enrollments) {
      return res.status(200).json(enrollments);
    } else {
      return res.status(404).json({ message: "Course enrollments not found!" });
    }
  } catch (error) {
    next(error);
  }
};

// Get a course enrollment by its ID
export const getCourseEnrollmentById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ message: "Missing ID parameter!" });
    }

    const enrollment = await CourseEnrollment.findByPk(id);

    if (enrollment) {
      return res.status(200).json(enrollment);
    } else {
      return res.status(404).json({ message: "Course enrollment not found" });
    }
  } catch (error) {
    next(error);
  }
};

// Update a course enrollment
export const updateCourseEnrollment = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const data = req.body;

    if (!id || !data) {
      return res
        .status(400)
        .json({ message: "Missing required parameter(s)!" });
    }

    const enrollment = await CourseEnrollment.findByPk(id);

    if (enrollment) {
      await enrollment.update(data);
      return res.status(200).json(enrollment);
    } else {
      return res.status(404).json({ message: "Course enrollment not found" });
    }
  } catch (error) {
    next(error);
  }
};

// Delete a course enrollment
export const deleteCourseEnrollment = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ message: "Missing ID parameter!" });
    }

    const enrollment = await CourseEnrollment.findByPk(id);

    if (enrollment) {
      await enrollment.destroy();
      return res.status(204).json(); // No content response for successful deletion
    } else {
      return res.status(404).json({ message: "Course enrollment not found" });
    }
  } catch (error) {
    next(error);
  }
};
