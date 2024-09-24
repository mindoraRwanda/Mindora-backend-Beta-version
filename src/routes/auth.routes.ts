import { Router } from "express";
import { register, login } from "../controllers/auth.controller";
import {
  registerValidation,
  loginValidation,
  resetPasswordValidation,
  forgotPasswordValidation,
} from "../middleware/validation.middleware";
import {
  requestPasswordReset,
  resetPassword,
} from "../controllers/auth.controller";
import { uploadProfilePic } from "../config/multerConfig";

const router = Router();

router.post(
  "/register",
  uploadProfilePic.single("profile"),
  registerValidation,
  register
);
router.post("/login", loginValidation, login);
router.post("/forgot_password", forgotPasswordValidation, requestPasswordReset);
router.post("/reset_password/:token", resetPasswordValidation, resetPassword);

export default router;
