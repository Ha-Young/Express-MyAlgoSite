
const dotenv = require('dotenv');
dotenv.config();

const passport = require('passport');
const GitHubStrategy = require('passport-github').Strategy;

const User = require('./models/User');

passport.use(new GitHubStrategy({
  clientID: process.env.GITHUB_CLIENT_ID,
  clientSecret: process.env.GITHUB_CLIENT_SECRET,
  callbackURL: "https://intense-reef-27088.herokuapp.com/login/auth/github/callback"
},
  async function (accessToken, refreshToken, profile, cb) {
    const findOrCreateUserInfo = async (profile) => {
      try {
        const isExist = await User.exists({ githubId: profile.id });

        if (!isExist) {
          const newUser = new User({ githubId: profile.id, userName: profile.username });
          await newUser.save((err, doc) => {
            if (err) return;
          });
        }
      } catch (err) {
        if (err) return;
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
