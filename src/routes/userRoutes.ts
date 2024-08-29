import { Router } from "express";
import {
  createUser,
  updateUser,
  getAllUsers,
  getUserById,
  deleteUser,
  uploadProfile,
} from "../controllers/userController";
import { uploadProfilePic } from "../config/multerConfig";

const router = Router();

router.post("/users", createUser);
router.get("/users", getAllUsers);
router.get("/users/:id", getUserById);
router.put("/users/:id", updateUser);
router.delete("/users/:id", deleteUser);
router.post(
  "/upload/:userId",
  uploadProfilePic.single("profile"),
  uploadProfile
);

export default router;
