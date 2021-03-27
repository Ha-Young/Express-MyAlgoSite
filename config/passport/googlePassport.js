const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const User = require("../../models/User");

passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: "/login/google/callback",
  proxy: true,
},
  async function (accessToken, refreshToken, profile, done) {
    try {
      user = await User.findOne({ googleId: profile.id });

      if (!user) {
        user = await User.create({ googleId: profile.id, displayName: profile.displayName });
      } else if (user.displayName !== profile.displayName) {
        user.displayName = profile.displayName;
      }

      done(null, user);
    } catch (err) {
      done(err, null);
    }
  }
));

passport.serializeUser((user, done) => done(null, user.id));
passport.deserializeUser((id, done) => User.findById(id, (err, user) => done(err, user)));

module.exports = passport;
