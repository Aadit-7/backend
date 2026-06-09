import express from "express";
import cookieParser from "cookie-parser";

const app = express();

app.use(express.json());
app.use(cookieParser());

// express.json() handles JSON requests from React/Postman.
// express.urlencoded() handles HTML form submissions.
export default app;
