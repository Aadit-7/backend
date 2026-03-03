const express = require("express");
const authController = require("../controllers/auth.controller");
const authMiddleware = require("../middleware/auth.middleware");
const router = express.Router();

/**
 * /@route POST /api/auth/register
 */
router.post("/register", authController.registerController);

/**
 * /@route POST /api/auth/login
 */
router.post("/login", authController.loginController);

/**
 * /@route GET /api/auth/get-me
 */
router.get("/get-me", authMiddleware.authUser, authController.getMeController);

/**
 * /@route GET /api/auth/logout
 */
router.get("/logout", authController.logoutController);

module.exports = router;
