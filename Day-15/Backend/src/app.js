const express = require("express");
const cookieParser = require("cookie-parser");


const app = express();
app.use(express.json());
app.use(cookieParser());

/* ROUTES */

const authRouter = require("./routes/auth.routes")

app.use("/v1/auth", authRouter)

module.exports = app;
