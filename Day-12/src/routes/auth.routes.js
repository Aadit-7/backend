const express = require("express");
const userModel = require("../models/user.model");
const jwt = require("jsonwebtoken");

const authRouter = express.Router();

authRouter.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  const isEmailExists = await userModel.findOne({ email });

  if (isEmailExists) {
    return res.status(422).json({
      msg: "Email alredy exists Try different",
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
    process.env.JWT_SECRET,
  );

  res.cookie("jwt_cookie", token);

  res.status(201).json({
    msg: "User crated",
    user,
    token,
  });
});
module.exports = authRouter;
