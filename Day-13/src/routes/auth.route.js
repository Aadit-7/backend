const express = require("express");
const userModel = require("../models/user.model");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

const authRouter = express.Router();

/*
POST /register
*/
authRouter.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  const userExists = await userModel.findOne({ email });

  if (userExists) {
    return res.status(409).json({
      msg: "User with this email already exists! Try different",
    });
  }

  const hash = crypto.createHash("md5").update(password).digest("hex");

  const user = await userModel.create({
    name,
    email,
    password: hash,
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

/*
POST /login
*/
authRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const user = await userModel.findOne({ email });

  if (!user) {
    return res.status(400).json({
      msg: "User with this email dosen't exists !! Try other",
    });
  }

  const checkPassword =
    user.password === crypto.createHash("md5").update(password).digest("hex");

  if (!checkPassword) {
    return res.status(400).json({
      msg: "Wrong Password !! Try other",
    });
  }

  res.status(200).json({
    msg: "User logged in successfully !!",
    user,
  });
});

module.exports = authRouter;
