const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const GitHubStrategy = require("passport-github").Strategy;

const User = require("../models/User");
const { ErrorHandler } = require("../util/error");
const { compareHashPassword } = require("../services/userService");
const { ERROR } = require("../constants/constants");

passport.use(new LocalStrategy({
  usernameField: "username",
  passwordField: "password",
}, async (username, password, cb) => {
  try {
    if (!username || !password) {
      throw new ErrorHandler(400, ERROR.BAD_REQUEST);
    }

    const user = await User.findOne({ username });

    const validPassword = await compareHashPassword(password, user.password);

    if (validPassword) {
      cb(null, username);
      
      return;
    } 
  } catch (error) {
    cb(error);
  }
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

passport.deserializeUser(async (user, cb) => {
  if (!user.username) {
    cb(null, { username: user });

    return;
  }

  cb(null, user);
});
