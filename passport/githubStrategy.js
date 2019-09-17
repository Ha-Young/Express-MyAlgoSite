const GitHubStrategy = require('passport-github2').Strategy;
const User = require('../models/User');
const dotenv = require('dotenv');
dotenv.config({
  path: './.env'
});

// Use the GitHubStrategy within Passport.
//   Strategies in Passport require a `verify` function, which accept
//   credentials (in this case, an accessToken, refreshToken, and GitHub
//   profile), and invoke a callback with a user object.
module.exports = passport => {
  passport.use(
    new GitHubStrategy(
      {
        clientID: process.env.GITHUB_CLIENT_ID,
        clientSecret: process.env.GITHUB_CLIENT_SECRET,
        callbackURL: process.env.GITHUB_CALLBACK_URL
      },
      async (accessToken, refreshToken, profile, done) => {
        try {
          console.log(profile, 'profile');
          const foundUser = await User.findOne({ githubId: profile.id });
          console.log(foundUser, 'found');
          if (foundUser) {
            return done(null, foundUser);
          } else {
            const newUser = new User(
              {
                githubId: profile.id,
                displayName: profile.displayName,
                provider: profile.provider
              }
            );
            await newUser.save();
            console.log('success');
            return done(null, newUser);
          }
        } catch (err) {
          console.log(err);
        }
      }
    )
  );
};
