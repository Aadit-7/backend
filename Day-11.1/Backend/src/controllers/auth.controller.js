import userModel from "../models/user.model.js";

export async function registerController(req, res) {
  const { username, email, password } = req.body;

  const isAlreadyExists = await userModel.findOne({
    $or: [{ username }, { email }],
  });

  if (isAlreadyExists) {
    return res.status(400).json({
      message:
        isAlreadyExists.username == username
          ? "User with this username is alredy exist! Try different"
          : "User with this email is alredy exist! Try different",

      success: false,
      error: "User already exists",
    });
  }
}
