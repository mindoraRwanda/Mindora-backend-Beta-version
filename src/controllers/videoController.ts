import { Request, Response, NextFunction } from "express";
import Video from "../database/models/video";
import { v2 as cloudinary } from "cloudinary";
import ffmpeg from "fluent-ffmpeg";
import path from "path";

// Create a video
export const createVideo = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { courseId, title, description, publishedDate, category } = req.body;
    const { file, thumbnail } = req.files as {
      file: Express.Multer.File[];
      thumbnail: Express.Multer.File[];
    };

    // Check required fields
    if (
      !courseId ||
      !title ||
      !description ||
      !publishedDate ||
      !category ||
      !file.length
    ) {
      return res.status(400).json({ message: "Missing parameter(s)!" });
    }
    // Extract the file path
    const filePath = file?.[0].path;

    // Use fluent-ffmpeg to calculate video duration
    ffmpeg.ffprobe(filePath, async (err, metadata) => {
      if (err) {
        return next(err);
      }

      // Extract video duration from metadata (in seconds)
      const durationInSeconds = metadata.format.duration
        ? Math.round(metadata.format.duration)
        : 0;

      // Create the video record in the database
      const video = await Video.create({
        courseId,
        title,
        description,
        publishedDate,
        category,
        url: filePath, // Store the Cloudinary URL or the uploaded path
        duration: durationInSeconds, // Automatically set the video duration
        thumbnail: thumbnail?.[0].path,
      });

      return res.status(201).json(video);
    });
  } catch (error) {
    next(error);
  }
};

// Update a video
export const updateVideo = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const { file, thumbnail } = req.files as {
      file: Express.Multer.File[];
      thumbnail: Express.Multer.File[];
    };
    const data = req.body;

    if (!id || !data) {
      return res.status(400).json({ message: "Missing parameter(s)!" });
    }

    const video = await Video.findByPk(id);

    if (!video) {
      return res.status(404).json({ message: "Video not found." });
    }

    // Update the video record
    await video.update({
      ...data,
      url: file.length > 0 ? file[0].path : video.url,
      thumbnail: thumbnail.length > 0 ? thumbnail[0].path : video.thumbnail,
    });

    res.status(200).json(video);
  } catch (error) {
    next(error);
  }
};

// Get all videos
export const getVideos = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { courseId } = req.params;
    if (!courseId) {
      return res.status(400).json({ message: "Missing course ID parameter!" });
    }
    const videos = await Video.findAll({ where: { courseId } });

    if (videos.length > 0) {
      return res.status(200).json(videos);
    } else {
      return res.status(404).json({ message: "No course videos found." });
    }
  } catch (error) {
    next(error);
  }
};

// Get video by ID
export const getVideoById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ message: "Missing ID parameter!" });
    }

    const video = await Video.findByPk(id);

    if (video) {
      return res.status(200).json(video);
    } else {
      return res.status(404).json({ message: "Video not found." });
    }
  } catch (error) {
    next(error);
  }
};

// Delete a video
export const deleteVideo = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ message: "Missing ID parameter!" });
    }

    const video = await Video.findByPk(id);

    if (!video) {
      return res.status(404).json({ message: "Video not found." });
    }

    if (video.url) {
      // Parse the Cloudinary URL and get the public ID
      const parsedUrl = path.parse(video.url);
      const publicId = parsedUrl.name; // Get the file name without the extension
      await cloudinary.uploader.destroy(`uploads/${publicId}`); // Delete the file from Cloudinary
    }

    await video.destroy();

    return res.status(204).json();
  } catch (error) {
    next(error);
  }
};
