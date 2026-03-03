const followModel = require("../models/follow.model");
const userModel = require("../models/user.model");
const likeModel = require("../models/like.model");

async function followController(req, res) {
  const followerUsername = req.user.username;
  const followeeUsername = req.params.username;

  // console.log(followeeUsername, followerUsername);
  //  // ok till here

  if (followeeUsername == followerUsername) {
    return res.status(400).json({
      msg: "You can't follow yourself",
    });
  }

  const isAlreadyFollowing = await followModel.findOne({
    follower: followerUsername,
    followee: followeeUsername,
  });

  if (isAlreadyFollowing) {
    return res.status(200).json({
      msg: `You are alrady following to the ${followeeUsername}`,
    });
  }

  const isUserExists = await userModel.findOne({ username: followeeUsername });

  console.log(isUserExists);

  if (!isUserExists) {
    return res.status(404).json({
      msg: "User doesn't exists",
    });
  }

  const followRecord = await followModel.create({
    follower: followerUsername,
    followee: followeeUsername,
  });

  res.status(201).json({
    msg: `You are now following to ${followeeUsername}`,
    follow: followRecord,
  });
}

async function unfollowController(req, res) {
  const followerUsername = req.user.username;
  const followeeUsername = req.params.username;

  const isFollowing = await followModel.findOne({
    follower: followerUsername,
    followee: followeeUsername,
  });

  if (!isFollowing) {
    return res.status(200).json({
      msg: `You are not following to the ${followeeUsername}`,
    });
  }

  await followModel.findByIdAndDelete(isFollowing._id);

  res.status(200).json({
    msg: "Unfollowed Successfully ",
  });
}

async function requestController(req, res) {
  const followerUsername = req.user.username;
  const followeeUsername = req.params.username;

  const userExists = await userModel.findOne({ username: followeeUsername });

  if (!userExists) {
    return res.status(404).json({
      msg: "User doesn't exists",
    });
  }

  if (followeeUsername == followerUsername) {
    return res.status(400).json({
      msg: "You can't send request to yourself",
    });
  }

  const alreadyRequested = await followModel.findOne({
    follower: followerUsername,
    followee: followeeUsername,
  });

  if (alreadyRequested) {
    return res.status(200).json({
      msg: "Already requested",
    });
  }

  const request = await followModel.create({
    follower: followerUsername,
    followee: followeeUsername,
    status: "pending",
  });

  res.status(201).json({
    msg: `Request send successfully. Status ${request.status}`,
    request,
  });
}

module.exports = {
  followController,
  unfollowController,
  requestController,
};
