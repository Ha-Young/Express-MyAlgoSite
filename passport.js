
const dotenv = require('dotenv');
dotenv.config();

const passport = require('passport');
const GitHubStrategy = require('passport-github').Strategy;

const Users = require('./models/User');

passport.use(new GitHubStrategy({
  clientID: process.env.GITHUB_CLIENT_ID,
  clientSecret: process.env.GITHUB_CLIENT_SECRET,
  callbackURL: "http://localhost:3000/login/auth/github/callback"
},
  async function (accessToken, refreshToken, profile, cb) {
    const findOrCreateUserInfo = async (profile) => {
      const isExist = await Users.exists({ githubId: profile.id, userName: profile.username });

      if (!isExist) {
        const newOne = await Users.create({ githubId: profile.id, userName: profile.username });
      }
    };

    await findOrCreateUserInfo(profile);
    return cb(null, profile);
  }));

passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (user, done) {
  done(null, user);
});
