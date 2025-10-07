const PostService = require("./post.service")

const PostController = {
    getAllPosts(request, response) {
        let query = request.query;
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
        const id = +request.params.id;
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
        response.json(PostService.getDate());
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
        try{
            const newPost = await PostService.addPost(data);
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
    }
}

module.exports = PostController;