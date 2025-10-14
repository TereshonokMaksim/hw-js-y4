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
    getAllPosts: (take?: number | string, skip?: number | string) => Post[]
    getPostById: (id: number) => Post | undefined
    getId: () => number
    isURL: (urlstring: string | string) => Boolean
    updateJSON: () => Promise<Boolean>
    addPost: (postData: PostCreate) => Promise<Boolean | Post>
    getDate: () => string
    updatePost: (newPostData: PostUpdate, id: number) => Promise<Post | undefined | string>
}