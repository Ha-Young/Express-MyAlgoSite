const passport = require("passport");
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require("./models/User");
require("dotenv").config();

passport.use(new GoogleStrategy(
  {
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: `http://localhost:${process.env.PORT}/login/google/callback`
  },
  async (accessToken, refreshToken, profile, done) => {
    console.log(accessToken, refreshToken, profile)
    const isUser = await User.exists({ googleId: Number(profile.id) });
    const {
      displayName: name,
      id: googleId,
    } = profile;
    const avatalUrl = profile.photos[0].value;

    try {
      if (!isUser) {
        User.create({
          name,
          avatalUrl,
          googleId,
        });
      }
    } catch (err) {
      console.log(err);
      throw new Error("failed join");
    }

    done(null, profile);
  }
));

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  console.log("request!!")
  done(null, user);
});

module.exports = passport;
