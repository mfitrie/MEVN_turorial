const express = require('express');
const mongodb = require('mongodb');

const router = express.Router();

// Get Posts
router.get('/', async (req, res)=>{
    const posts = await loadPostsCollection();
    res.send(await posts.find({}).toArray());
});


// Add Post
router.post('/', async(req, res)=>{
    const posts = await loadPostsCollection();
    await posts.insertOne({
        text: req.body.text,
        createdAt: new Date()
    });

    res.status(201).send();
});


// Delete Post
router.delete('/:id', async(req, res)=>{
    const posts = await loadPostsCollection();
    await posts.deleteOne({_id: new mongodb.ObjectId(req.params.id)});

    res.status(200).send();
});


const loadPostsCollection = async()=>{
    const client = await mongodb.MongoClient.connect(`mongodb+srv://fitrie:${process.env.DATABASE_PASSWORD}@cluster0.pxyzint.mongodb.net/?retryWrites=true&w=majority`, {
        useNewUrlParser: true
    });

    return client.db('vue_express').collection('posts');
}


module.exports = router;