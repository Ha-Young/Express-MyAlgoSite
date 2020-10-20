const passport = require('passport');
const GithubStrategy = require('passport-github2');
const User = require('../models/User');

passport.use(User.createStrategy());

passport.use(
  new GithubStrategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackURL: process.env.GITHUB_CALLBACK_URL,
      scope: ['user:email'],
    },
    async function (accessToken, refreshToken, profile, cb) {
      const {
        id: githubId,
        username,
        photos: [{ value: photoUrl }],
        emails: [{ value: email }],
      } = profile;

      try {
        const user = await User.findOne({ email });

        if (!user) {
          const newUser = await User.create({
            username,
            email,
            githubId,
            photoUrl,
          });

          return cb(null, newUser);
        }

        user.username = username;
        user.githubId = githubId;
        user.photoUrl = photoUrl;
        await user.save();

        return cb(null, user);
      } catch (err) {
        return cb(err);
      }
    }
  )
);

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
