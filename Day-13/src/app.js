const express = require("express");
const authRouter = require("./routes/auth.route");
require("dotenv").config();
const cookieParser = require("cookie-parser");


const app = express();
app.use(express.json());
app.use(cookieParser());
app.use("/api1/auth", authRouter);

module.exports = app;
