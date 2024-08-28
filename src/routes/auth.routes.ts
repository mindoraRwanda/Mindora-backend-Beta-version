import { Router } from "express";
import { register, login } from "../controllers/auth.controller";
import {
  registerValidation,
  loginValidation,
} from "../middleware/validation.middleware";
import {
  requestPasswordReset,
  resetPassword,
} from "../controllers/auth.controller";

const router = Router();

router.post("/register", registerValidation, register);
router.post("/login", loginValidation, login);
router.post("/forgot_password", requestPasswordReset);
router.post("/reset_password/:token", resetPassword);

export default router;
