const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: [true, "Username alrady Exists"],
    required: [true, "Username is required"],
  },
  email: {
    type: String,
    unique: [true, "Email alrady Exists"],
    required: [true, "Email is required"],
  },
  password: {
    type: String,
    required: [true, "Email is required"],
    select: false,
  },
  bio: String,
  profileImage: {
    type: String,
    default: "https://ik.imagekit.io/fv3mv9soj/download.jpg",
  },
});

const userModel = mongoose.model("users", userSchema);

module.exports = userModel;
