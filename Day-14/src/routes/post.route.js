const express = require("express");
const postRouter = express.Router();
const postController = require("../controllers/post.constroller");

const multer = require("multer");
const upload = multer({ storage: multer.memoryStorage() });

/*
POST /api/  - create post
*/
postRouter.post(
  "/",
  upload.single("image"),
  postController.createPostController,
);

/*
GET /api/  - create post
*/
postRouter.get("/", postController.fetechPostController);

/*
GET /api/details:postId  - create post
*/
postRouter.get("/details/:postId", postController.getPostDetailsController)

module.exports = postRouter;
