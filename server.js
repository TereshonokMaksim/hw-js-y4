// To run file, write "npm start" in terminal
// Чтобы запустить этот файл, напишите "npm start" в командную строку

const express = require("express");
const dateMod = require('./script.js');

const server = express();

const HOST = "localhost";
const PORT = "8000";

server.listen(PORT, HOST, () => {
    console.log(`Server is on ${HOST}:${PORT}/`);
    console.log(`Link for testing: ${HOST}:${PORT}/timestamp`);
});

server.get("/timestamp", (request, response) => {
    response.json(dateMod.getDate())
});