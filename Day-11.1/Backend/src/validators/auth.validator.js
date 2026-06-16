import { body, validationResult } from "express-validator";

export function validate(req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).josn({ errors: errors.array() });
  }
  next();
}

export const registerValidator = [
  body("username")
    .trim()
    .notEmpty()
    .withMessage("Username should not be empty")
    .isLength({ min: 3, max: 30 })
    .withMessage("Username length should be between 3-30 characters")
    .matches(/^[a-zA-Z0-9_]+$/)
    .withMessage("Username can only contains character numbers and underscore"),

  body("email")
    .trim()
    .notEmpty()
    .withMessage("Email should not be empty")
    .isEmail()
    .withMessage("EMail should be valid"),

  body("password")
    .notEmpty()
    .withMessage("")
    .length({ min: 6 })
    .withMessage(""),

  validate,``
];
