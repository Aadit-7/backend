const express = require("express");
const userController = require("../controllers/user.controller");
const identifyUser = require("../middlewares/auth.middleware");

const userRouter = express.Router();

/*
@route POST /api/follows/:username  - follow a user
@desc Follow a user by username
@access Private
*/
userRouter.post(
  "/follows/:username",
  identifyUser,
  userController.followController,
);

/*
@route POST /api/unfollow/:username  - unfollow a user
@desc Unfollow a user by username
@access Private
*/
userRouter.post(
  "/unfollow/:username",
  identifyUser,
  userController.unfollowController,
);

/*
@route POST /api/request/:username  - send follow request
@desc Send a follow request to a user by username
@access Private
*/
userRouter.post(
  "/request/:username",
  identifyUser,
  userController.requestController,
);

module.exports = userRouter;
