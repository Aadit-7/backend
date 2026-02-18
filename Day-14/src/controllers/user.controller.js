const followModel = require("../models/follow.model");
const userModel = require("../models/user.model");

async function followController(req, res) {
  const followerUsername = req.user.username;
  const followeeUsername = req.params.username;

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

  const isUserExists = await userModel.findOne({ followeeUsername });

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

module.exports = {
  followController,
  unfollowController,
};
