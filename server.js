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
    response.json(JSON.parse(FS.readFileSync(DATA_FILE_PATH, "utf-8")))
});

server.get("/timestamp", (request, response) => {
    response.json(dateMod.getDate())
});

server.listen(PORT, HOST, () => {
    console.log(`Server is on ${HOST}:${PORT}/`);
    console.log(`Link for timestamp (Mod1 Task4): ${HOST}:${PORT}/timestamp`);
    console.log(`Link for all posts (Mod1 Task5): ${HOST}:${PORT}/posts`);
});