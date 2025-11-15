
import { UserRepositoryContract } from "./user.types";
import { prisma } from "../client/prisma.client";
import { Prisma } from "../generated/prisma";


export const UserRepository: UserRepositoryContract = {
    async getUserByEmail(email){
        try{
            return await prisma.user.findUnique(
                { where: {email} }
            )
        }
        catch (error){
            if (error instanceof Prisma.PrismaClientKnownRequestError) {
                if (error.code in ['P1001', 'P1008', 'P1017']) {
                    console.log('Failed connection to DB, check if you actually connected correctly and didn`t close it.')
                    throw new Error("Failed connection to Data Base while processing getUserByEmail.")
                }
                else if (error.code === 'P2009') {
                    console.log('For some reason it outputted error that it seeks for some columns that dont exists. I dont know either.')
                    throw new Error("Incorrect request query for getUserByEmail.")
                }
                else if (error.code === 'P2022') {
                    console.log('Schema problem, check whether you made migrations or not.')
                    throw new Error("Incorrect schema between migrations and DB in getUserByEmail.")
                }
            }
            throw error
        }
    },
    async createUser(userData){
        try {
            return await prisma.user.create({data: userData}) 
        }
        catch(error){
            if (error instanceof Prisma.PrismaClientKnownRequestError) {
                if (error.code in ['P1001', 'P1008', 'P1017']) {
                    console.log('Failed connection to DB, check if you actually connected correctly and didn`t close it.')
                    throw new Error("Failed connection to Data Base while processing createUser.")
                }
                else if (error.code in ["P2000", "P2005", "P2006", "P2007"]){
                    console.log("Thats a bad credentials you gave me, here is Validation error just for you.")
                    throw new Error("Validation error while handling createUser.")
                }
                else if (error.code === "P2002"){
                    console.log("How did you put ID here and for what reason in the first place.")
                    throw new Error("Unique constraint failed while handling createUser.")
                }
                else if (error.code === 'P2011') {
                    console.log('Now, you dont have data at all, please, give more data to create new User with.')
                    throw new Error("NULL value check failed while handling createUser.")
                }
                else if (error.code === 'P2022') {
                    console.log('Schema problem, check whether you made migrations or not.')
                    throw new Error("Incorrect schema between migrations and DB in createUser.")
                }
            }
            throw error
        }
    },
    async getUserById(id){
        try{
            return await prisma.user.findUnique({where: {id}})
        }
        catch(error){
            if (error instanceof Prisma.PrismaClientKnownRequestError) {
                if (error.code in ['P1001', 'P1008', 'P1017']) {
                    console.log('Failed connection to DB, check if you actually connected correctly and didn`t close it.')
                    throw new Error("Failed connection to Data Base while processing getUserById.")
                }
                else if (error.code === 'P2009') {
                    console.log('For some reason you tried to look for specific ID by something that is not ID? I dont really know what is this error.')
                    console.log(`More data about this error: \n${error}`)
                    throw new Error("Incorrect request query for getUserById.")
                }
                else if (error.code === 'P2022') {
                    console.log('Schema problem, check whether you made migrations or not.')
                    throw new Error("Incorrect schema between migrations and DB in getUserById.")
                }
            }
            throw error
        }
    }
}