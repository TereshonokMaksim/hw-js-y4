import { Request, Response } from 'express';
import { Prisma } from '../generated/prisma';
import { ErrorResponse } from '../generic/generic.error.messages';

export type Post = Prisma.PostGetPayload<{}>
export type PostWithTags = Prisma.PostGetPayload<{
    include: {
        tags: true
    }
}>

export type CreatePost = Prisma.PostUncheckedCreateInput
export type CreatePostChecked = Prisma.PostCreateInput
export type UpdatePost = Prisma.PostUncheckedUpdateInput
export type UpdatePostChecked = Prisma.PostUpdateInput

export interface PostServiceContract {
    getAllPosts(take?: number, skip?: number): Promise<Post[]>
    getPostById(id: number): Promise<Post | null | undefined>
    addPost(postData: CreatePost): Promise<undefined | Post>
    getDate(): string
    updatePost(newPostData: UpdatePost, id: number): Promise<Post | undefined>
    deletePost(id: number): Promise<Post>
}

export interface PostControllerContract {
    getAllPosts(request: Request<void, Post[] | ErrorResponse, void, {take?: string, skip?: string}>, response: Response<Post[] | ErrorResponse>): void
    getPostById(request: Request<{id: string}, Post | ErrorResponse, void, void>, response: Response<Post | ErrorResponse>): void
    getTimestamp(request: Request<void, string | ErrorResponse, void, void>, response: Response<string | ErrorResponse>): void
    createPost(request: Request<void, Post | ErrorResponse, {name: string, description: string, likes: string, image: string}, void>, response: Response<Post | ErrorResponse>): Promise<void>
    updatePost(request: Request<{id: string}, Post | ErrorResponse, UpdatePost, void>, response: Response<Post | ErrorResponse>): Promise<void>
    deletePost(request: Request<{id: string}, Post | ErrorResponse>, response: Response<Post | ErrorResponse>): Promise<void>
}

export interface PostRepositoryContract {
    getAllPosts(take?: number, skip?: number): Promise<Post[]>
    getPostById(id: number): Promise<Post | null | undefined>
    addPost(postData: CreatePost): Promise<undefined | Post>
    updatePost(newPostData: UpdatePost, id: number): Promise<Post | undefined>
    deletePost(id: number): Promise<Post>
}