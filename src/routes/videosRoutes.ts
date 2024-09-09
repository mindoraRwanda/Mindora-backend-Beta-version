import { Router } from "express";
import {
  createVideo,
  getVideos,
  getVideoById,
  updateVideo,
  deleteVideo,
} from "../controllers/videoController";
import { uploadGeneral } from "../config/multerConfig";

const router = Router();

router.post("/videos", uploadGeneral.single("file"), createVideo); // Video creation
router.get("/videos/course/:courseId", getVideos); // Get all videos for a course
router.get("/videos/:id", getVideoById); // Get a specific video by ID
router.put("/videos/:id", uploadGeneral.single("file"), updateVideo); // Update a video
router.delete("/videos/:id", deleteVideo); // Delete a video

export default router;
