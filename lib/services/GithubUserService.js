
const GithubUser = require('../models/User');
const { exchangeCodeForToken, getGithubProfile } = require('../utils/github');

module.exports = class GithubUserService {
  static async create(code) {

    const access_token = await exchangeCodeForToken(code);
    const { username, email, avatar } = await getGithubProfile(access_token);
    let user = await GithubUser.findByUsername(username);

    if(!user) {
      user = await GithubUser.insert({
        username,
        email,
        avatar
      });
    }
    console.log(user);
    return user;
  }
};
