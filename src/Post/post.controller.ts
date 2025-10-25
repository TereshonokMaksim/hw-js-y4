import { PostService } from "./post.service";
import { PostControllerContract } from "./post.types";

export const PostController: PostControllerContract = {
    async getAllPosts(request, response) {
        let query: {take?: string, skip?: string} = request.query;
        let take, skip;
        if (query.skip){
            if (isNaN(Number(query.skip))){
                response.status(400).json("Bad 'skip' parameter, requires INTEGER data type.");
                return
            }
            else if (+query.skip < 0 || Math.round(+query.skip) != +query.skip){
                response.status(400).json("Bad 'skip' parameter, check for it to be round and positive number.");
                return
            }
            skip = +query.skip
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
            take = +query.take
        }
        response.status(200).json(await PostService.getAllPosts(take, skip));
    },
    async getPostById(request, response) {
        const id: string = request.params.id;
        let validId = await PostService.validateId(id)
        if (typeof validId == "string"){
            response.status(400).json(validId)
            return
        }
        let post = await PostService.getPostById(+id);
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
            response.status(422).json("Request body is absolutely required for this request.")
            return
        }
        let validId = await PostService.validateId(id)
        if (typeof validId == "string"){
            response.status(400).json(validId)
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
            // Орать на орущего оказалось крайне эффективным!
            if (!PostService.isURL(data.image as string)){
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
    },
    async deletePost(request, response){
        const id = request.params.id;
        let validId = await PostService.validateId(id);
        if (typeof validId == "string"){
            response.status(400).json(validId);
            return
        }
        let deletedPost = await PostService.deletePost(+id);
        if (typeof deletedPost == "string"){
            let deletedPostUnpacked = deletedPost.split("///")
            if (!deletedPostUnpacked[1]){
                console.log(`Thats a bad error message for deleting post, man.\n\nData: \n  Message: ${deletedPost}`)
                return
            }
            response.status(+deletedPostUnpacked[1]).json(deletedPostUnpacked[0])
            return
        }
        response.status(200).json(deletedPost)
    }
}