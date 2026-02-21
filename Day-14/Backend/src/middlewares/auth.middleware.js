const jwt = require("jsonwebtoken");

async function identifyUser(req, res, next) {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({
      msg: "Token is not provided. Login again",
    });
  }

  let decoded = null;
  try {
    decoded = jwt.verify(token, process.env.JWT_SECREAT);
  } catch (error) {
    return res.status(401).json({
      msg: "Token is not provided in decoded",
    });
  }

  req.user = decoded;

  next();
}

module.exports = identifyUser;
