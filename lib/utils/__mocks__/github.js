

const exchangeCodeForToken = async (code) => {
  console.log(`MOCK INVOKED: exchangeCodeForToken(${code})`);
  return `MOCK_TOKEN_FOR_CODE_${code}`;
};
  
const getGithubProfile = async (token) => {
  console.log(`MOCK INVOKED: getGithubProfile(${token})`);
  return {
    github_username: 'fake_github_user',
    github_avatar: 'https://www.placecage.com/gif/350/350',
    email: 'not-real@example.com',
  };
};
  
module.exports = { exchangeCodeForToken, getGithubProfile };
