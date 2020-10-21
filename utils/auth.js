const passport = require('passport');
const ObjectId = require('mongoose').Types.ObjectId;
const User = require('../models/User');

module.exports = () => {
  const GithubStrategy = require('passport-github').Strategy;

  passport.use(
    new GithubStrategy({
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackURL: "http://localhost:3000"
    }, function (accessToken, refreshToken, profile, cb) {
      console.log(profile);

      // find or create user
      User.find({ id: profile.id }, (err, user) => {
        if (err) return cb(err, user);

        console.log(user);

        // 못찾은 경우
        if (!user) {
          console.log('못찾아서 등록하려구..')
          // create user
          const { id, username, profileUrl } = profile;

          const user = new User({
            id,
            username,
            profileUrl
          });

          user.save((err) => {
            return cb(err, user);
          });
        }

        // 찾은 경우
        console.log('찾아버렸넹..')
        return cb(err, user);
      });
    })
  );

  passport.serializeUser(function(user, cb) {
    cb(null, user);
  });

  passport.deserializeUser(function(obj, cb) {
    cb(null, obj);
  });
};
