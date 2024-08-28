import { body, ValidationChain } from "express-validator";

// Define validation rules for registration
export const registerValidation: ValidationChain[] = [
  body("email").isEmail().withMessage("Please enter a valid email address."),
  body("password")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters long.")
    .matches(/\d/)
    .withMessage("Password must contain at least one number.")
    .matches(/[A-Z]/)
    .withMessage("Password must contain at least one uppercase letter.")
    .matches(/[a-z]/)
    .withMessage("Password must contain at least one lowercase letter.")
    .matches(/[@$!%*?&#]/)
    .withMessage("Password must contain at least one special character."),
];

// Define validation rules for login
export const loginValidation: ValidationChain[] = [
  body("email").isEmail().withMessage("Please enter a valid email address."),
  body("password").notEmpty().withMessage("Password is required."),
];

// Define validation rules for forgot password
export const forgotPasswordValidation: ValidationChain[] = [
  body("email").isEmail().withMessage("Please enter a valid email address."),
];

// Define validation rules for password reset
export const resetPasswordValidation: ValidationChain[] = [
  body("password")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters long.")
    .matches(/\d/)
    .withMessage("Password must contain at least one number.")
    .matches(/[A-Z]/)
    .withMessage("Password must contain at least one uppercase letter.")
    .matches(/[a-z]/)
    .withMessage("Password must contain at least one lowercase letter.")
    .matches(/[@$!%*?&#]/)
    .withMessage("Password must contain at least one special character."),
];
