import { UserController } from "./user.controller"
import express from "express"

export const UserRouter = express.Router();

UserRouter.post("/user/register", UserController.register);
UserRouter.post("/user/login", UserController.login);
UserRouter.get("/user/me", UserController.me)