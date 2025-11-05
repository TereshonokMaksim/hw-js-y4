import { TagService } from "./tag.service";
import { TagControllerContract } from "./tag.types";

export const TagController: TagControllerContract = {
    async getAllTags(request, response) {
        try{
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
            response.status(200).json(await TagService.getAllTags(take, skip));
        }
        catch(error){
            console.log(`Seems like something blew up in Tag repository. And it is on the easiest function (right after getAllPosts)...\n\nError:\n${error}`)
            response.status(500).json("Server is experiencing problems.")
        }
    },
    async getTagById(request, response) {
        try{
            const id: string = request.params.id;
            let validId = await TagService.validateId(id)
            if (typeof validId == "string"){
                response.status(400).json(validId)
                return
            }
            let post = await TagService.getTagById(+id);
            if (!post){
                response.status(404).json("Bad ID, post with such ID is not found.");
                return
            }
            response.status(200).json(post);
        }
        
        catch(error){
            console.log(`Seems like something combusted in Tag repository. And it looks like ID became little too independent.\n\nError:\n${error}`)
            response.status(500).json("Server is experiencing problems.")
        }
    }
}