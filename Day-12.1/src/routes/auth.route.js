const express = require("express");
const userModel = require("../models/user.model");
const jwt = require("jsonwebtoken");

const authRouter = express.Router();

authRouter.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  const userExists = await userModel.findOne({ email });

  if (userExists) {
    return res.status(409).json({
      msg: "User with this email already exists! Try different",
    });
  }

  const user = await userModel.create({
    name,
    email,
    password,
  });

  const token = jwt.sign(
    {
      id: user._id,
    },
    process.env.JWT_SECRATE,
  );

  res.cookie("jwt_toker", token);

  res.status(201).json({
    msg: "User created",
    user,
    token,
  });
});

module.exports = authRouter;
