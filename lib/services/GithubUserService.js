const GithubUser = require('../models/User');
const { exchangeCodeForToken } = require('../utils/github');

module.exports = class GithubUserService {
  static async create(code) {
    const access_token = await exchangeCodeForToken(code);

    const profile = await getGithubProfile(access_token);
  }
};
