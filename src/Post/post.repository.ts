
import { PostRepositoryContract, Post } from "./post.types";
import { prisma } from "../client/prisma.client";
import { Prisma } from "../generated/prisma";


export const PostRepository: PostRepositoryContract = {
    async getAllPosts(take, skip){
        let selectedPosts = await prisma.post.findMany(
            {
                take: take,
                skip: skip
            }
        )
        return selectedPosts
    },
    async getPostById(id){
        let post;
        try{
            post = prisma.post.findUnique({
                where: {
                    id: id
                }
            })
        }
        catch (error){
            console.log(`DB decided that it is independent and refuses to elaborate! More specifically, it decided not to give Post by ID.\n\nData: \n  Model: Post\n  ID: ${id}\n\nError: \n${error}`)
            return
        }
        if (!post){
            return
        }
        return post
    },
    async addPost(postData){
        try{
            const updateData = await prisma.post.create({
                data: postData
            });
            return updateData
        }
        catch (error){
            console.log(`It turns out, its not so easy to create POST anymore.\n\nData: \n  Model: Post\n  ${postData}\n\nError:\n${error}`)
            return
        }
    },
    async updatePost(newPostData, id){
        try{
            let newPost: Post = await prisma.post.update({
                where: {
                    id: id
                },
                data: newPostData
            })
            return newPost
        }
        catch (error) {
            console.log(`Updating product with ID of ${id} failed for unexplainable reasons.\n\nData:\n  Model: Post\n  ID: ${id}\n  New post data: ${newPostData}\n\nError:\n${error}`)
            return "updatePost-service-DB"
        }
    },
    async deletePost(id){
        try{
            let deletedPost = await prisma.post.delete({
                    where: {
                        id: id
                    }
                })
            return deletedPost
        }
        catch (error) {
            if (error instanceof Prisma.PrismaClientKnownRequestError){
                return `There is no post with ID ${id}.///404`
            }
            else {
                console.log(`Our server refuses to delete its precious data!\n\nData: \n  Model: Post\n  ID: ${id}\n\nError: \n${error}`)
                return "Internal Server Error during deleting post.///500"
            }
        }
    }
}