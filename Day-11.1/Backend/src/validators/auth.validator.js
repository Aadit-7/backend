import { body, validationResult } from "express-validator";

export function validate(req, res, next) {
  const errors = validationResult(req);
  if (!error.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
}

export const registerValidator = [
  body("username")
    .trim()
    .notEmpty()
    .withMessage("username sholud not be empty")
    .matches(/^[a-zA-Z0-9_]+$/)
    .withMessage("Username must constains character, numbers and underscore")
    .isLength({ min: 3, max: 30 })
    .withMessage("Username must be between 3-30 characters"),

  body("email")
    .trim()
    .notEmpty()
    .withMessage("Email should not be empty")
    .isEmail()
    .withMessage("Please provide valid email"),

  body("password")
    .notEmpty()
    .withMessage("Password should not be empty")
    .isLength({ min: 6 })
    .withMessage("Password must be atleast 6 characters "),

  validate,
];
