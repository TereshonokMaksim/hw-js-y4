import { Request, Response } from 'express';

export interface Post {
    id: number,
    name: string,
    description: string,
    image: string,
    likes: number
}

export type PostCreate = Omit<Post, "id">
export type PostUpdate = Partial<Omit<Post, "id">>

export interface PostServiceContract {
    getAllPosts(take?: number | string, skip?: number | string): Post[]
    getPostById(id: number): Post | undefined
    getId(): number
    isURL(urlstring: string | string): Boolean
    updateJSON(): Promise<Boolean>
    addPost(postData: PostCreate): Promise<undefined | Post>
    getDate(): string
    updatePost(newPostData: PostUpdate, id: number): Promise<Post | undefined | string>
}

export interface PostControllerContract {
    getAllPosts(request: Request<void, Post[] | string, void, {take?: string, skip?: string}>, response: Response<Post[] | string>): void
    getPostById(request: Request<{id: string}, Post | String, void, void>, response: Response<Post | string>): void
    getTimestamp(request: Request<void, string, void, void>, response: Response<string>): void
    createPost(request: Request<void, Post | string, {name: string, description: string, likes: string, image: string}, void>, response: Response<Post | string>): void
    updatePost(request: Request<{id: string}, Post | string, PostUpdate, void>, response: Response<Post | string>): void
}