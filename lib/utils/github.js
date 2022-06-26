const fetch = require('cross-fetch');

const exchangeCodeForToken = async (code) => {

  const response = await fetch('https://github.com/login/oath/access_token', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      client_id: process.env.CLIENT_ID,
      client_secret: process.env.CLIENT_SECRET,
      code
     
    })
  });
  const { access_token } = await response.json();
  return access_token;
};

const getGithubProfile = async (access_token) => {
  const githubProfileResponse = await fetch('https://api.github.com/user', {
    headers: {
      Authorization: `token ${access_token}`
    },
  });

  const { avatar, login } = await githubProfileResponse.json();
  return { github_username: login, github_avatar: avatar };
};

module.exports = { exchangeCodeForToken, getGithubProfile };

