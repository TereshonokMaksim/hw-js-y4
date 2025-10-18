import FS from "fs";
import FSPromises from "fs/promises";
import pathModule from "path";
import momentModule from "moment";
import { Post, PostServiceContract } from "./post.types";


const DATA_FILE_PATH: string = pathModule.join(__dirname, "..", "data.json");
const postsData: Post[] = JSON.parse(FS.readFileSync(DATA_FILE_PATH, "utf-8"));

export const PostService: PostServiceContract = {
    getAllPosts(take, skip){
        let selectedPosts = [...postsData];
        if (skip){
            selectedPosts = selectedPosts.slice(+skip)
        }
        if (take){
            selectedPosts = selectedPosts.slice(0, +take)
        }
        return selectedPosts
    },
    getPostById(id){
        // Возвращает ничего если пост за запрошенным id не является реальным
        let post = postsData.find((obj: {id: number}) => obj.id == id);
        if (!post){
            return
        }
        return post
    },
    getId(){
        let supposedId: number = 0
        for (let post of postsData){
            if (post.id > supposedId){
                supposedId = post.id
            }
        }
        supposedId++
        return supposedId
    },
    isURL(urlString){
        try{
            new URL(urlString);
            return true
        }
        catch{
            return false
        }
    },
    async updateJSON(){
        try {
            const cookedData = JSON.stringify(postsData, null, 4);
            await FSPromises.writeFile(DATA_FILE_PATH, cookedData);
            return false
        }
        catch (error) {
            console.log(`During updating JSON file, server encountered something, that it should have never ecnountered: \nError message:\n${error}`)
            return true
        }
    },
    async addPost(postData){
        const newPost: Post = {id: this.getId(), ...postData, likes: 0};
        postsData.push(newPost);
        const updateData = await this.updateJSON();
        if (updateData){
            return
        }
        return newPost
    },
    getDate(){
        let date;
        let mom = momentModule();
        // copypaste my beloved
        date = mom.format("YYYY/DD/MM HH:mm:ss")

        return date
    },
    async updatePost(newPostData, id){
        const selectedPost = this.getPostById(id);
        if (!selectedPost){
            return undefined
        }
        const selectedPostIndex: number = postsData.indexOf(selectedPost);
        let newPost: Post = {...selectedPost, ...newPostData}
        postsData.splice(selectedPostIndex, 1, newPost)
        const unsuccessDataUpdate = await this.updateJSON();
        if (unsuccessDataUpdate){
            return "updatePost-service-82"
        }
        return newPost
    }
}