const postModel = require("../models/post.model");
const ImageKit = require("@imagekit/nodejs");
const { toFile } = require("@imagekit/nodejs");
const likeModel = require("../models/like.model");

const imagekit = new ImageKit({
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
});

async function createPostController(req, res) {
  const file = await imagekit.files.upload({
    file: await toFile(Buffer.from(req.file.buffer), "file"),
    fileName: "Test",
    folder: "Cohot-2-Insta-clone",
  });

  // console.log(file);
  /*
  If there is an error like can't read the buffer then just change the image and it will works
  */

  const post = await postModel.create({
    caption: req.body.caption,
    imgUrl: file.url,
    user: req.user.id,
  });

  res.status(201).json({
    msg: "Post created Successfully",
    post,
  });
}

async function fetechPostController(req, res) {
  const userId = req.user.id;
  const post = await postModel.find({
    // use find only here not findOne because that gives fist created post only not the all posts
    user: userId,
  });

  res.status(200).json({
    msg: "Posts featched successfully",
    post,
  });
}

async function getPostDetailsController(req, res) {
  const userId = req.user.id;
  const postId = req.params.postId;

  const post = await postModel.findById(postId);

  if (!post) {
    return res.status(404).json({
      msg: "Page not Found",
    });
  }

  // console.log(post.user === userId);

  const isUserValidate = post.user.toString() === userId;

  if (!isUserValidate) {
    return res.status(403).json({
      msg: "Forbidden Contend (You are not allowed to see this post)",
    });
  }

  res.status(200).json({
    msg: "Post fetched Successfully",
    post,
  });
}

async function likePostController(req, res) {
  const username = req.user.username;
  const postId = req.params.postId;

  const isVaidPost = await postModel.findOne({ _id: postId });

  if (!isVaidPost) {
    return res.status(404).json({
      msg: "Post not found",
    });
  }

  const alreadyLike = await likeModel.findOne({
    post: postId,
    user: username,
  });

  if (alreadyLike) {
    return res.status(200).json({
      msg: "You have liked this post already",
    });
  }

  const post = await likeModel.create({
    post: postId,
    user: username,
  });

  res.status(201).json({
    msg: "Post liked successfully",
    post,
  });
}

async function getFeedPostsController(req, res) {
  const post = await postModel.find().populate("user");

  res.status(200).json({
    msg: "Feed fetched successfully",
    post,
  });
}

module.exports = {
  createPostController,
  fetechPostController,
  getPostDetailsController,
  likePostController,
  getFeedPostsController,
};
