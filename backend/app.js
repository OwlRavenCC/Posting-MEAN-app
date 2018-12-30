const express = require('express');

const app = express();

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
