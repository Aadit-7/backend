const express = require("express");
const postRouter = express.Router();
const postController = require("../controllers/post.controller");

const multer = require("multer");
const upload = multer({ storage: multer.memoryStorage() });

const identifyUser = require("../middlewares/auth.middleware");

/*
POST /api/  - create post
*/
postRouter.post(
  "/",
  upload.single("image"),
  identifyUser,
  postController.createPostController,
);

/*
GET /api/  - create post
*/
postRouter.get("/", identifyUser, postController.fetechPostController);

/*
GET /api/details:postId  - create post
*/
postRouter.get(
  "/details/:postId",
  identifyUser,
  postController.getPostDetailsController,
);

module.exports = postRouter;
