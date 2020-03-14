const passport = require("passport");
const githubStrategy = require("passport-github");
const keys = require("./keys");
const User = require("../models/User");

passport.serializeUser((user, cb) => {
  cb(null, user._id);
});
passport.deserializeUser(async (id, cb) => {
  const user = await User.findById(id);
  cb(null, user);
});
passport.use(
  new githubStrategy(
    {
      clientID: keys.github.CLIENT_ID,
      clientSecret: keys.github.CLIENT_SECRET,
      callbackURL: "/login/github/callback"
    },
    async (aceessTocken, refreshToken, profile, cb) => {
      const userInfo = { ...profile };
      const user = await User.findOne({ id: userInfo._json.id });
      if (user) {
        cb(null, user);
      } else {
        const newUser = await new User({
          githubId: userInfo._json.login,
          id: userInfo._json.id
        }).save();
        cb(null, newUser);
      }
    }
  )
);