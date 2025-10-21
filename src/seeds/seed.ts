// Dont look at tags parameter of posts
// in JSON file, that is written like this 
// just because its easy.

import { PrismaClient } from '../generated/prisma';
import FS from "fs";
import Path from "path";
import { Post, Tag } from '../generated/prisma';
import { jsonData } from './seed.types';

const prisma = new PrismaClient();

const data: jsonData = JSON.parse(FS.readFileSync(Path.join(__dirname, "dataToSend.json"), "utf-8"));

async function runDBFill(): Promise<void> {
    for (let post of data["posts"]){
        await prisma.post.create({"data": post})
    }
    for (let tag of data["tags"]){
        await prisma.tag.create({"data": tag})
    }
    for (let connection of data["connections"]){
        for (let tagId of connection["tagsId"]){
            await prisma.tagsAndPosts.create({"data": {"postId": connection.postId, "tagId": tagId}})
        }
    }
}

runDBFill().then(() => {
    console.log("Database filled with test data successfully! Im actually surprised! Nice job! Wow! Amazinf!")
}).catch((error) => {
    console.log(`Haha, you really thought that this code will work? Nope.\nI will give you error, dont worry ;)\n\nError Message:\n${error}`)
})