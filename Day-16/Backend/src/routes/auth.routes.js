const express = require("express");
const authController = require("../controllers/auth.controller");
const authMiddleware = require("../middlewares/auth.middleware");

const router = express.Router();

/**
 * /@route POST /v2/auth/register
 */
router.post("/register", authController.registerController);

/**
 * /@route POST /v2/auth/login
 */
router.post("/login", authController.loginController);

/**
 * /@route GET /v2/auth/get-me
 */
router.get("/get-me", authMiddleware.authUser, authController.getMeController);

module.exports = router;
