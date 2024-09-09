import express from "express";
import {
  createCourseEnrollment,
  getCourseEnrollments,
  getCourseEnrollmentById,
  updateCourseEnrollment,
  deleteCourseEnrollment,
} from "../controllers/courseEnrollmentController";

const router = express.Router();

router.post("/course-enrollments", createCourseEnrollment);
router.get("/course-enrollments/user/:userId", getCourseEnrollments);
router.get("/course-enrollments/:id", getCourseEnrollmentById);
router.put("/course-enrollments/:id", updateCourseEnrollment);
router.delete("/course-enrollments/:id", deleteCourseEnrollment);

export default router;
