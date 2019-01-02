const express = require('express');

const app = express();

app.use((req,res,next) => {
  res.setHeader("Access-Control-Allow-Origin","*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, DELETE, OPTIONS"
  );
  next();
});

app.use('/api/posts', (req, res,next) => {
  const posts = [
    {
      id: 'ID-1',
      title: 'Node Post',
      content: 'These posts are coming from the backend'
    },
    {
      id: 'ID-2',
      title: '2nd Node Post ',
      content: 'This second post is coming from the backend'
    }
  ];
  res.status(200).json({
    message: 'Posts fetched succesfully',
    posts: posts
  });
});

module.exports = app;
