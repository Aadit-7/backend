const express = require("express");
const cookieParser = require("cookie-parser");

const app = express();
app.use(express.json());
app.use(cookieParser());

/* Routers called */
const authRouter = require("./routes/auth.route");
const postRouter = require("./routes/post.route");
const userRouter = require("./routes/user.route");

/* Routers used */
app.use("/api/auth", authRouter);
app.use("/api/post", postRouter);
app.use("/api/users", userRouter);

module.exports = app;
