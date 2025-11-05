import { TagServiceContract } from "./tag.types";
import { TagRepository } from "./tag.repository";


export const TagService: TagServiceContract = {
    async getAllTags(take, skip){
        return await TagRepository.getAllTags(take, skip)
    },
    async getTagById(id){
        return TagRepository.getTagById(id)
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