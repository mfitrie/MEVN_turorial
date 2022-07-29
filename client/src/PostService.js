/* eslint-disable */
const axios = require('axios');

const url = 'http://localhost:5000/api/posts/';

class PostService{
    // Get Posts
    static getPosts(){
        return new Promise(async (resolve, reject)=>{
            try {
                const res = await axios.get(url);
                const data = res.data;

                resolve(data.map(post =>({
                    ...post,
                    createdAt: new Date(post.createdAt)
                }))
                );

            } catch (error) {
                reject(err);
            }
        });
    }

    // Create Posts
    static insertPost(text){
        return axios.post(url, {
            text
        });
    }

    // Delete Post
    static deletePost(id){
        return axios.delete(`${url}${id}`);
    }
}

module.exports = PostService