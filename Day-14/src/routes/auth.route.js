const express = require("express");
const userModel = require("../models/user.model");

const authRouter = express.Router();

authRouter.post("/register", async (req, res) => {
  const { username, email, password, bio, profileImage } = req.body;

  const isUserExistsByEmail = await userModel.findOne({ email });

  if (isUserExistsByEmail) {
    return res.status(409).json({
      msg: "User already exists with this email. Try different",
    });
  }
  const isUserExistsByUsername = await userModel.findOne({ username });

  if (isUserExistsByUsername) {
    return res.status(409).json({
      msg: "User already exists with this username. Try different",
    });
  }
});
