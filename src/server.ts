// To run file, write "npm start" in terminal
// Чтобы запустить этот файл, напишите "npm start" в командную строку

import express from "express";
import { PostRouter } from "./Post/post.router";
import { TagRouter } from "./Tag/tag.router";
import { UserRouter } from "./User/user.router";

const server = express();

server.use(express.json());
server.use(PostRouter);
server.use(TagRouter);
server.use(UserRouter);

const HOST = "localhost";
const PORT = 8000;

server.listen(PORT, HOST, () => {
    let link = `${HOST}:${PORT}`;
    console.log(`Server is on ${link}/`);
    console.log(`Link for timestamp (Mod1 Task4): ${link}/timestamp`);
    console.log("Post Module Links:")
    console.log(`  Link for all posts (Mod1 Task5): ${link}/posts`);
    console.log(`  Link for one post by ID (Mod1 Task6, example): ${link}/posts/3`);
    console.log(`  Link many posts by query parameters (Mod1 Task6, example): ${link}/posts?take=1&skip=4`);
    console.log(`  Link for post creation (REQUIRES POST METHOD) (Mod1 Task7): ${link}/posts`);
    console.log(`  Link to update post (REQUIRES PATCH METHOD) (Mod2 Task2, example): ${link}/posts/1`);
    console.log(`  Link to demolish post (REQUIRES DELETE METHOD) (Mod2 Task5, example): ${link}/posts/2`);
    console.log("Tag Module Links:")
    console.log(`  Link for all tags (Mod2 Task6): ${link}/tags`);
    console.log(`  Link for one tag by ID (Mod2 Task6, example): ${link}/tags/3`);
    console.log("User Module Links:")
    console.log(`  Link for registration (Mod2 Task7.1): ${link}/user/register`);
    console.log(`  Link for login (Mod2 Task7.1): ${link}/user/login`);
    console.log(`  Link to get self user (Mod2 Task7.2): ${link}/user/me`);
});