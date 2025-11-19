import { PostController } from "./post.controller"
import express from "express"
import { authMiddleware } from "../middlewares/auth.middleware";

export const PostRouter = express.Router();

PostRouter.get("/posts", PostController.getAllPosts)
PostRouter.get("/posts/:id", PostController.getPostById)
PostRouter.get("/timestamp", PostController.getTimestamp);
PostRouter.post("/posts", authMiddleware, PostController.createPost)
PostRouter.patch("/posts/:id", authMiddleware, PostController.updatePost)
PostRouter.delete("/posts/:id", authMiddleware, PostController.deletePost)