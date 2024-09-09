import { Request, Response, NextFunction } from "express";
import Course from "../database/models/course"; // Adjust the path if necessary

// Create a new course
export const createCourse = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { title, description, instructor, category, duration, level, price } =
      req.body;

    if (
      !title ||
      !description ||
      !instructor ||
      !category ||
      !duration ||
      !price
    ) {
      return res
        .status(400)
        .json({ message: "Missing required parameter(s)!" });
    }

    const course = await Course.create({
      title,
      description,
      instructor,
      category,
      duration,
      level,
      price,
    });

    return res.status(201).json(course);
  } catch (error) {
    next(error);
  }
};

// Get all courses
export const getCourses = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const courses = await Course.findAll();
    if (courses) {
      return res.status(200).json(courses);
    } else {
      return res.status(404).json({ message: "Courses not found!" });
    }
    return res.status(200).json(courses);
  } catch (error) {
    next(error);
  }
};

// Get a course by its ID
export const getCourseById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ message: "Missing ID parameter!" });
    }

    const course = await Course.findByPk(id);

    if (course) {
      return res.status(200).json(course);
    } else {
      return res.status(404).json({ message: "Course not found" });
    }
  } catch (error) {
    next(error);
  }
};

// Update a course
export const updateCourse = async (
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

    const course = await Course.findByPk(id);

    if (course) {
      await course.update(data);
      return res.status(200).json(course);
    } else {
      return res.status(404).json({ message: "Course not found" });
    }
  } catch (error) {
    next(error);
  }
};

// Delete a course
export const deleteCourse = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ message: "Missing ID parameter!" });
    }

    const course = await Course.findByPk(id);

    if (course) {
      await course.destroy();
      return res.status(204).json(); // No content response for successful deletion
    } else {
      return res.status(404).json({ message: "Course not found" });
    }
  } catch (error) {
    next(error);
  }
};
