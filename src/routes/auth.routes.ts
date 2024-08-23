import { Router } from "express";
import { register, login } from "../controllers/auth.controller";
import {
  registerValidation,
  loginValidation,
} from "../middleware/validation.middleware";

const router = Router();

router.post("/register", registerValidation, register);
router.post("/login", loginValidation, login);

export default router;
