const { Router } = require('express');
const Post = require('../models/Post');
const authenticate = require('../middleware/authenticate');

module.exports = Router()
  .post('/', authenticate, async (req, res) => {
    console.log(req.user, 'usssseeeeeerrrr');
    const post = await Post.insert(req.body, req.user.username);
    res.send(post);
  })

  .get('/', authenticate, async (req, res, next) => {
    try {
  
      const posts = await Post.getAllPosts();
      console.log(posts, 'posssttss');
      res.send(posts);
    } catch (error) {
      next(error);
    }
  });


