const FS = require("fs");
const FSPromises = require("fs/promises");
const pathModule = require("path");
const momentModule = require("moment");


const DATA_FILE_PATH = pathModule.join(__dirname, "..", "data.json");
const postsData = JSON.parse(FS.readFileSync(DATA_FILE_PATH, "utf-8"));

const PostService = {
    getAllPosts(take, skip){
        let selectedPosts = [...postsData];
        if (skip){
            selectedPosts = selectedPosts.slice(skip)
        }
        if (take){
            selectedPosts = selectedPosts.slice(0, take)
        }
        return selectedPosts
    },
    getPostById(id){
        // Возвращает ничего если пост за запрошенным id не является реальным
        let post = postsData.find((obj) => obj.id == id);
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
    isURL(str){
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
    async addPost(postData){
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

module.exports = PostService