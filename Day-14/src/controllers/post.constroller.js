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

module.exports = {
  createPostController,
};
