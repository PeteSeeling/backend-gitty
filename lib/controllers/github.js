const { Router } = require('express');
// const jwt = require('jsonwebtoken');
const GithubUser = require('../models/User');
const GithubUserService = require('../services/GithubUserService');

module.exports = Router()
  .get('/login', (req, res) => {
    res.redirect(
      `https://github.com/login/oauth/authorize?client_id=${process.env.CLIENT_ID}&scope=user&redirect_uri=${process.env.REDIRECT_URI}`
    );
  });

  .get('/login/callback', async (req, res, next) => {
      try {
          const user = await GithubUserService.create(req.query.code);
          
      }
  })
