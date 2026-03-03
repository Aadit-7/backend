const userModel = require("../models/user.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

async function registerController(req, res) {
  const { username, email, password } = req.body;

  const isUserExists = await userModel.findOne({
    $or: [{ email }, { username }],
  });

  if (isUserExists) {
    return res.status(400).json({
      msg:
        isUserExists.email == email
          ? "User with this email is already exist. Try different"
          : "User with this username is already exist. Try different",
    });
  }

  const hash = await bcrypt.hash(password, 10);

  const user = await userModel.create({
    username,
    email,
    password: hash,
  });

  const token = jwt.sign(
    {
      id: user._id,
      username: user.username,
    },
    process.env.JWT_SECRET,
    { expiresIn: "3d" },
  );

  //   console.log(user);

  res.cookie("token", token);

  res.status(201).json({
    msg: "User registered successfully",
    user: {
      id: user._id,
      username: user.username,
      email: user.email,
    },
  });
}

async function loginController(req, res) {
  const { username, email, password } = req.body;

  const user = await userModel
    .findOne({
      $or: [{ email }, { username }],
    })
    .select("+password");

  if (!user) {
    return res.status(400).json({
      msg: user.email == email ? "Invalid email" : "Invalid username",
    });
  }

  const isPasswordValidate = await bcrypt.compare(password, user.password);

  if (!isPasswordValidate) {
    return res.status(400).json({
      msg: "Incorrect password",
    });
  }

  const token = jwt.sign(
    {
      id: user._id,
      username: user.username,
    },
    process.env.JWT_SECRET,
    { expiresIn: "3d" },
  );

  res.cookie("token", token);

  res.status(200).json({
    msg: "User logged in successfully",
  });
}

async function getMeController(req, res) {
  console.log(req.user);
  const user = await userModel.findById(req.user.id);

  res.status(200).json({
    msg: "User fetched successfully",
    user,
  });
}

async function logoutController(req, res) {}

module.exports = {
  registerController,
  loginController,
  getMeController,
  logoutController,
};
