// To run file, write "npm start" in terminal
// Чтобы запустить этот файл, напишите "npm start" в командную строку

const express = require("express");
const FS = require("fs");
const pathModule = require("path");
const dateMod = require('./script.js');

const server = express();

const HOST = "localhost";
const PORT = "8000";

const DATA_FILE_PATH = pathModule.join(__dirname, "data.json");

server.get("/posts", (request, response) => {
    console.log(`Posts request GET, query:`)
    let responseData = JSON.parse(FS.readFileSync(DATA_FILE_PATH, "utf-8"))
    let query = request.query
    if (query.skip){
        if (isNaN(Number(query.skip))){
            response.status(400).json("Bad 'skip' parameter, requires INTEGER data type.")
            return
        }
        responseData = responseData.slice(+query.skip, responseData.length)
    }
    if (query.take){
        if (isNaN(Number(query.take))){
            response.status(400).json("Bad 'take' parameter, requires INTEGER data type.")
            return
        }
        responseData = responseData.slice(0, +query.take)
    }
    response.status(200).json(responseData)
});

server.get("/posts/:id", (request, response) => {
    const id = +request.params.id
    console.log(request.params.id)
    if (isNaN(id)){
        response.status(400).json("Bad ID, requires INTEGER data type.")
        return
    }
    let responseData = JSON.parse(FS.readFileSync(DATA_FILE_PATH, "utf-8"))
    let post = responseData.find((obj) => obj.id == id)
    if (!post){
        response.status(404).json("Bad ID, post with such ID is not found.")
        return
    }
    response.status(200).json(post)
})

server.get("/timestamp", (request, response) => {
    response.json(dateMod.getDate())
});

server.get("/")

server.listen(PORT, HOST, () => {
    console.log(`Server is on ${HOST}:${PORT}/`);
    console.log(`Link for timestamp (Mod1 Task4): ${HOST}:${PORT}/timestamp`);
    console.log(`Link for all posts (Mod1 Task5): ${HOST}:${PORT}/posts`);
    console.log(`Link for one post by ID (Mod1 Task6, example): ${HOST}:${PORT}/posts/12`)
    console.log(`Link many posts by query parameters (Mod1 Task6, example): ${HOST}:${PORT}/posts?take=5&skip=10`)
});