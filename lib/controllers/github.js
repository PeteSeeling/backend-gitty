const { Router } = require('express');
const jwt = require('jsonwebtoken');
const { request } = require('../app');
const GithubUserService = require('../services/GithubUserService');
const ONE_DAY_IN_MS = 1000 * 60 * 60 * 24;

module.exports = Router()
  .get('/login', (req, res) => {
    res.redirect(
      `https://github.com/login/oauth/authorize?client_id=${process.env.CLIENT_ID}&scope=user&redirect_uri=${process.env.REDIRECT_URI}`
    );
  })

  .get('/login/callback', async (req, res, next) => {
    try {
      const user = await GithubUserService.create(req.query.code);

      const payload = jwt.sign(user.toJSON(), process.env.JWT_SECRET, {
        expiresIn:'1 day',
      });

      res
        .cookie(process.env.COOKIE_NAME, payload, {
          httpOnly: true,
          maxAge: ONE_DAY_IN_MS,
        })

        .redirect('/api/v1/posts');
    } catch (error) {
      next(error);
    }
  })

  .delete('/', (req, res) => {
    res
      .clearCookie(process.env.COOKIE_NAME)
      .json({ success:true, message: 'Signed out Successfully' });
  });

