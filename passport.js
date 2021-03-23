const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const GitHubStrategy = require('passport-github').Strategy;

const bcrypt = require("bcrypt");

const User = require("./models/User");

// passport.use(new LocalStrategy(User.authenticate));

passport.use(new LocalStrategy({
  usernameField: "username",
  passwordField: "password",
}, async (username, password, cb) => {
  if (!username || !password) {
    return cb(null, false);
  }

  const user = await User.findOne({ username });
  const validPassword = await bcrypt.compare(password, user.password);

  if (user.length !== 0 && validPassword) {
    return cb(null, username);
  }

  return cb(null, false);
}));

passport.use(new GitHubStrategy({
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
  },
  async (accessToken, refreshToken, profile, cb) => {
    const {
      username,
      photos: [{ value: avatar }],
    } = profile;

    try {
      const user = await User.findOne({ username });

      if (!user) {
        const newUser = User({
          username,
          avatar,
        });

        await newUser.save();

        cb(null, newUser);
        return;
      }

      cb(null, user);
      return;
    } catch (error) {
      cb(error);
    }
  },
));

passport.serializeUser((user, cb) => {
  cb(null, user)
});

passport.deserializeUser((user, cb) => {
  cb(null, user);
});
