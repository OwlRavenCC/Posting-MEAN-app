const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const Post = require('./models/post');

const app = express();

mongoose.connect("mongodb://localhost:27017/mean-db", {useNewUrlParser: true})
  .then(() => {
    console.log('Connected to database!');
  })
  .catch(() => {
    console.log('Connection failed!');
  });

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({extended: false }));

app.use((req,res,next) => {
  res.setHeader("Access-Control-Allow-Origin","*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, PUT, DELETE, OPTIONS"
  );
  next();
});

/**
 * --------------
 * ADD POSTS
 * --------------
 */
app.post('/api/posts', (req, res, next) => {
  const post = new Post({
    title: req.body.title,
    content: req.body.content
  });
  // Here when the post is created it returns the id of the created Post
  post.save().then(createdPost => {
    console.log(createdPost);
    res.status(201).json({
      message: 'Post added successfully',
      postId: createdPost._id
    });
  });

});

/**
 * --------------
 * UPDATE POSTS
 * --------------
 */

app.put("/api/posts/:id", (req, res, next) => {
  const post = new Post({
    _id: req.body.id,
    title: req.body.title,
    content: req.body.content
  });
  Post.updateOne({_id: req.params.id}, post).then(result => {
    console.log(result);
    res.status(200).json({ message: "Update succesful!"});
  });
});

/**
 * --------------
 * GET POSTS
 * --------------
 */
app.get('/api/posts', (req, res, next) => {
  Post.find().then(documents => {
      res.status(200).json({
        message: 'Posts fetched succesfully',
        posts: documents
      });
    });
});

app.get("/api/posts/:id", (req, res, next) =>{
  Post.findById(req.params.id).then(post => {
    if (post) {
      res.status(200).json(post);
    } else {
      res.status(404).json({ message: 'Post not found!' });
    }
  })
});

/**
 * --------------
 * DELETE POSTS
 * --------------
 */
app.delete('/api/posts/:id', (req, res, next) => {
  Post.deleteOne({_id: req.params.id}).then(result => {
    console.log(result);
    res.status(200).json({message: "Post deleted!"});
  });

});

module.exports = app;
