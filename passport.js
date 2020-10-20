const passport = require('passport');
const GitHubStrategy = require('passport-github').Strategy;
const User = require('./models/User');

passport.use(new GitHubStrategy({
  clientID: process.env.GITHUB_CLIENT_ID,
  clientSecret: process.env.GITHUB_CLIENT_SECRET,
  callbackURL: 'http://localhost:5000/auth/github/callback'
}, gitHubCallback));

passport.serializeUser(function(user, cb) {
  cb(null, user);
});

passport.deserializeUser(function(obj, cb) {
  cb(null, obj);
});

async function gitHubCallback(accessToken, refreshToken, profile, cb) {
  try {
    const [user] = await User.find({ github_id: profile.id });

    if (!user) {
      const newUser = await User.create({
        github_id: profile.id,
        display_name: profile.displayName,
        username: profile.username,
        profile_url: profile.profileUrl,
        avatar_url: profile.photos[0].value,
        solutions: []
      });
      return cb(null, newUser);
    }

    cb(null, user);
  } catch (error) {
    cb(error);
  }
}
