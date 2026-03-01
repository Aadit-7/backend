const express = require("express");
const authController = require("../controller/auth.controller");

const router = express.Router();

/**
*@route /v1/auth/register
*/
router.post("/register", authController.registerController);

/*
/v1/auth/login
*/
router.post("/login", authController.loginController);

module.exports = router;
