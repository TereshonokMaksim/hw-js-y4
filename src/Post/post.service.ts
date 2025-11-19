import momentModule from "moment";
import { PostServiceContract, CreatePost } from "./post.types";
import { PostRepository } from "./post.repository";
import { UserRepository } from "../User/user.repository";

export const PostService: PostServiceContract = {
    async getAllPosts(take, skip){
        // Edit: Конфиг изменен, теперь оно работает красиво
        return await PostRepository.getAllPosts(take, skip)
    },
    async getPostById(id){
        // ¯\_(ツ)_/¯
        return PostRepository.getPostById(id)
    },
    async addPost(postData, userId){
        const newPost: CreatePost = {...postData, likes: 0};
        return PostRepository.addPost(newPost, userId)
    },
    getDate(){
        let date;
        let mom = momentModule();
        // copypaste my beloved
        date = mom.format("YYYY/DD/MM HH:mm:ss")

        return date
    },
    async updatePost(newPostData, id, userId){
        const user = await UserRepository.getUserById(userId)
        const post = await PostRepository.getPostById(id)
        if (!user){
            throw new Error("USER_NOT_FOUND")
        }
        if (!post){
            throw new Error("POST_NOT_FOUND")
        }
        if (user.id != post.creatorId && !user.isAdmin){
            throw new Error("ACCESS_DENIED")
        }
        return PostRepository.updatePost(newPostData, id)
    },
    async deletePost(id, userId){
        const user = await UserRepository.getUserById(userId)
        const post = await PostRepository.getPostById(id)
        if (!user){
            throw new Error("USER_NOT_FOUND")
        }
        if (!post){
            throw new Error("POST_NOT_FOUND")
        }
        if (user.id != post.creatorId && !user.isAdmin){
            throw new Error("ACCESS_DENIED")
        }
        return PostRepository.deletePost(id)
    }
}