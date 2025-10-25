import { Request, response, Response } from 'express';
import { Prisma } from '../generated/prisma';

export type Post = Prisma.PostGetPayload<{}>
export type PostWithTags = Prisma.PostGetPayload<{
    include: {
        tags: true
    }
}>

export type CreatePost = Prisma.PostCreateInput
export type CreatePostChecked = Prisma.PostUncheckedCreateInput
export type UpdatePost = Prisma.PostUpdateInput
export type UpdatePostChecked = Prisma.PostUncheckedUpdateInput

export interface PostServiceContract {
    getAllPosts(take?: number, skip?: number): Promise<Post[]>
    getPostById(id: number): Promise<Post | null | undefined>
    isURL(urlstring: string | string): Boolean
    addPost(postData: CreatePost): Promise<undefined | Post>
    getDate(): string
    updatePost(newPostData: UpdatePost, id: number): Promise<Post | undefined | string>
    deletePost(id: number): Promise<Post | string>
    validateId(id: string): Promise<Boolean | string>
}

export interface PostControllerContract {
    getAllPosts(request: Request<void, Post[] | string, void, {take?: string, skip?: string}>, response: Response<Post[] | string>): void
    getPostById(request: Request<{id: string}, Post | String, void, void>, response: Response<Post | string>): void
    getTimestamp(request: Request<void, string, void, void>, response: Response<string>): void
    createPost(request: Request<void, Post | string, {name: string, description: string, likes: string, image: string}, void>, response: Response<Post | string>): Promise<void>
    updatePost(request: Request<{id: string}, Post | string, UpdatePost, void>, response: Response<Post | string>): Promise<void>
    deletePost(request: Request<{id: string}, Post | string>, response: Response<Post | string>): Promise<void>
}