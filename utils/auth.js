module.exports = () => {
  // configure the Github strategy for use by Passport.
  const GithubStrategy = require('passport-github').Strategy;

  // OAuth 2.0 - based strategies require a verify function which receives the credential for accessing the Facebook API on the user's behalf, along with the user's profile.

  passport.use(
    new GithubStrategy({
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackURL: "http://127.0.0.1:3000"
    }, function (accessToken, refreshToken, profile, cb) { // 이게 verify function인 듯.
      // The function must invoke 'cb' with a user object,
      // which will be set at 'req.user' in route handlers after authentication.
      User.findOrCreate({ githubId: profile.id }, function (err, user) {
        return cb(err, user);
      });
    })
  );

  // Configure Passport authenticated session persistence.
  //
  // In order to restore authentication state across HTTP requests, Passport needs
  // to serialize users into and deserialize users out of the session.  In a
  // production-quality application, this would typically be as simple as
  // supplying the user ID when serializing, and querying the user record by ID
  // from the database when deserializing.  However, due to the fact that this
  // example does not have a database, the complete Facebook profile is serialized
  // and deserialized.
  passport.serializeUser(function(user, cb) {
    cb(null, user);
  });

  passport.deserializeUser(function(obj, cb) {
    cb(null, obj);
  });
};
