const express = require("express");
const authRouter = express.Router();
const authController = require("../controllers/auth.controller");

/*
@route POST /auth/register
@desc Register a new user
@access Public
*/
authRouter.post("/register", authController.registerController);

/*
@route POST /auth/login
@desc Login a user and return a JWT token
@access Public
*/
authRouter.post("/login", authController.loginController);

module.exports = authRouter;
