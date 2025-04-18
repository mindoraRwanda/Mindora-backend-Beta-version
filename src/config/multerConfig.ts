import multer, { StorageEngine, FileFilterCallback } from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "./cloudinaryConfig";
import path from "path";
import { Request } from "express";

// Storage engine for uploads
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: async (req: Request, file: Express.Multer.File) => {
    const mimeToFormatMap: { [key: string]: string } = {
      "image/jpeg": "jpg",
      "image/png": "png",
      "image/gif": "gif",
      "application/pdf": "pdf",
      "application/msword": "doc",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
        "docx",
      "video/mp4": "mp4",
      "video/x-msvideo": "avi",
      "video/x-matroska": "mkv",
      "audio/mpeg": "mp3",
      "audio/wav": "wav",
      "audio/aac": "aac",
      "audio/ogg": "ogg",
    };
    let resource_type = "auto";
    if (file.mimetype.startsWith("image/")) {
      resource_type = "image";
    } else if (file.mimetype.startsWith("video/")) {
      resource_type = "video";
    } else if (file.mimetype.startsWith("application/")) {
      resource_type = "raw";
    }
    console.log(
      "Format:",
      mimeToFormatMap[file.mimetype] || undefined,
      "resourceType:",
      resource_type
    );
    return {
      folder: "uploads",
      format: mimeToFormatMap[file.mimetype] || undefined, // Preserve original format if not found
      public_id: `${Date.now()}-${file.originalname.split(".")[0]}`, // Use original name without extension as part of the public ID
      resource_type: resource_type,
    };
  },
});

// File filter for profile pictures
const profilePicFilter = (
  req: Request,
  file: Express.Multer.File,
  cb: FileFilterCallback
) => {
  const allowedTypes = /jpeg|jpg|png/;
  const extname = allowedTypes.test(
    path.extname(file.originalname).toLowerCase()
  );
  const mimetype = allowedTypes.test(file.mimetype);

  if (extname && mimetype) {
    cb(null, true);
  } else {
    cb(
      new Error(
        "Only images (jpeg, jpg, png) are allowed for profile pictures."
      )
    );
  }
};

// General file filter (images, videos, documents, audio files, voice notes)
const generalFileFilter = (
  req: Request,
  file: Express.Multer.File,
  cb: FileFilterCallback
) => {
  const allowedTypes =
    /jpeg|jpg|png|gif|pdf|doc|docx|mp4|avi|mkv|mp3|mpeg|wav|aac|ogg|m4a/;
  const extname = allowedTypes.test(
    path.extname(file.originalname).toLowerCase()
  );
  const mimetype = allowedTypes.test(file.mimetype);
  console.log(
    "mimetype",
    file.mimetype,
    "mimeType: ",
    mimetype,
    "extname:",
    extname
  );

  if (extname && mimetype) {
    console.log("passed");
    cb(null, true);
  } else {
    cb(
      new Error(
        "Unsupported file type. Only images, documents, videos, and audio files are allowed."
      )
    );
  }
};

// Multer setup for profile picture uploads
export const uploadProfilePic = multer({
  storage,
  fileFilter: profilePicFilter,
  limits: { fileSize: 1024 * 1024 * 5 }, // 5MB limit for profile pictures
});

// Multer setup for general file uploads
export const uploadGeneral = multer({
  storage,
  fileFilter: generalFileFilter,
  // limits: { fileSize: 1024 * 1024 * 500 }, // 500MB limit for general files (e.g., video tutorials)
});
