const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const User = require("../models/User");

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "/login/google/callback"
  },
  async (accessToken, refreshToken, profile, done) => {
    const { id, displayName } = profile;
    const newUser = { googleId: id, displayName: displayName };

    try {
      let user = await User.findOne({ googleId: id });

      if (!user) {
        user = await User.create(newUser);
      }

      done(null, user);
    } catch (err) {
      done(err);
    }
  }
));

passport.serializeUser((user, done) => done(null, user.id));
passport.deserializeUser((id, done) => User.findById(id, (err, user) => done(err, user)));

module.exports = passport;
