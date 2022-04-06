
const GithubUser = require('../models/User');
const { exchangeCodeForToken, getGithubProfile } = require('../utils/github');

module.exports = class GithubUserService {
  static async create(code) {

    const access_token = await exchangeCodeForToken(code);

    const profile = await getGithubProfile(access_token);

    let user = await GithubUser.findByUsername(profile.username);

    if(!user) {
      user = await GithubUser.insert(profile);
    }
    return user;
  }
};
