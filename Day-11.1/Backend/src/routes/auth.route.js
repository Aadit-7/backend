import { Router } from "express";
import {
  loginValidators,
  registerValidator,
} from "../validators/auth.validator.js";
import {
  getMeController,
  loginController,
  registerController,
} from "../controllers/auth.controller.js";
import { authUser } from "../middlewares/auth.middleware.js";

const authRouter = Router();

authRouter.post("/register", registerValidator, registerController);

authRouter.post("/login", loginValidators, loginController);

authRouter.get("/get-me", authUser, getMeController);

export default authRouter;
