import express from "express";
import cookieParser from "cookie-parser";
import authRouter from "./routes/auth.route.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/apiV2/auth", authRouter);
export default app;
