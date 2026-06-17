import jwt from "jsonwebtoken";

export async function authUser(req, res, next) {
  const token = req.cookies.token;

  if (!token) {
    return res.status(400).json({
      msg: "Token is not provided",
      success: false,
      err: "Unauthorized",
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decoded;

    next();
  } catch (err) {
    return res.status(400).json({
      msg: "Invalid User",
      success: false,
      err: "Unauthorized",
    });
  }
}
