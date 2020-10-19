// const passport = require('passport');
// const GitHubStrategy = require('passport-github').Strategy;

// passport.use(new GitHubStrategy({
//     clientID: process.env.GITHUB_CLIENT_ID,
//     clientSecret: process.env.GITHUB_CLIENT_SECRET,
//     callbackURL: "http://localhost:3000/login/github/callback"
//   },
//   (accessToken, refreshToken, profile, cb) => {
//     console.log(accessToken, refreshToken, profile, cb);
//     return cb(null, profile);
//   }
// ));

// passport.serializeUser((user, done) => {
//   done(null, user);
// });
// passport.deserializeUser((user, done) => {
//   done(null, user);
// });


// module.exports = passport;
