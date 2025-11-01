
import { TagRepositoryContract } from "./tag.types";
import { prisma } from "../client/prisma.client";


export const TagRepository: TagRepositoryContract = {
    async getAllTags(take, skip){
        let selectedTags = await prisma.tag.findMany(
            {
                take: take,
                skip: skip
            }
        )
        return selectedTags
    },
    async getTagById(id){
        let tag;
        try{
            tag = prisma.tag.findUnique({
                where: {
                    id: id
                }
            })
        }
        catch (error){
            console.log(`DB decided that it is independent and refuses to elaborate! More specifically, it decided not to give Tag by ID.\n\nData: \n  Model: Tag\n  ID: ${id}\n\nError: \n${error}`)
            return
        }
        if (!tag){
            return
        }
        return tag
    }
}