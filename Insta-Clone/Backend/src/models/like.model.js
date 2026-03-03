const mongoose = require("mongoose");

const likeSchema = new mongoose.Schema(
  {
    post: {
      ref: "posts",
      type: mongoose.Schema.Types.ObjectId,
      required: [true, "Post id is required to like a post"],
    },
    user: {
      type: String,
      required: [true, "User id is required to like a post"],
    },
  },
  {
    timestamps: true,
  },
);

likeSchema.index({ post: 1, user: 1 }, { unique: true });

const likeModel = mongoose.model("likes", likeSchema);

module.exports = likeModel;
