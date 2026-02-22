const express = require("express");
const postRouter = express.Router();
const postController = require("../controllers/post.controller");

const multer = require("multer");
const upload = multer({ storage: multer.memoryStorage() });

const identifyUser = require("../middlewares/auth.middleware");

/*
@route POST /api/  - create post
@desc Create a new post
@access Private
*/
postRouter.post(
  "/",
  upload.single("image"),
  identifyUser,
  postController.createPostController,
);

/*
@route GET /api/  - fetech all post
@desc Fetech all post
@access Private
*/
postRouter.get("/", identifyUser, postController.fetechPostController);

/*
@route GET /api/details/:postId  - get post details
@desc Get post details by postId
@access Private
*/
postRouter.get(
  "/details/:postId",
  identifyUser,
  postController.getPostDetailsController,
);

/*
@route POST /api/like/:postId  - like a post
@desc Like a post by postId
@access Private
*/
postRouter.post(
  "/like/:postId",
  identifyUser,
  postController.likePostController,
);
module.exports = postRouter;
