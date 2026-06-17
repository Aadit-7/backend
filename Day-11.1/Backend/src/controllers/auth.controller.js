import userModel from "../models/user.model.js";
import jwt from "jsonwebtoken";

export async function registerController(req, res) {
  const { username, email, password } = req.body;

  const isAlreadyExists = await userModel.findOne({
    $or: [{ email }, { username }],
  });

  if (isAlreadyExists) {
    return res.status(400).json({
      msg:
        isAlreadyExists.username == username
          ? "User with this username is already exists! Try different"
          : "User with this email is already exists! Try different",
      success: false,
      err: "User already exists",
    });
  }

  const user = await userModel.create({ username, email, password });
  console.log(user);
  res.status(201).json({
    msg: "User registered successfully",
    success: true,
    user: {
      id: user._id,
      username: user.username,
      email: user.email,
    },
  });
}

export async function loginController(req, res) {
  const { email, password } = req.body;

  const user = await userModel.findOne({ email });

  if (!user) {
    return res.status(400).json({
      msg: "User with this email dosen't exists! Try different",
      success: false,
      err: "User dosen't exists",
    });
  }

  const passwordMatch = await user.comparePassword(password);

  if (!passwordMatch) {
    return res.status(400).json({
      msg: "Password is wrong. Try again",
      success: false,
      err: "Invalid Password",
    });
  }

  const token = jwt.sign(
    {
      id: user._id,
      username: user.username,
    },
    process.env.JWT_SECRET,
    { expiresIn: "7d" },
  );

  res.cookie("token", token);

  res.status(200).json({
    msg: "User logged in successfully",
    success: true,
    user: {
      id: user._id,
      username: user.username,
      email: user.email,
    },
  });
}

export async function getMeController(req, res) {
  const userId = req.user.id;

  const user = await userModel.findOne({ _id: userId }).select("-password");

  if (!user) {
    return res.status(400).json({
      msg: "User with this credential dosen't exists! Try different",
      success: false,
      err: "User dosen't exists",
    });
  }

  res.status(200).json({
    msg: "User featched successfully",
    success: true,
    user,
  });
}
