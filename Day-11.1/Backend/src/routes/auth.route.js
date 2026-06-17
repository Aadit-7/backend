import { Router } from "express";
import {
  loginValidator,
  registerValidator,
} from "../validators/auth.validator.js";
import {
  getMeController,
  loginController,
  registerController,
} from "../controllers/auth.controller.js";
import { authUserMiddleware } from "../middlewares/auth.middleware.js";

const authRouter = Router();

authRouter.post("/register", registerValidator, registerController);

authRouter.post("/login", loginValidator, loginController);

authRouter.get("/get-me", authUserMiddleware, getMeController);

export default authRouter;
