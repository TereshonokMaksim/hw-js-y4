import FS from "fs";
import FSPromises from "fs/promises";
import pathModule from "path";
import momentModule from "moment";
import { Post, PostServiceContract, UpdatePostChecked, CreatePostChecked, CreatePost } from "./post.types";
import { PrismaClient, Prisma } from "../generated/prisma";

const prisma = new PrismaClient()
// const DATA_FILE_PATH: string = pathModule.join(__dirname, "..", "data.json");
// const postsData: Post[] = JSON.parse(FS.readFileSync(DATA_FILE_PATH, "utf-8"));

export const PostService: PostServiceContract = {
    async getAllPosts(take, skip){
        /*
            Можно было бы поместить skip и take внутрь findMany,
            но говорят что так оптимизация хуже по какой то причине,
            и оно не дружит с undefined, потому будет по старой схеме
        */
        let selectedPosts = await prisma.post.findMany();
        if (skip){
            selectedPosts = selectedPosts.slice(+skip)
        }
        if (take){
            selectedPosts = selectedPosts.slice(0, +take)
        }
        return selectedPosts
    },
    async getPostById(id){
        // Возвращает ничего если пост за запрошенным id не является реальным
        // так ведь?
        let post;
        try{
            post = prisma.post.findUnique({
                where: {
                    id: id
                }
            })
        }
        catch (error){
            console.log(`DB decided that it is independent and refuses to elaborate! More specifically, it decided not to give Post by ID.\n\nData: \n  ID: ${id}\n\nError: \n${error}`)
            return
        }
        if (!post){
            return
        }
        return post
    },
    isURL(urlString){
        try{
            new URL(urlString);
            return true
        }
        catch{
            return false
        }
    },
    async addPost(postData){
        const newPost: CreatePost = {...postData, likes: 0};
        try{
            const updateData = await prisma.post.create({
                data: newPost
            });
            return updateData
        }
        catch (error){
            console.log(`It turns out, its not so easy to create POST anymore.\n\nData: ${newPost}\n\nError:\n${error}`)
            return
        }
    },
    getDate(){
        let date;
        let mom = momentModule();
        // copypaste my beloved
        date = mom.format("YYYY/DD/MM HH:mm:ss")

        return date
    },
    async updatePost(newPostData, id){
        // const selectedPostIndex: number = postsData.indexOf(selectedPost);
        // let newPost: Post = {...selectedPost, ...newPostData}
        try{
            let newPost: Post = await prisma.post.update({
                where: {
                    id: id
                },
                data: newPostData
            })
            return newPost
        }
        catch (error) {
            console.log(`Updating product with ID of ${id} failed for unexplainable reasons.\n\nData: \n  ID: ${id}\n  New post data: ${newPostData}\n\nError:\n${error}`)
            return "updatePost-service-DB"
        }
        // const unsuccessDataUpdate = await this.updateJSON();
        // if (unsuccessDataUpdate){
        //     return "updatePost-service-"
        // }
    },
    async deletePost(id){
        try{
            let deletedPost = await prisma.post.delete({
                    where: {
                        id: id
                    }
                })
            return deletedPost
        }
        catch (error) {
            if (error instanceof Prisma.PrismaClientKnownRequestError){
                return `There is no object with ID ${id}.///404`
            }
            else {
                console.log(`Our server refuses to delete its precious data!\n\nData: \n  ID: ${id}\n\nError: \n${error}`)
                return "Internal Server Error during deleting post.///500"
            }
        }
    },
    async validateId(id){
        if (!id){
            return "ID of edited post is required."
        }
        if (id.trim().length == 0){
            return "ID must be a number, not just spaces."
        }
        if (isNaN(+id)){
            return "ID must be a number."
        }   
        if (Math.round(+id) != +id){
            return "ID should be INTEGER, not float."
        }
        if (+id < 0){
            return "ID should be positive number."
        }
        return true
    }
}