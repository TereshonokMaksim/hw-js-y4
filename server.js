// To run file, write "npm start" in terminal
// Чтобы запустить этот файл, напишите "npm start" в командную строку

const express = require("express");
const FS = require("fs");
const FSPromises = require("fs/promises");
const pathModule = require("path");
const dateMod = require('./script.js');
const { get } = require("http");

const server = express();
server.use(express.json());

const HOST = "localhost";
const PORT = "8000";

const DATA_FILE_PATH = pathModule.join(__dirname, "data.json");
const postsData = JSON.parse(FS.readFileSync(DATA_FILE_PATH, "utf-8"))

server.get("/posts", (request, response) => {
    console.log(`Posts request GET, query:`);
    let responseData = [...postsData];
    let query = request.query;
    console.log()
    if (query.skip){
        if (isNaN(Number(query.skip))){
            response.status(400).json("Bad 'skip' parameter, requires INTEGER data type.");
            return
        }
        responseData = responseData.slice(+query.skip, responseData.length);
    }
    if (query.take){
        if (isNaN(Number(query.take))){
            response.status(400).json("Bad 'take' parameter, requires INTEGER data type.");
            return
        }
        responseData = responseData.slice(0, +query.take);
    }
    response.status(200).json(responseData);
})

server.get("/posts/:id", (request, response) => {
    const id = +request.params.id;
    if (isNaN(id)){
        response.status(400).json("Bad ID, requires INTEGER data type.");
        return
    }
    let post = postsData.find((obj) => obj.id == id);
    if (!post){
        response.status(404).json("Bad ID, post with such ID is not found.");
        return
    }
    response.status(200).json(post);
})

server.get("/timestamp", (request, response) => {
    response.json(dateMod.getDate());
});

function getId(){
    let supposedId = postsData.length
    while (postsData.find((post) => supposedId == post.id)){
        supposedId++
    }
    return supposedId
}

function URLCheck(str){
    try{
        new URL(str);
        return 1
    }
    catch{
        return 0
    }
}

async function updateJSON(){
    try {
        const cookedData = JSON.stringify(postsData, null, 4);
        await FSPromises.writeFile(DATA_FILE_PATH, cookedData);
        return 0
    }
    catch (error) {
        console.log(`During updating JSON file, server encountered something, that it should have never ecnountered: \n\n${error}`)
        return error
    }
}

server.post("/posts", async (request, response) => {
    if (!request.body){
        response.status(422).json("Request body is required.");
        return
    }
    const data = request.body;
    if (!data.name || !data.image || !data.description){
        response.status(422).json("Check that you are sending 'name', 'image' and 'description' for post creation.");
        return
    }
    if (!URLCheck(data.image)){
        response.status(422).json("Image should a link to said image.");
        return
    }
    try{
        const newPost = {id: getId(), ...data, likes: 0};
        postsData.push(newPost);
        const updateData = await updateJSON();
        if (updateData){
            response.status(500).json("Post save failed for some reason, contact devs immediatly and get free air.");
            return
        }
        response.status(200).json(newPost);
    }
    catch (error){
        response.status(500).json("Post creation failed for unexplainable reason, report to devs and get free coffee.");
        console.log(`During post creation, server decided that it had enough and stopped doing basic things.\nAlso, prepare some coffee.\nError:\n\n${error}`);
        return
    }
})

server.listen(PORT, HOST, () => {
    let link = `${HOST}:${PORT}`
    console.log(`Server is on ${link}/`);
    console.log(`Link for timestamp (Mod1 Task4): ${link}/timestamp`);
    console.log(`Link for all posts (Mod1 Task5): ${link}/posts`);
    console.log(`Link for one post by ID (Mod1 Task6, example): ${link}/posts/12`);
    console.log(`Link many posts by query parameters (Mod1 Task6, example): ${link}/posts?take=5&skip=10`);
    console.log(`Link for post creation (REQUIRES POST METHOD) (Mod1 Task7): ${link}/posts`)
});