const express = require("express");
const cookieparser = require("cookie-parser");

const app = express();
app.use(express.json());
app.use(cookieparser());

/* ROUTES */
const authRouter = require("./routes/auth.routes")

app.use("/v2/auth", authRouter)

module.exports = app;
