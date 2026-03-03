const jwt = require("jsonwebtoken");
const redis = require("../config/cashing");

async function authUser(req, res, next) {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({
      msg: "Token is not provided",
    });
  }

  //   console.log(token);

  const isTokenBlacklisted = await redis.get(token);

  if (isTokenBlacklisted) {
    return res.status(401).json({
      message: "Invalid token",
    });
  }

  let decoded = null;

  try {
    decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decoded;

    next();
  } catch (err) {
    console.log(decoded);
    return res.status(401).json({
      message: "Invalid token",
    });
  }
}

module.exports = {
  authUser,
};
