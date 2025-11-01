import { TagService } from "./tag.service";
import { TagControllerContract } from "./tag.types";

export const TagController: TagControllerContract = {
    async getAllTags(request, response) {
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
    },
    async getTagById(request, response) {
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
}