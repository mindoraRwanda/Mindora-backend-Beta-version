import multer, { StorageEngine, FileFilterCallback } from "multer";
import path from "path";
import fs from "fs";
import { Request } from "express";

// Storage engine for uploads
const storage: StorageEngine = multer.diskStorage({
  destination: (
    req: Request,
    file: Express.Multer.File,
    cb: (error: Error | null, destination: string) => void
  ) => {
    const uploadPath = path.join(__dirname, "..", "uploads");
    // Ensure directory exists
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }

    cb(null, uploadPath);
  },
  filename: (
    req: Request,
    file: Express.Multer.File,
    cb: (error: Error | null, filename: string) => void
  ) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

// File filter for profile picture
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
    /jpeg|jpg|png|gif|pdf|doc|docx|mp4|avi|mkv|mp3|wav|aac|ogg/;
  const extname = allowedTypes.test(
    path.extname(file.originalname).toLowerCase()
  );
  const mimetype = allowedTypes.test(file.mimetype);

  if (extname && mimetype) {
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
  limits: { fileSize: 1024 * 1024 * 100 }, // 100MB limit for general files (e.g., video tutorials)
});
