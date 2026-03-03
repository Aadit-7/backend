const jwt = require("jsonwebtoken");
const redis = require("../config/cashe");

async function authUser(req, res, next) {
  const token = req.cookies.token;

  if (!token) {
    return res.status(400).json({
      msg: "Token is not provided",
    });
  }

  const isTokenBlacklisted = await redis.get(token);

  if (isTokenBlacklisted) {
    return res.status(400).json({
      msg: "Invalid Token",
    });
  }

  let decoded = null;

  try {
    decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decoded;

    next();
  } catch (err) {
    res.status(401).json({
      msg: "Invalid Token",
    });
  }
}

module.exports = {
  authUser,
};
