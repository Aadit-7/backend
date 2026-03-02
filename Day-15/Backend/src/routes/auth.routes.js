const express = require("express");
const authController = require("../controller/auth.controller");
const authMiddleware = require("../middleware/auth.middleware");

const router = express.Router();

/**
 *@route POST /v1/auth/register
 */
router.post("/register", authController.registerController);

/**
 *@route POST /v1/auth/login
 */
router.post("/login", authController.loginController);

/**
 * /@route GET /v1/auth/get-me
 */
router.get("/get-me", authMiddleware.authUser, authController.getMeController);

module.exports = router;
