
import { TagRepositoryContract } from "./tag.types";
import { prisma } from "../client/prisma.client";
import { Prisma } from "../generated/prisma";


export const TagRepository: TagRepositoryContract = {
    async getAllTags(take, skip){
        try{
            return await prisma.tag.findMany(
                {
                    take: take,
                    skip: skip
                }
            )
        }
        catch(error){
            if (error instanceof Prisma.PrismaClientKnownRequestError) {
                if (error.code in ['P1001', 'P1008', 'P1017']) {
                    console.log('Failed connection to DB, check if you actually connected correctly and didn`t close it.')
                    throw new Error("Failed connection to Data Base while processing getAllTags.")
                }
                else if (error.code === 'P2009') {
                    console.log('For some reason it outputted error that it seeks for some columns that dont exists. I dont know either.')
                    throw new Error("Incorrect request query for getAllTags.")
                }
                else if (error.code === 'P2022') {
                    console.log('Schema problem, check whether you made migrations or not.')
                    throw new Error("Incorrect schema between migrations and DB in getAllTags.")
                }
            }
            throw error
        }
    },
    async getTagById(id){
        let tag;
        try{
            return prisma.tag.findUnique({
                where: {
                    id: id
                }
            })
        }
        catch(error){
            if (error instanceof Prisma.PrismaClientKnownRequestError) {
                if (error.code in ['P1001', 'P1008', 'P1017']) {
                    console.log('Failed connection to DB, check if you actually connected correctly and didn`t close it.')
                    throw new Error("Failed connection to Data Base while processing getTagById.")
                }
                else if (error.code === 'P2009') {
                    console.log('For some reason it outputted error that it seeks for some columns that dont exists. I dont know either.')
                    throw new Error("Incorrect request query for getTagById.")
                }
                else if (error.code === 'P2022') {
                    console.log('Schema problem, check whether you made migrations or not.')
                    throw new Error("Incorrect schema between migrations and DB in getTagById.")
                }
            }
            throw error
        }
    }
}