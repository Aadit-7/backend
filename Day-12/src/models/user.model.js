const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: String,
  email: {
    type: String,
    unique: [true, "Already used email, Try different"],
  },
  password: String,
});

const userModel = mongoose.model("Users", userSchema);

module.exports = userModel;
