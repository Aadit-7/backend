const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: [true, "Username must be unique"],
    required: [true, "Username is required"],
  },
  email: {
    type: String,
    unique: [true, "Username must be unique"],
    required: [true, "Username is required"],
  },
  password: {
    type: String,
    required: [true, "Username is required"],
    select: false,
  },
});

const userModel = mongoose.model("user", userSchema);

module.exports = userModel;
