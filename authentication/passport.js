const passport = require("passport");
const createError = require("http-errors");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const User = require("../models/User");

const {
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  AUTH_CALLBACK_URL,
} = process.env;

const googleStrategy = new GoogleStrategy(
  {
    clientID: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: AUTH_CALLBACK_URL,
  },
  async (accessToken, refreshToken, params, profile, done) => {
    try {
      const user = await User.findOne({google_id: profile.id});

      if (user) {
        done(null, user);
      } else {
        const newUser = {
          google_id: profile.id,
          email: profile.emails[0].value,
          user_name: profile.displayName,
          problems: {
            succeed_problems: [],
            solving_problems: [],
          },
        };

        done(null, await User.create(newUser));
      }
    } catch (error) {
      console.error(error);
      done(createError(500));
    }
  }
);

passport.use(googleStrategy);

passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((user, done) => done(null, user));
