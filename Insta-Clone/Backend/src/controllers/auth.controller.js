const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const userModel = require("../models/user.model");

async function registerController(req, res) {
  const { username, email, password, bio, profileImage } = req.body;

  isUserExist = await userModel.findOne({
    $or: [{ email }, { username }],
  });

  if (isUserExist) {
    return res.status(409).json({
      msg:
        "User already exists" +
        (isUserExist.email === email
          ? " with this email. Try different"
          : " with this username. Try different"),
    });
  }

  const hash = await bcrypt.hash(password, 10);

  const user = await userModel.create({
    username,
    email,
    bio,
    profileImage,
    password: hash,
  });

  const token = jwt.sign(
    {
      id: user._id,
      username: user.username,
    },
    process.env.JWT_SECREAT,
    { expiresIn: "1d" },
  );

  res.cookie("token", token);

  res.status(201).json({
    msg: "User created Successfully",
    user: {
      email: user.email,
      username: user.username,
      bio: user.bio,
      profileImage: user.profileImage,
    },
  });
}

async function loginController(req, res) {
  const { email, username, password } = req.body;

  const user = await userModel
    .findOne({
      $or: [
        {
          username: username,
        },
        {
          email: email,
        },
      ],
    })
    .select("+password");

  if (!user) {
    return res.status(404).json({
      msg: "User not found",
    });
  }

  const passwordValid = await bcrypt.compare(password, user.password);

  if (!passwordValid) {
    return res.status(404).json({
      msg: "Unvalid password",
    });
  }

  const token = jwt.sign(
    {
      id: user._id,
      username: user.username,
    },
    process.env.JWT_SECREAT,
    { expiresIn: "1d" },
  );

  res.cookie("token", token);

  res.status(200).json({
    msg: "Logged in successfully",
    user: {
      username: user.username,
      email: user.email,
      bio: user.bio,
      profileImage: user.profileImage,
    },
  });
}

async function getMeController(req, res) {
  const userId = req.user.id;

  const user = await userModel.findById(userId);

  res.status(200).json({
    user: {
      username: user.username,
      email: user.email,
      bio: user.bio,
      profileImage: user.profileImage,
    },
  });
}
module.exports = {
  registerController,
  loginController,
  getMeController,
};
