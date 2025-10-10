import FS from "fs";
import FSPromises from "fs/promises";
import pathModule from "path";
import momentModule from "moment";


const DATA_FILE_PATH: string = pathModule.join(__dirname, "..", "data.json");
const postsData: {id: number, name: string, description: string, image: string, likes: number}[] = JSON.parse(FS.readFileSync(DATA_FILE_PATH, "utf-8"));

export const PostService = {
    getAllPosts(take?: number | string, skip?: number | string){
        let selectedPosts = [...postsData];
        if (skip){
            selectedPosts = selectedPosts.slice(+skip)
        }
        if (take){
            selectedPosts = selectedPosts.slice(0, +take)
        }
        return selectedPosts
    },
    getPostById(id: number){
        // Возвращает ничего если пост за запрошенным id не является реальным
        let post = postsData.find((obj: {id: number}) => obj.id == id);
        if (!post){
            return
        }
        return post
    },
    getId(){
        let supposedId = 0
        for (let post of postsData){
            if (post.id > supposedId){
                supposedId = post.id
            }
        }
        return supposedId + 1
    },
    isURL(str: string){
        try{
            new URL(str);
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
            console.log(`During updating JSON file, server encountered something, that it should have never ecnountered: \n\n${error}`)
            return error
        }
    },
    async addPost(postData: {name: string, description: string, image: string}){
        const newPost = {id: this.getId(), ...postData, likes: 0};
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
    }
}