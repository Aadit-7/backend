const postModel = require("../models/post.model");
const ImageKit = require("@imagekit/nodejs");
const { toFile } = require("@imagekit/nodejs");
const jwt = require("jsonwebtoken");

const imagekit = new ImageKit({
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
});

async function createPostController(req, res) {
  const token = req.cookies.token;
  // console.log(req.body, req.file, token);
  // console.log(token);

  if (!token) {
    return res.status(401).json({
      msg: "Token not provided. Login / Register again",
    });
  }
  let decoded = null;
  try {
    decoded = jwt.verify(token, process.env.JWT_SECREAT);

    // console.log(decoded.id);
  } catch (error) {
    res.status(401).json({
      msg: "No id in the token ",
    });
  }

  const file = await imagekit.files.upload({
    file: await toFile(Buffer.from(req.file.buffer), "file"),
    fileName: "Test",
    folder: "Cohot-2-Insta-clone",
  });

  // res.send(file);

  const post = await postModel.create({
    caption: req.body.caption,
    imgUrl: file.url,
    user: decoded.id,
  });

  res.status(201).json({
    msg: "Post created Successfully",
    post,
  });
}

async function fetechPostController(req, res) {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({
      msg: "Token is not provided. Login again",
    });
  }

  let decoded;
  try {
    decoded = jwt.verify(token, process.env.JWT_SECREAT);
  } catch (error) {
    return res.status(401).json({
      msg: "Token is not provided",
    });
  }
  const userId = decoded.id;
  const post = await postModel.find({
    user: userId,
  });

  res.status(200).json({
    msg: "Posts featched successfully",
    post,
  });
}

async function getPostDetailsController(req, res) {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({
      msg: "Token is not provided. Login again",
    });
  }

  let decoded;

  try {
    decoded = jwt.verify(token, process.env.JWT_SECREAT);
  } catch (error) {
    res.status(401).json({
      msg: "No token provided",
    });
  }

  const userId = decoded.id;
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
module.exports = {
  createPostController,
  fetechPostController,
  getPostDetailsController,
};
