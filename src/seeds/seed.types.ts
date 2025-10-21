import { Post, Tag } from "../generated/prisma";

export interface jsonData {
    "posts": Post[],
    "tags": Tag[],
    "connections": {"postId": number, "tagsId": number[]}[]
}