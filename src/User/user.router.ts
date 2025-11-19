import { UserController } from "./user.controller"
import express from "express"
import { authMiddleware } from "../middlewares/auth.middleware";

export const UserRouter = express.Router();

UserRouter.post("/user/register", UserController.register);
UserRouter.post("/user/login", UserController.login);
UserRouter.get("/user/me", authMiddleware, UserController.me)