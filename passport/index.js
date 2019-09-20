const github = require('./githubStrategy');

module.exports = (passport) => {
  github(passport);

  passport.serializeUser(function(user, done) {
    done(null, user);
  });

  passport.deserializeUser(function(user, done) {
    done(null, user);
  });

};
