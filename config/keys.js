require('dotenv').config();

module.exports = {
  github: {
    CLIENT_ID: process.env.GITHUB_CLIENT_ID,
    CLIENT_SECRET: process.env.GITHUB_CLIENT_SECRET
  },
  session: {
    KEY: process.env.SESSION_KEY
  }
};
