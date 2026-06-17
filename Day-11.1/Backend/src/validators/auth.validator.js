import { body, validationResult } from "express-validator";

export async function validate(req, res, next) {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  next();
}

export const registerValidator = [
  body("username")
    .trim()
    .notEmpty()
    .withMessage("Username must not be empty")
    .isLength({ min: 3, max: 30 })
    .withMessage("Username must be between 3 to 30 characters")
    .matches(/^[a-zA-Z0-9_]+$/)
    .withMessage("Username only contains letters, numbers and underscore"),

  body("email")
    .trim()
    .notEmpty()
    .withMessage("Email must not be empty")
    .isEmail()
    .withMessage("Please provide valid email"),

  body("password")
    .notEmpty()
    .withMessage("Password must not be empty")
    .isLength({ min: 6 })
    .withMessage("Password length must be more than 6  "),

  validate,
];

export const loginValidators = [
  body("email")
    .trim()
    .notEmpty()
    .withMessage("Email must not be empty")
    .isEmail()
    .withMessage("Please provide valid email"),

  body("password").notEmpty().withMessage("Password must not be empty"),

  validate,
];
