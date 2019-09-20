require('dotenv').config();

const development = {
  githubClientID : process.env.GITHUB_CLIENT_ID_TEST,
  githubClientSecret : process.env.GITHUB_CLIENT_SECRET_TEST,
  githubAuthCallback : process.env.GITHUB_AUTH_CALLBACK_TEST,
  mongoDBUrl : process.env.MONGODB_TEST_SERVER_URL
};

const production = {
  githubClientID : process.env.GITHUB_CLIENT_ID,
  githubClientSecret : process.env.GITHUB_CLIENT_SECRET,
  githubAuthCallback : process.env.GITHUB_AUTH_CALLBACK,
  mongoDBUrl : process.env.MONGODB_SERVER_URL
};

exports.production = production;
exports.development = development;

