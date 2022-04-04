const { Router } = require('express');
// const jwt = require('jsonwebtoken');
const GithubUser = require('../models/User');

module.exports = Router()
  .get('/login', (req, res) => {
    res.redirect(
      `https://github.com/login/oauth/authorize?client_id=${process.env.CLIENT_ID}&scope=user&redirect_uri=${process.env.REDIRECT_URI}`
    );
  });
