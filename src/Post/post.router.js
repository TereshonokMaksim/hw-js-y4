const PostController = require("./post.controller");
const express = require("express");

const PostRouter = express.Router();

PostRouter.get("/posts", PostController.getAllPosts)
PostRouter.get("/posts/:id", PostController.getPostById)
PostRouter.get("/timestamp", PostController.getTimestamp);
PostRouter.post("/posts", PostController.createPost)

module.exports = PostRouter