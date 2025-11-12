
import { PostRepositoryContract } from "./post.types";
import { prisma } from "../client/prisma.client";
import { Prisma } from "../generated/prisma";


export const PostRepository: PostRepositoryContract = {
    async getAllPosts(take, skip){
        try{
            return await prisma.post.findMany(
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
                    throw new Error("Failed connection to Data Base while processing getAllPosts.")
                }
                else if (error.code === 'P2009') {
                    console.log('For some reason it outputted error that it seeks for some columns that dont exists. I dont know either.')
                    throw new Error("Incorrect request query for getAllPosts.")
                }
                else if (error.code === 'P2022') {
                    console.log('Schema problem, check whether you made migrations or not.')
                    throw new Error("Incorrect schema between migrations and DB in getAllPosts.")
                }
            }
            throw error
        }
    },
    async getPostById(id){
        try{
            return prisma.post.findUnique({
                where: {
                    id: id
                }
            })
        }
        catch(error){
            if (error instanceof Prisma.PrismaClientKnownRequestError) {
                if (error.code in ['P1001', 'P1008', 'P1017']) {
                    console.log('Failed connection to DB, check if you actually connected correctly and didn`t close it.')
                    throw new Error("Failed connection to Data Base while processing getPostById.")
                }
                else if (error.code === 'P2009') {
                    console.log('For some reason it outputted error that it seeks for some columns that dont exists. I dont know either.')
                    throw new Error("Incorrect request query for getPostById.")
                }
                else if (error.code === 'P2022') {
                    console.log('Schema problem, check whether you made migrations or not.')
                    throw new Error("Incorrect schema between migrations and DB in getPostById.")
                }
            }
            throw error
        }
    },
    async addPost(postData){
        try{
            return await prisma.post.create({
                data: postData
            });
        }
        catch(error){
            if (error instanceof Prisma.PrismaClientKnownRequestError) {
                if (error.code in ['P1001', 'P1008', 'P1017']) {
                    console.log('Failed connection to DB, check if you actually connected correctly and didn`t close it.')
                    throw new Error("Failed connection to Data Base while processing addPost.")
                }
                else if (error.code in ["P2000", "P2005", "P2006", "P2007"]){
                    console.log("Thats a bad values you gave me, here is Validation error just for you.")
                    throw new Error("Validation error while handling addPost.")
                }
                else if (error.code === "P2002"){
                    console.log("You dont need to put ID while creating, it is not a txt document after all, it can do it itself.")
                    throw new Error("Unique constraint failed while handling addPost.")
                }
                else if (error.code === 'P2011') {
                    console.log('Now, you dont have data at all, please, give more data to play with.')
                    throw new Error("NULL value check failed while handling addPost.")
                }
                else if (error.code === 'P2022') {
                    console.log('Schema problem, check whether you made migrations or not.')
                    throw new Error("Incorrect schema between migrations and DB in addPost.")
                }
            }
            throw error
        }
    },
    async updatePost(newPostData, id){
        try{
            return await prisma.post.update({
                where: {
                    id: id
                },
                data: newPostData
            })
        }
        catch(error){
            if (error instanceof Prisma.PrismaClientKnownRequestError) {
                if (error.code in ['P1001', 'P1008', 'P1017']) {
                    console.log('Failed connection to DB, check if you actually connected correctly and didn`t close it.')
                    throw new Error("Failed connection to Data Base while processing updatePost.")
                }
                else if (error.code in ["P2000", "P2005", "P2006", "P2007"]){
                    console.log("Thats a bad values you gave me, here is Validation error just for you.")
                    throw new Error("Validation error while handling updatePost.")
                }
                else if (error.code === 'P2011') {
                    console.log('Now, you dont have data at all, please, give more data to play with.')
                    throw new Error("NULL value check failed while handling updatePost.")
                }
                else if (error.code === 'P2022') {
                    console.log('Schema problem, check whether you made migrations or not.')
                    throw new Error("Incorrect schema between migrations and DB in updatePost.")
                }
                else if (error.code === "P2025"){
                    console.log("It seems like you want to change void. Sorry, cant help with that.")
                    throw new Error(`Object with id "${id}" is not found while handling updatePost.`)
                }   
            }
            throw error
        }
    },
    async deletePost(id){
        try{
            return await prisma.post.delete({
                    where: {
                        id: id
                    }
                })
        }
        catch(error){
            if (error instanceof Prisma.PrismaClientKnownRequestError) {
                if (error.code in ['P1001', 'P1008', 'P1017']) {
                    console.log('Failed connection to DB, check if you actually connected correctly and didn`t close it.')
                    throw new Error("Failed connection to Data Base while processing deletePost.")
                }
                else if (error.code === 'P2003') {
                    console.log('No. You dont delete that thingy. Something is tellling me that this is very important thing.')
                    throw new Error("Foreign key relation failed while handling deletePost.")
                }
                else if (error.code === 'P2022') {
                    console.log('Schema problem, check whether you made migrations or not.')
                    throw new Error("Incorrect schema between migrations and DB in deletePost.")
                }
                else if (error.code === "P2025"){
                    console.log("It seems like you want to change void. Sorry, cant help with that.")
                    throw new Error(`Object with id "${id}" is not found.`)
                }   
            }
            throw error
        }
    }
}