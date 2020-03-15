const passport = require('passport');
const GithubStrategy = require('passport-github').Strategy;
const User = require('../models/User');

const passportLogin = (req, res, next) => {
  passport.serializeUser((user, done) => {
    done(null, user);
  });

  passport.deserializeUser((user, done) => {
    done(null, user);
  });

  passport.use(
    new GithubStrategy(
      {
        clientID: process.env.GITHUB_CLIENT_ID,
        clientSecret: process.env.GITHUB_CLIENT_SECRET,
        callbackURL: 'http://localhost:3000/auth/github/callback'
      },
      async (accessToken, refreshToken, profile, done) => {
        const {
          _json: { id, avatar_url: avatarUrl, name, email }
        } = profile;

        if (!email) {
          const error = new Error('Github의 이메일이 비공개로 설정되어있습니다. Public email을 설정해주세요.');
          return done(error);
        }

        try {
          const user = await User.findOne({ email });

          if (user) {
            return done(null, user);
          } else {
            const user = await User.create({
              name,
              githubId: id,
              email,
              avatarUrl
            });
            return done(null, user);
          }
        } catch (error) {
          return done(error);
        }
      }
    )
  );
  next();
};

module.exports = passportLogin;
