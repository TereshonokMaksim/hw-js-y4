// To run file, write "npm start" in terminal
// Чтобы запустить этот файл, напишите "npm start" в командную строку

import express from "express"
import { PostRouter } from "./Post/post.router"

const server = express();

server.use(express.json());
server.use(PostRouter);

const HOST = "localhost";
const PORT = 8000;

server.listen(PORT, HOST, () => {
    let link = `${HOST}:${PORT}`;
    console.log(`Server is on ${link}/`);
    console.log(`Link for timestamp (Mod1 Task4): ${link}/timestamp`);
    console.log(`Link for all posts (Mod1 Task5): ${link}/posts`);
    console.log(`Link for one post by ID (Mod1 Task6, example): ${link}/posts/3`);
    console.log(`Link many posts by query parameters (Mod1 Task6, example): ${link}/posts?take=1&skip=4`);
    console.log(`Link for post creation (REQUIRES POST METHOD) (Mod1 Task7): ${link}/posts`);
    console.log(`Link to update post (REQUIRES PATCH METHOD) (Mod2 Task2, example): ${link}/posts/1`);
    console.log(`Link to demolish post (REQUIRES DELETE METHOD) (Mod2 Task5, example): ${link}/posts/2`)
});