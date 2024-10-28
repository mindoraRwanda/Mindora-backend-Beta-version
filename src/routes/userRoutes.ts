import { Router } from "express";
import {
  createUser,
  updateUser,
  getAllUsers,
  getUserById,
  deleteUser,
  updateProfile,
} from "../controllers/userController";
import { uploadProfilePic } from "../config/multerConfig";
// import { changePasswordValidation } from "../middleware/validation.middleware";
import { changePassword } from "../controllers/userController";

const router = Router();

router.post("/users", createUser);
router.get("/users", getAllUsers);
router.get("/users/:id", getUserById);
router.put("/users/:id", updateUser);
router.delete("/users/:id", deleteUser);
router.post(
  "/upload/:userId",
  uploadProfilePic.single("profile"),
  updateProfile
);
router.post("/users/:userId/change_password", changePassword);

export default router;
