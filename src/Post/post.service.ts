import momentModule from "moment";
import { Post, PostServiceContract, CreatePost } from "./post.types";
import { PrismaClient, Prisma } from "../generated/prisma";
import { PostRepository } from "./post.repository";

const prisma = new PrismaClient()
// const DATA_FILE_PATH: string = pathModule.join(__dirname, "..", "data.json");
// const postsData: Post[] = JSON.parse(FS.readFileSync(DATA_FILE_PATH, "utf-8"));

export const PostService: PostServiceContract = {
    async getAllPosts(take, skip){
        /*
            Можно было бы поместить skip и take внутрь findMany,
            но говорят что так оптимизация хуже по какой то причине,
            и оно не дружит с undefined, потому будет по старой схеме
            Edit: Конфиг изменен, теперь оно работает красиво
        */
        return await PostRepository.getAllPosts(take, skip)
    },
    async getPostById(id){
        // Возвращает ничего если пост за запрошенным id не является реальным
        // так ведь?
        // ¯\_(ツ)_/¯
        return PostRepository.getPostById(id)
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