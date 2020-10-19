const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const constants =require('./constants');
require('dotenv').config();

passport.use(
    new GoogleStrategy({
    clientID:process.env.GOOGLE_CLIENT_ID,
    clientSecret:process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: 'http://localhost:3000/login/auth/google/callback'
},
    function (accessToken, refreshToken, profile, done) {
        User.findOrCreate({ googleId: profile.id }, function (err, user) {
            console.log('errrrrrrrr');
            return done(err, user);
        });
    }
));

// var GitHubStrategy = require('passport-github').Strategy;

// passport.use(new GitHubStrategy({
//     clientID: GITHUB_CLIENT_ID,
//     clientSecret: GITHUB_CLIENT_SECRET,
//     authorizationURL: "https://ENTERPRISE_INSTANCE_URL/login/oauth/authorize",
//     tokenURL: "https://ENTERPRISE_INSTANCE_URL/login/oauth/access_token",
//     userProfileURL: "https://ENTERPRISE_INSTANCE_URL/api/v3/user",
//     callbackURL: "http://127.0.0.1:3000/auth/github/callback"
//   },
//   function(accessToken, refreshToken, profile, cb) {
//     User.findOrCreate({ githubId: profile.id }, function (err, user) {
//       return cb(err, user);
//     });
//   }
// ));