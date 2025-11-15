import momentModule from "moment";
import { PostServiceContract, CreatePost } from "./post.types";
import { PostRepository } from "./post.repository";

export const PostService: PostServiceContract = {
    async getAllPosts(take, skip){
        // Edit: Конфиг изменен, теперь оно работает красиво
        return await PostRepository.getAllPosts(take, skip)
    },
    async getPostById(id){
        // ¯\_(ツ)_/¯
        return PostRepository.getPostById(id)
    },
    async addPost(postData){
        const newPost: CreatePost = {...postData, likes: 0};
        return PostRepository.addPost(newPost)
    },
    getDate(){
        let date;
        let mom = momentModule();
        // copypaste my beloved
        date = mom.format("YYYY/DD/MM HH:mm:ss")

        return date
    },
    async updatePost(newPostData, id){
        return PostRepository.updatePost(newPostData, id)
    },
    async deletePost(id){
        return PostRepository.deletePost(id)
    }
}