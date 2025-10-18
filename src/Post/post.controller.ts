import { stringify } from "querystring";
import { PostService } from "./post.service";
import { PostControllerContract, PostUpdate } from "./post.types";
import { reduceEachTrailingCommentRange } from "typescript";

export const PostController: PostControllerContract = {
    getAllPosts(request, response) {
        let query: {take?: string, skip?: string} = request.query;
        if (query.skip){
            if (isNaN(Number(query.skip))){
                response.status(400).json("Bad 'skip' parameter, requires INTEGER data type.");
                return
            }
            else if (+query.skip < 0 || Math.round(+query.skip) != +query.skip){
                response.status(400).json("Bad 'skip' parameter, check for it to be round and positive number.");
                return
            }
        }
        if (query.take){
            if (isNaN(Number(query.take))){
                response.status(400).json("Bad 'take' parameter, requires INTEGER data type.");
                return
            }
            else if (+query.take < 0 || Math.round(+query.take) != +query.take){
                response.status(400).json("Bad 'take' parameter, check for it to be round and positive number.");
                return
            }
        }
        response.status(200).json(PostService.getAllPosts(query.take, query.skip));
    },
    getPostById(request, response) {
        if (!request.params.id){
            response.status(400).json("Bad ID, there is no ID... what.")
            return
        }
        const id: number = +request.params.id;
        if (isNaN(id)){
            response.status(400).json("Bad ID, requires INTEGER data type.");
            return
        }
        let post = PostService.getPostById(id);
        if (!post){
            response.status(404).json("Bad ID, post with such ID is not found.");
            return
        }
        response.status(200).json(post);
    },
    getTimestamp(request, response) {
        try{
            response.status(200).json(PostService.getDate());
        }
        catch (error){
            response.status(500).json("Failed to get timestamp, server was transported to Alpha Centauri and doesnt know how time works here.")
            console.log(`Wow, one line function broke. How this server cant process literally 5 lines of code? Ugh.\n\nError:\n${error}`)
        }
    },
    async createPost(request, response) {
        if (!request.body){
            response.status(422).json("Request body is required.");
            return
        }
        const data = request.body;
        if (!data.name || !data.image || !data.description){
            response.status(422).json("Check that you are sending 'name', 'image' and 'description' for post creation.");
            return
        }
        if (!PostService.isURL(data.image)){
            response.status(422).json("Image should be a link to said image.");
            return
        }
        if (!data.likes){
            response.status(422).json("Likes should exists, even if they are 0.")
        }
        if (data.likes.trim().length == 0){
            response.status(422).json("You cant just use bunch of spaces as likes and hope it will work.")
            return
        }
        if (isNaN(+data.likes)){
            response.status(422).json("Likes should be a number.")
            return
        }
        if (Math.round(+data.likes) != +data.likes){
            response.status(422).json("Likes should be INTEGER, not float.")
            return
        }
        try{
            const newPost = await PostService.addPost({...data, likes: +data.likes});
            if (!newPost){
                response.status(500).json("Post save failed for some reason, contact devs immediatly and get free air.");
                return
            }
            response.status(201).json(newPost)
        }
        catch (error){
            response.status(500).json("Post creation failed for unexplainable reason, report to devs and get free coffee.");
            console.log(`During post creation, server decided that it had enough and stopped doing basic things.\nAlso, prepare some coffee.\nError:\n\n${error}`);
            return
        }
    },
    async updatePost(request, response){
        const data = request.body
        const id = request.params.id
        if (!data){
            response.status(422).json("Request body is aboslutely required for this request.")
            return
        }
        if (!id){
            response.status(400).json("ID of edited post is required.")
            return
        }
        if (id.trim().length == 0){
            response.status(400).json("ID must be a number, not just spaces.")
            return
        }
        if (isNaN(+id)){
            response.status(400).json("ID must be a number.")
            return
        }   
        if (Math.round(+id) != +id){
            response.status(400).json("ID should be INTEGER, not float...")
            return
        }
        if (+id < 0){
            response.status(400).json("ID should be a positive number")
            return
        }
        if (data.likes){
            if (String(data.likes).trim().length == 0){
                response.status(422).json("You cant just use bunch of spaces as likes and hope it will work.")
                return
            }
            if (isNaN(+data.likes)){
                response.status(422).json("Likes should be a number.")
                return
            }
            if (Math.round(+data.likes) != +data.likes){
                response.status(422).json("Likes should be INTEGER, not float.")
                return
            }
            // Нет проверки на позитивное число лайков поскольку
            // они могут быть отрицательными, если пост наберет
            // больше негативных реакций 
        }
        if (data.image){
            if (!PostService.isURL(data.image)){
                response.status(422).json("Image should be an URL string.")
                return
            }
        }
        try{
            let newPostData = await PostService.updatePost(data, +id)
            if (!newPostData){
                response.status(404).json(`Post with id '${id}' not found.`)
                return
            }
            if (typeof newPostData == "string"){
                response.status(500).json(`Unexpected error happened, error code: ${newPostData}`)
                return
            }
            response.status(200).json(newPostData)
        }
        catch (error){
            console.log(`They still got error after i added 10 layers of ensuring, that data is correct.\nNo amount of coffee will save this server.\n\nError message:\n${error}`)
            response.status(500).json(`Unexpected error happened. No error code provided. Report to somebody who is related with this server right now and get access to code, so you can fix it yourself.`)
        }
    }
}