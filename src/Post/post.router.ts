import { PostController } from "./post.controller"
import express from "express"

export const PostRouter = express.Router();

PostRouter.get("/posts", PostController.getAllPosts)
PostRouter.get("/posts/:id", PostController.getPostById)
PostRouter.get("/timestamp", PostController.getTimestamp);
PostRouter.post("/posts", PostController.createPost)
PostRouter.patch("/posts/:id", PostController.updatePost)