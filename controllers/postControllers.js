const Post = require("../models/postSchema");

async function createPost(){
    const { title, content } = req.body;
    try{
        const post = await Post.create({
            title,
            content,
            author: req.user._id
        });
        return res.status(201).json(post);
    }catch{
        return res.status(500).send("Error creating post!")
    }
}


module.exports = {
    createPost,
    
}