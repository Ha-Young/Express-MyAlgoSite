const passport = require('passport');
const GitHubStrategy = require('passport-github').Strategy;
const User = require('../../models/User');

module.exports = function passport(passport) {

  passport.use(
    new GitHubStrategy(
      {
        clientID: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        callbackURL: process.env.CALL_BACK_URL
      },
      async function(accessToken, refreshToken, profile, cb) {
        try{
          const userData = {
            id: profile.id,
            username: profile.username,
            profileUrl: profile.profileUrl
          };
          const target = await User.findOne({ id: profile.id });
          if (target) {
            return cb(null, profile);
          } else {
            new User(userData).save().then(cb(null, profile));
          }
        } catch (err){
          throw new Error();
        }
      }
    )
  );
};

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(user, done) {
  User.findOne({id : user})
  .then(user => done(null, user))
  .catch(err => done(err));
});
