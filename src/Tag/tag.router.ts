import { TagController } from "./tag.controller"
import express from "express"

export const TagRouter = express.Router();

TagRouter.get("/tags", TagController.getAllTags);
TagRouter.get("/tags/:id", TagController.getTagById);